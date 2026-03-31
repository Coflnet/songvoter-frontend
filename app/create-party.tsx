import { Button, Divider, HelperText, Surface, Switch, Text, TextInput, useTheme } from 'react-native-paper'
import MainLayout from '../layouts/MainLayout'
import { StyleSheet, View } from 'react-native'
import { useState } from 'react'
import HeaderText from '../components/HeaderText'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import SpotifyLogin from '../components/SpotifyLogin'
import { getPartyController } from '../utils/ApiUtils'
import { CURRENT_PARTY, SPOTIFY_TOKEN, storage } from '../utils/StorageUtils'
import { showErrorToast } from '../utils/ErrorUtils'
import { router } from 'expo-router'
import { CoflnetSongVoterModelsSongPlatform } from '../generated'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function App() {
    let theme = useTheme()
    let [partyTitle, setPartyTitle] = useState(null)
    let [useYoutube, setUseYoutube] = useState(false)
    let [useSpotify, setUseSpotify] = useState(false)
    let [hasSpotifyConnected, setHasSpotifyConnected] = useState(storage.contains(SPOTIFY_TOKEN))
    let [isCreatingParty, setIsCreatingParty] = useState(false)

    async function onPartyCreate() {
        if (!useYoutube && !useSpotify) {
            Toast.show({
                type: 'info',
                text1: 'Please select at least 1 platform'
            })
            return
        }
        if (!partyTitle) {
            setPartyTitle('')
            return
        }
        setIsCreatingParty(true)
        let partyController = await getPartyController()
        try {
            let platforms: CoflnetSongVoterModelsSongPlatform[] = []
            if (useYoutube) {
                platforms.push('youtube')
            }
            if (useSpotify) {
                platforms.push('spotify')
            }
            let newParty = (await partyController.apiPartyPost(partyTitle, platforms)).data

            storage.set(CURRENT_PARTY, JSON.stringify(newParty))
            setIsCreatingParty(false)
            router.push('/invite-party')
        } catch (e) {
            if (e?.response?.data === 'You are already in a party, leave it first') {
                let party = (await partyController.apiPartyGet()).data
                storage.set(CURRENT_PARTY, JSON.stringify(party))
                router.push('/party-overview')
            }
            setIsCreatingParty(false)
            showErrorToast(e)
        }
        return
    }

    return (
        <>
            <MainLayout>
                <View>
                    <HeaderText text="Create Party" />
                    <View style={{ marginBottom: 20 }}>
                        <TextInput
                            label="Party Name"
                            error={partyTitle === ''}
                            style={styles.textInput}
                            mode="outlined"
                            onChangeText={text => setPartyTitle(text)}
                        />
                        <HelperText type="error" visible={partyTitle === ''}>
                            Please enter a party name
                        </HelperText>
                    </View>
                    <Text style={{ ...theme.fonts.titleMedium, marginBottom: 12 }}>Music Platforms</Text>
                    <Surface style={styles.platformCard} elevation={1}>
                        <View style={styles.row}>
                            <MaterialCommunityIcons name="spotify" size={24} color="#1DB954" style={styles.platformIcon} />
                            <Text style={{ flex: 1, ...theme.fonts.bodyLarge }}>Spotify</Text>
                            {!hasSpotifyConnected ? (
                                <SpotifyLogin
                                    onAfterLogin={() => {
                                        setHasSpotifyConnected(true)
                                    }}
                                />
                            ) : (
                                <Switch value={useSpotify} onValueChange={setUseSpotify} />
                            )}
                        </View>
                        <Divider />
                        <View style={styles.row}>
                            <MaterialCommunityIcons name="youtube" size={24} color="#FF0000" style={styles.platformIcon} />
                            <Text style={{ flex: 1, ...theme.fonts.bodyLarge }}>YouTube</Text>
                            <Switch value={useYoutube} onValueChange={setUseYoutube} />
                        </View>
                    </Surface>
                    <Button mode="contained" icon="party-popper" onPress={onPartyCreate} loading={isCreatingParty} disabled={isCreatingParty} style={styles.createButton}>
                        Create Party
                    </Button>
                </View>
            </MainLayout>
        </>
    )
}

const styles = StyleSheet.create({
    textInput: {
        marginTop: 3
    },
    platformCard: {
        borderRadius: 12,
        marginBottom: 24,
        overflow: 'hidden'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16
    },
    platformIcon: {
        marginRight: 12
    },
    createButton: {
        borderRadius: 12
    }
})
