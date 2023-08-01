import MainLayout from '../layouts/MainLayout'
import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View, Image } from 'react-native'
import { ActivityIndicator, FAB, IconButton, List, Modal, Portal, Text } from 'react-native-paper'
import { globalStyles } from '../styles/globalStyles'
import AddSong from '../components/AddSong'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import HeaderText from '../components/HeaderText'
import { showErrorToast } from '../utils/ToastUtils'
import { CoflnetSongVoterModelsPlayList, CoflnetSongVoterModelsSong } from '../generated'
import SongListElement from '../components/SongListElement'
import { getListController } from '../utils/ApiUtils'

export default function YourSongs() {
    let [playlists, setPlaylists] = useState<CoflnetSongVoterModelsPlayList[]>([])
    let [showAddSongModal, setShowAddSongModal] = useState(false)
    let [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        loadPlaylists()
    }, [])

    async function loadPlaylists() {
        try {
            setIsLoading(true)
            let listController = await getListController()
            let playlists = await listController.listsGet()

            if (playlists?.length === 0) {
                await listController.listsPost({
                    coflnetSongVoterModelsPlayListCreate: {
                        title: 'Default Playlist',
                        songs: []
                    }
                })
                playlists = await listController.listsGet()
            }
            setPlaylists(playlists)
        } catch (e) {
            showErrorToast(e)
        } finally {
            setIsLoading(false)
        }
    }

    async function onSongAdded(song: CoflnetSongVoterModelsSong) {
        try {
            let listController = await getListController()
            await listController.listsListIdSongsPost({
                listId: playlists[0].id,
                coflnetSongVoterModelsSongId: {
                    id: song.id
                }
            })
        } catch (e) {
            showErrorToast(e)
        }
        setShowAddSongModal(false)
        Toast.show({
            type: 'success',
            text1: 'Song added',
            text2: song.title
        })
        setPlaylists([])
        loadPlaylists()
    }

    async function removeSong(song: CoflnetSongVoterModelsSong) {
        try {
            let listController = await getListController()
            await listController.listsListIdSongsSongIdDelete({
                listId: playlists[0].id,
                songId: song.id
            })
            Toast.show({
                type: 'success',
                text1: 'Song removed',
                text2: song.title
            })
            loadPlaylists()
        } catch (e) {
            showErrorToast(e)
        }
    }

    return (
        <MainLayout>
            <HeaderText text="Your Songs" />
            {isLoading ? <ActivityIndicator size="large" /> : null}
            <ScrollView>
                {playlists && playlists.length > 0
                    ? playlists[0].songs?.map(song => (
                          <SongListElement
                              key={song.id}
                              song={song}
                              clickElement={<IconButton icon="delete" iconColor={'red'} size={20} onPress={() => removeSong(song)} />}
                          />
                      ))
                    : null}
            </ScrollView>
            <FAB
                icon="plus"
                label="Add song"
                style={styles.fab}
                onPress={() => {
                    setShowAddSongModal(true)
                }}
            />
            <Portal>
                <Modal
                    visible={showAddSongModal}
                    onDismiss={() => {
                        setShowAddSongModal(false)
                    }}
                    contentContainerStyle={{ ...globalStyles.fullModalContainer }}
                >
                    <AddSong onAddSong={onSongAdded} />
                </Modal>
            </Portal>
        </MainLayout>
    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    }
})
