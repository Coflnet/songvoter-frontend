import MainLayout from '../layouts/MainLayout'
import { StyleSheet, View } from 'react-native'
import { useState } from 'react'
import { QRCodeScanner } from '../components/QRCodeScanner'
import { Button, Divider, Text, TextInput, useTheme } from 'react-native-paper'
import HeaderText from '../components/HeaderText'
import { showErrorToast } from '../utils/ErrorUtils'
import { getPartyController } from '../utils/ApiUtils'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useRouter } from 'expo-router'
import { CURRENT_PARTY, storage } from '../utils/StorageUtils'

export default function App() {
    const router = useRouter()
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
                <Text>Scan the QR-Code</Text>
                <View style={{ height: 250 }}>
                    <QRCodeScanner onBarcodeScan={code => onJoinParty(code as string)} disableAfterScan />
                </View>
                <Divider style={styles.divider} />
                <Text>Or join by entering the Party ID</Text>
                <TextInput label="Party ID" style={styles.textInput} value={joinPartyUrl} onChangeText={text => setJoinPartyUrl(text)} />
                <Button
                    mode="contained"
                    style={styles.joinButton}
                    onPress={() => {
                        onJoinParty(joinPartyUrl)
                    }}
                >
                    Join
                </Button>
            </MainLayout>
        </>
    )
}

const styles = StyleSheet.create({
    joinButton: {
        marginTop: 20
    },
    divider: {
        marginTop: 10,
        marginBottom: 10
    },
    textInput: {
        marginTop: 3
    }
})
