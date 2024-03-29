import MainLayout from '../layouts/MainLayout'
import React, { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'expo-router'
import { ActivityIndicator, Button, Divider, Modal, Portal, Text } from 'react-native-paper'
import HeaderText from '../components/HeaderText'
import { showErrorToast } from '../utils/ErrorUtils'
import { getListController, getPartyController, getUserInfo } from '../utils/ApiUtils'
import {
    getCurrentlyPlayingSongDataFromSpotify,
    getSpotifyPlaybackState,
    getSpotifyTracksForPlaylist,
    pauseSpotifySongPlayback,
    playSpotifySong,
    resumeSpotifySongPlayback,
    subscribeToCurrentlyPlayingSongEnd
} from '../utils/SpotifyUtils'
import YoutubePlayer from '../components/YoutubePlayer'
import { CoflnetSongVoterModelsParty, CoflnetSongVoterModelsPartyPlaylistEntry, CoflnetSongVoterModelsSong, CoflnetSongVoterModelsUserInfo } from '../generated'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AppState, ScrollView, View, StyleSheet } from 'react-native'
import BackgroundService from 'react-native-background-actions'
import { makeRedirectUri } from 'expo-auth-session'
import SongList from '../components/SongList'
import { CURRENT_PARTY, IS_CURRENTLY_PARTY_OWNER, SPOTIFY_TOKEN, storage } from '../utils/StorageUtils'
import AddSong from '../components/AddSong'
import { globalStyles } from '../styles/globalStyles'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import AddSpotifyPlaylist from '../components/AddSpotifyPlaylist'

export default function App() {
    const router = useRouter()
    let pathname = usePathname()
    let [initialLoading, setInitialLoading] = useState(true)
    let [showLoadingIndicator, setShowLoadingIndicator] = useState(false)
    let [userInfo, setUserInfo] = useState<CoflnetSongVoterModelsUserInfo | null>()
    let [party, setParty] = useState<CoflnetSongVoterModelsParty>()
    let [playlist, setPlaylist] = useState<CoflnetSongVoterModelsPartyPlaylistEntry[]>()
    let [currentSong, setCurrentSong] = useState<CoflnetSongVoterModelsSong>()
    let [isYoutubePlayerPlaying, setIsYoutubePlayerPlaying] = useState(true)
    let [modalElementToShow, setModalElementToShow] = useState(null)
    let currentSongRef = useRef(currentSong)
    currentSongRef.current = currentSong
    let playlistRef = useRef(playlist)
    playlistRef.current = playlist
    let cancelSongSubscriptionRef = useRef<Function>()

    useEffect(() => {
        let subscription = AppState.addEventListener('change', async state => {
            if (state === 'active') {
                findCurrentlyPlayingSongOrStartNext()
            }
        })
        async function init() {
            if (!storage.contains(CURRENT_PARTY)) {
                router.push('/')
            } else {
                setParty(JSON.parse(storage.getString(CURRENT_PARTY)))
                await Promise.all([loadSongs(), loadUserInfo()])
            }
            setInitialLoading(false)
        }
        init()
        return () => {
            subscription.remove()
        }
    }, [])

    useEffect(() => {
        if (!initialLoading) {
            findCurrentlyPlayingSongOrStartNext()
            if (userInfo?.userId === party?.ownerId) {
                storage.set(IS_CURRENTLY_PARTY_OWNER, true)
            }
        }
    }, [initialLoading])

    async function loadUserInfo() {
        try {
            let info = await getUserInfo()
            setUserInfo(info)
        } catch (e) {
            showErrorToast(e)
        }
    }

    async function loadSongs() {
        try {
            let partyController = await getPartyController()
            let s = (await partyController.apiPartyPlaylistGet()).data
            setPlaylist(s)
            return s
        } catch (e) {
            if (e.response.data === 'You are not in a party') {
                storage.delete(CURRENT_PARTY)
                router.push('/')
                return
            }
            showErrorToast(e)
        }
    }

    async function findCurrentlyPlayingSongOrStartNext() {
        let partyController = await getPartyController()
        let currentPartySong = (await partyController.apiPartyNextSongGet()).data

        if (!currentPartySong) {
            Toast.show({
                type: 'error',
                text1: 'No next song found!'
            })
            return
        }

        if (currentPartySong.occurences[0].platform === 'spotify') {
            let id = currentPartySong.id
            if (userInfo?.userId === party?.ownerId) {
                if (!storage.contains(SPOTIFY_TOKEN)) {
                    Toast.show({
                        type: 'error',
                        text1: 'Next Song is a Spotify song, but no Spotify account is connected.',
                        text2: 'Trying to start next song...'
                    })
                    startNextSong()
                    return
                }
                let songData = await getCurrentlyPlayingSongDataFromSpotify()
                if (songData?.item) {
                    id = songData.item.id
                }
                if (!songData || !songData.is_playing) {
                    startNextSong()
                    return
                }
            }
            if (!playlistRef.current) {
                let songs = await loadSongs()
                setPlaylist(songs)
                playlistRef.current = songs
            }
            let song = playlistRef.current.find(playlistEntry => playlistEntry.song.occurences[0].externalId === id)
            if (song) {
                setCurrentSong(song.song)
            }
        } else {
            setCurrentSong(currentPartySong)
        }
    }

    let skipSpotifySongBecauseNoConnectedAccountCounter = 0
    async function startNextSong() {
        if (userInfo?.userId !== party?.ownerId) {
            return
        }
        try {
            let partyController = await getPartyController()
            if (currentSongRef.current) {
                await partyController.apiPartySongSongIdPlayedPost(currentSongRef.current.id)
            }
            let song = (await partyController.apiPartyNextSongGet()).data
            setCurrentSong(song)
            if (song.occurences[0].platform === 'spotify') {
                if (!storage.contains(SPOTIFY_TOKEN)) {
                    if (skipSpotifySongBecauseNoConnectedAccountCounter > 3) {
                        setCurrentSong(null)
                        return
                    }
                    Toast.show({
                        type: 'error',
                        text1: 'Next Song is a Spotify song, but no Spotify account is connected.',
                        text2: 'Trying to start next song...'
                    })
                    skipSpotifySongBecauseNoConnectedAccountCounter++
                    startNextSong()
                    return
                }
                await BackgroundService.start(
                    async taskData => {
                        playSpotifySong(song.occurences[0].externalId)
                        if (cancelSongSubscriptionRef.current) {
                            cancelSongSubscriptionRef.current()
                        }
                        await new Promise((resolve, reject) => {
                            setTimeout(() => {
                                cancelSongSubscriptionRef.current = subscribeToCurrentlyPlayingSongEnd(() => {
                                    startNextSong()
                                    resolve(null)
                                }, song.occurences[0].duration)
                            }, 2000)
                        })
                    },
                    {
                        taskName: 'Playing Song',
                        taskTitle: 'Party playing ' + song.occurences[0].title,
                        taskDesc: '',
                        linkingURI:
                            makeRedirectUri({
                                path: pathname.replace('/', '')
                            }) + '/',
                        taskIcon: {
                            name: 'ic_launcher',
                            type: 'mipmap'
                        }
                    }
                )
            }
        } catch (e) {
            showErrorToast(e)
        }
    }

    async function leaveParty() {
        try {
            let partyController = await getPartyController()
            await partyController.apiPartyLeavePost()
            if (cancelSongSubscriptionRef.current) {
                cancelSongSubscriptionRef.current()
            }
            if (BackgroundService.isRunning()) {
                BackgroundService.stop()
            }
            storage.set(IS_CURRENTLY_PARTY_OWNER, false)
            storage.delete(CURRENT_PARTY)
            if (storage.contains(SPOTIFY_TOKEN) && currentSong?.occurences[0].platform === 'spotify') {
                pauseSpotifySongPlayback()
            }
            router.push('/')
        } catch (e) {
            showErrorToast(e)
        }
    }

    async function showInviteCode() {
        router.push('/invite-party')
    }

    async function togglePlayback() {
        if (currentSong?.occurences[0].platform === 'spotify') {
            let playbackState = await getSpotifyPlaybackState()
            if (playbackState.is_playing) {
                await pauseSpotifySongPlayback()
            } else {
                await resumeSpotifySongPlayback()
            }
        }
        if (currentSong?.occurences[0].platform === 'youtube') {
            setIsYoutubePlayerPlaying(!isYoutubePlayerPlaying)
        }
    }

    async function addSongToParty(songId: string) {
        let controller = await getPartyController()
        await controller.apiPartyUpvoteSongIdPost(songId)
        setPlaylist([])
        setShowLoadingIndicator(true)
        await loadSongs()
        setShowLoadingIndicator(false)
    }

    async function onLikeButtonPress(playlistEntry: CoflnetSongVoterModelsPartyPlaylistEntry) {
        if (playlistEntry.selfVote === 'up') {
            removeVote(playlistEntry)
            return
        }
        let controller = await getPartyController()
        await controller.apiPartyUpvoteSongIdPost(playlistEntry.song.id)
        let newPlaylist = [...playlist]
        let entry = newPlaylist.find(e => e.song.id === playlistEntry.song.id)
        if (entry.selfVote === 'down') {
            entry.downVotes -= 1
        }
        entry.upVotes += 1
        entry.selfVote = 'up'
        setPlaylist(newPlaylist)
    }

    async function onDislikeButtonPress(playlistEntry: CoflnetSongVoterModelsPartyPlaylistEntry) {
        if (playlistEntry.selfVote === 'down') {
            removeVote(playlistEntry)
            return
        }
        let controller = await getPartyController()
        await controller.apiPartyDownvoteSongIdPost(playlistEntry.song.id)
        let newPlaylist = [...playlist]
        let entry = newPlaylist.find(e => e.song.id === playlistEntry.song.id)
        if (entry.selfVote === 'up') {
            entry.upVotes -= 1
        }
        entry.selfVote = 'down'
        entry.downVotes += 1
        setPlaylist(newPlaylist)
    }

    async function removeVote(playlistEntry: CoflnetSongVoterModelsPartyPlaylistEntry) {
        let controller = await getPartyController()
        await controller.apiPartyRemoveVoteSongIdPost(playlistEntry.song.id)
        let newPlaylist = [...playlist]
        let entry = newPlaylist.find(e => e.song.id === playlistEntry.song.id)
        if (entry.selfVote === 'down') {
            entry.downVotes -= 1
        }
        if (entry.selfVote === 'up') {
            entry.upVotes -= 1
        }
        entry.selfVote = 'none'
        setPlaylist(newPlaylist)
    }

    return (
        <>
            <MainLayout>
                <HeaderText text={party ? party.name || `Party` : null} />
                {userInfo?.userId === party?.ownerId ? <Button onPress={togglePlayback}>Pause/Resume</Button> : null}
                {currentSong && currentSong.occurences[0].platform === 'youtube' && userInfo?.userId === party?.ownerId ? (
                    <YoutubePlayer videoId={currentSong.occurences[0].externalId} playing={isYoutubePlayerPlaying} onVideoHasEnded={startNextSong} />
                ) : null}
                {initialLoading || showLoadingIndicator ? (
                    <ActivityIndicator size="large" />
                ) : (
                    <>
                        <ScrollView>
                            <SongList
                                songs={playlist ? playlist.map(p => p.song) : []}
                                playingSong={currentSong}
                                showPlaySongButton={false}
                                getListElementClickElement={song => {
                                    let playlistElement = playlist.find(p => p.song.id === song.id)
                                    return (
                                        <>
                                            <View style={{ display: 'flex', marginRight: 15 }}>
                                                <MaterialCommunityIcons
                                                    onPress={() => {
                                                        onLikeButtonPress(playlistElement)
                                                    }}
                                                    name={playlistElement.selfVote === 'up' ? 'thumb-up' : 'thumb-up-outline'}
                                                    color={'lime'}
                                                    size={20}
                                                />
                                                <Text>{playlistElement.upVotes || 0}</Text>
                                            </View>
                                            <View style={{ display: 'flex' }}>
                                                <MaterialCommunityIcons
                                                    onPress={() => {
                                                        onDislikeButtonPress(playlistElement)
                                                    }}
                                                    name={playlistElement.selfVote === 'down' ? 'thumb-down' : 'thumb-down-outline'}
                                                    color={'red'}
                                                    size={20}
                                                />
                                                <Text>{playlistElement.downVotes || 0}</Text>
                                            </View>
                                        </>
                                    )
                                }}
                            />
                        </ScrollView>
                        <View style={styles.buttonContainer}>
                            <Button
                                textColor="white"
                                onPress={() => {
                                    setModalElementToShow(
                                        <AddSong
                                            onAfterSongAdded={song => {
                                                addSongToParty(song.id)
                                            }}
                                            platforms={party.platforms}
                                        />
                                    )
                                }}
                                style={{ ...styles.addButton, width: storage.contains(SPOTIFY_TOKEN) ? '30%' : '45%' }}
                            >
                                Add Song
                            </Button>
                            <Button
                                textColor="white"
                                onPress={() => {
                                    setModalElementToShow(
                                        <AddSpotifyPlaylist
                                            onAfterPlaylistAdded={async playlist => {
                                                try {
                                                    let tracks = await getSpotifyTracksForPlaylist(playlist.id)
                                                    let listController = await getListController()
                                                    let userLists = (await listController.apiListsGet()).data
                                                    let { data: newList } = await listController.apiListsListIdSongsSpotifyPost(
                                                        userLists[0].id,
                                                        tracks.map(trackEntry => trackEntry.track.id)
                                                    )
                                                    let partyController = await getPartyController()
                                                    partyController.apiPartyAddPost(newList.songs.map(song => song.id))

                                                    setModalElementToShow(null)

                                                    setPlaylist([])
                                                    setShowLoadingIndicator(true)
                                                    await loadSongs()
                                                    setShowLoadingIndicator(false)
                                                } catch (e) {
                                                    showErrorToast(e)
                                                }
                                            }}
                                        />
                                    )
                                }}
                                style={{ ...styles.addButton, display: storage.contains(SPOTIFY_TOKEN) ? 'flex' : 'none' }}
                            >
                                Add Playlist
                            </Button>
                            <Button
                                textColor="white"
                                onPress={showInviteCode}
                                style={{ ...styles.addButton, width: storage.contains(SPOTIFY_TOKEN) ? '30%' : '45%' }}
                            >
                                Invite Code
                            </Button>
                        </View>
                        <Button textColor="white" onPress={leaveParty} style={styles.leaveButton}>
                            Leave Party
                        </Button>
                    </>
                )}
                {!!modalElementToShow ? (
                    <Portal>
                        <Modal
                            visible={!!modalElementToShow}
                            onDismiss={() => {
                                setModalElementToShow(null)
                            }}
                            contentContainerStyle={{ ...globalStyles.fullModalContainer }}
                        >
                            {modalElementToShow}
                        </Modal>
                    </Portal>
                ) : null}
            </MainLayout>
        </>
    )
}

const styles = StyleSheet.create({
    leaveButton: {
        width: '100%',
        display: 'flex',
        backgroundColor: 'red'
    },
    addButton: {
        width: '30%',
        backgroundColor: 'blue'
    },
    buttonContainer: {
        minHeight: 40,
        flex: 1,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 10
    }
})
