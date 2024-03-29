import { ActivityIndicator, IconButton, Modal, Portal, Searchbar, Text, useTheme } from 'react-native-paper'
import { showErrorToast } from '../utils/ErrorUtils'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { getListController, getSongController } from '../utils/ApiUtils'
import { CoflnetSongVoterModelsSong, CoflnetSongVoterModelsSongPlatform } from '../generated'
import SongListElement from './SongListElement'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { globalStyles } from '../styles/globalStyles'
import { ConfigureSearch } from './ConfigureSearch'
import { getSpotifyPlaylists } from '../utils/SpotifyUtils'

interface Props {
    playlistId?: string
    onAfterSongAdded(song: CoflnetSongVoterModelsSong)
    platforms?: CoflnetSongVoterModelsSongPlatform[]
    showSelectPlatformButton?: boolean
}

interface SongListItem extends CoflnetSongVoterModelsSong {
    addingState?: 'adding' | 'added'
}

export default function AddSong(props: Props) {
    let [results, setResults] = useState<SongListItem[]>([])
    let [isLoading, setIsLoading] = useState<boolean>()
    let [showLongLoadingText, setShowLongLoadingText] = useState(false)
    let [searchText, setSearchText] = useState('')
    let [showSelectPlatformModal, setShowSelectPlatformModal] = useState(false)
    let [platforms, setPlatforms] = useState(props.platforms)
    let searchTextRef = useRef(searchText)
    searchTextRef.current = searchText

    let resultsRef = useRef(results)
    resultsRef.current = results

    function debounce(func, delay) {
        let timeoutId

        return function (...args) {
            clearTimeout(timeoutId)

            timeoutId = setTimeout(() => {
                func.apply(this, args)
            }, delay)
        }
    }

    async function search(searchText: string) {
        if (!searchText) {
            return
        }
        searchTextRef.current = searchText
        let timeout
        try {
            setIsLoading(true)
            setResults([])

            timeout = setTimeout(() => {
                setShowLongLoadingText(true)
            }, 3000)

            let controller = await getSongController()

            let results = (await controller.apiSongsSearchGet(searchText, platforms)).data
            if (searchText !== searchTextRef.current) {
                return
            }
            setResults(results)
            clearTimeout(timeout)
            setIsLoading(false)
            setShowLongLoadingText(false)
        } catch (e) {
            showErrorToast(e)
            clearTimeout(timeout)
            setIsLoading(false)
            setShowLongLoadingText(false)
        }
    }

    async function onAddSong(song: SongListItem) {
        let songs = [...results]
        let s = songs.find(s => s.id === song.id)
        if (s) {
            s.addingState = 'adding'
        }
        setResults(songs)
        try {
            if (props.playlistId) {
                let listController = await getListController()
                await listController.apiListsListIdSongsPost(props.playlistId, {
                    id: song.id
                })
            }
            Toast.show({
                type: 'success',
                text1: 'Song added',
                text2: song.title
            })
            if (props.onAfterSongAdded) {
                props.onAfterSongAdded(song)
            }
            let newResults = [...resultsRef.current]
            let s = resultsRef.current.find(s => s.id === song.id)
            if (s) {
                s.addingState = 'added'
            }
            setResults(newResults)
        } catch (e) {
            showErrorToast(e)
        }
    }

    let searchFunction = debounce(search, 500)

    return (
        <>
            <Searchbar
                placeholder={'Search...'}
                onChangeText={text => {
                    setSearchText(text)
                    searchFunction(text)
                }}
                right={() => {
                    if (!props.showSelectPlatformButton) {
                        return null
                    }
                    return (
                        <MaterialCommunityIcons
                            onPress={() => {
                                setShowSelectPlatformModal(true)
                            }}
                            name={'cog'}
                            color="white"
                            style={{ marginRight: 10 }}
                            size={20}
                        />
                    )
                }}
                value={searchText}
                autoFocus
            />
            {
                <ScrollView>
                    {isLoading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" style={{ marginTop: 25 }} />
                            {showLongLoadingText ? (
                                <>
                                    <Text>Fetching new song information.</Text>
                                    <Text>Search might take a bit longer...</Text>
                                </>
                            ) : null}
                        </View>
                    ) : (
                        results.map(result => (
                            <SongListElement
                                key={result.id}
                                song={result}
                                clickElement={
                                    !result.addingState ? (
                                        <IconButton icon="plus" mode="outlined" iconColor={'lime'} size={20} onPress={() => onAddSong(result)} />
                                    ) : result.addingState === 'adding' ? (
                                        <ActivityIndicator />
                                    ) : null
                                }
                            />
                        ))
                    )}
                </ScrollView>
            }
            {showSelectPlatformModal ? (
                <Portal>
                    <Modal
                        visible={showSelectPlatformModal}
                        dismissable
                        onDismiss={() => {
                            setShowSelectPlatformModal(false)
                        }}
                        contentContainerStyle={{
                            ...globalStyles.fullModalContainer,
                            aspectRatio: 1 / 1,
                            maxHeight: 300,
                            justifyContent: 'center',
                            alignSelf: 'center',
                            borderRadius: 5
                        }}
                    >
                        <ConfigureSearch
                            onPlatformsChange={platforms => {
                                setPlatforms(platforms)
                            }}
                        />
                    </Modal>
                </Portal>
            ) : null}
        </>
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16
    }
})
