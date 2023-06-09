import { Button, Text, useTheme } from 'react-native-paper'
import MainLayout from '../layouts/MainLayout'
import { Keyboard, StyleSheet, View } from 'react-native'
import { useEffect, useState } from 'react'
import QRCode from 'react-native-qrcode-svg'
import { CoflnetSongVoterDBModelsParty } from '../generated'
import { globalStyles } from '../styles/globalStyles'
import { showErrorToast } from '../utils/ToastUtils'
import HeaderText from '../components/HeaderText'
import { getPartyController } from '../utils/ApiUtils'

export default function App() {
    let theme = useTheme()
    let [party, setParty] = useState<CoflnetSongVoterDBModelsParty>()
    let [inviteLink, setInviteLink] = useState('https://songvoter.party')

    useEffect(() => {
        loadPartyLink()
    }, [])

    async function loadPartyLink() {
        try {
            let partyController = await getPartyController()
            let party = await partyController.partyPost()
            setParty(party)
            let link = await partyController.partyInviteLinkGet({
                partyId: party.id.toString()
            })
            setInviteLink(link)
        } catch (e) {
            console.error(JSON.stringify(e))
            showErrorToast(e)
        }
    }

    return (
        <>
            <MainLayout>
                <View style={{ ...globalStyles.fullCenterContainer }}>
                    <HeaderText text="Invite people to your party" />
                    <QRCode value={inviteLink} />
                    <View>
                        <Text style={styles.joinCode}>
                            <Text style={{ fontWeight: '800' }}>Code: </Text>
                            {inviteLink}
                        </Text>
                    </View>
                </View>
            </MainLayout>
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        width: '50%'
    },
    joinCode: {
        marginTop: 15,
        width: '50%',
        color: 'white'
    }
})
