import MainLayout from '../layouts/MainLayout'
import { StyleSheet, View } from 'react-native'
import { useState } from 'react'
import { QRCodeScanner } from '../components/QRCodeScanner'
import { Button, Divider, Surface, Text, TextInput, useTheme } from 'react-native-paper'
import HeaderText from '../components/HeaderText'
import { showErrorToast } from '../utils/ErrorUtils'
import { getPartyController } from '../utils/ApiUtils'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useRouter } from 'expo-router'
import { CURRENT_PARTY, storage } from '../utils/StorageUtils'

export default function App() {
    const router = useRouter()
    const theme = useTheme()
    let [joinPartyUrl, setJoinPartyUrl] = useState('')

    async function onJoinParty(joinValue: string) {
        if (!joinValue || joinValue.length < 6) {
            Toast.show({
                text1: 'Invalid QR-Code',
                text2: "This QR-Code doesn't seem to be from a SongVoter party"
            })
            return
        }

        let id = !joinValue.toLocaleLowerCase().includes('songvoter.party') ? joinValue : joinValue.split('/invite/')[1]
        try {
            let partyController = await getPartyController()
            await partyController.apiPartyInviteIdJoinPost(id)
            let party = (await partyController.apiPartyGet()).data
            storage.set(CURRENT_PARTY, JSON.stringify(party))
            router.push('/party-overview')
        } catch (e) {
            if (e.response?.status === 404) {
                Toast.show({
                    type: 'info',
                    text1: 'Party not found!'
                })
            } else {
                showErrorToast(e)
            }
        }
    }

    return (
        <>
            <MainLayout>
                <HeaderText text="Join Party" />
                <Text style={{ ...theme.fonts.bodyMedium, color: theme.colors.onSurfaceVariant, marginBottom: 12 }}>
                    Scan a QR code to join instantly
                </Text>
                <Surface style={styles.scannerCard} elevation={1}>
                    <View style={{ height: 250 }}>
                        <QRCodeScanner onBarcodeScan={code => onJoinParty(code as string)} disableAfterScan />
                    </View>
                </Surface>
                <View style={styles.dividerRow}>
                    <Divider style={styles.dividerLine} />
                    <Text style={{ ...theme.fonts.labelMedium, color: theme.colors.onSurfaceVariant, marginHorizontal: 12 }}>OR</Text>
                    <Divider style={styles.dividerLine} />
                </View>
                <Text style={{ ...theme.fonts.bodyMedium, color: theme.colors.onSurfaceVariant, marginBottom: 8 }}>
                    Enter the party invite code manually
                </Text>
                <TextInput
                    label="Invite Code"
                    mode="outlined"
                    style={styles.textInput}
                    value={joinPartyUrl}
                    onChangeText={text => setJoinPartyUrl(text)}
                    autoCapitalize="none"
                />
                <Button
                    mode="contained"
                    icon="login"
                    style={styles.joinButton}
                    onPress={() => {
                        onJoinParty(joinPartyUrl)
                    }}
                >
                    Join Party
                </Button>
            </MainLayout>
        </>
    )
}

const styles = StyleSheet.create({
    scannerCard: {
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 16
    },
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16
    },
    dividerLine: {
        flex: 1
    },
    joinButton: {
        marginTop: 12,
        borderRadius: 12
    },
    textInput: {
        marginTop: 4
    }
})
