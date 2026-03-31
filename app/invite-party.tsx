import { ActivityIndicator, Button, Surface, Text, useTheme } from 'react-native-paper'
import MainLayout from '../layouts/MainLayout'
import { StyleSheet, View } from 'react-native'
import { useEffect, useState } from 'react'
import QRCode from 'react-native-qrcode-svg'
import { globalStyles } from '../styles/globalStyles'
import { showErrorToast } from '../utils/ErrorUtils'
import HeaderText from '../components/HeaderText'
import { getPartyController } from '../utils/ApiUtils'
import { useRouter } from 'expo-router'
import * as Clipboard from 'expo-clipboard'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function App() {
    let router = useRouter()
    let theme = useTheme()
    let [inviteLink, setInviteLink] = useState('https://songvoter.party')
    let [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        loadPartyLink()
    }, [])

    async function loadPartyLink() {
        let partyController = await getPartyController()
        setIsLoading(true)
        try {
            let link = await partyController.apiPartyInviteLinkGet()
            setInviteLink(link.data.link)
        } catch (e) {
            if (e.response?.status === 404) {
                Toast.show({
                    type: 'error',
                    text1: 'Party not found'
                })
                router.push('/')
                return
            }
            showErrorToast(e)
        } finally {
            setIsLoading(false)
        }
    }

    function navigateToOverview() {
        router.push('/party-overview')
    }

    async function onCopyPress() {
        await Clipboard.setStringAsync(inviteLink)
        Toast.show({
            type: 'success',
            text1: 'Invite link copied!'
        })
    }

    const inviteCode = inviteLink.includes('/invite/') ? inviteLink.split('/invite/')[1] : inviteLink

    return (
        <>
            <MainLayout>
                <View style={{ ...globalStyles.fullCenterContainer }}>
                    <HeaderText text="Invite Friends" />
                    {isLoading ? (
                        <ActivityIndicator size="large" />
                    ) : (
                        <>
                            <Surface style={styles.qrContainer} elevation={2}>
                                <QRCode value={inviteLink} size={200} quietZone={10} />
                            </Surface>
                            <Surface style={styles.codeCard} elevation={1}>
                                <Text style={{ ...theme.fonts.labelMedium, color: theme.colors.onSurfaceVariant, marginBottom: 4 }}>
                                    Invite Code
                                </Text>
                                <View style={styles.codeRow}>
                                    <Text style={{ ...theme.fonts.titleMedium, flex: 1, color: theme.colors.onSurface }} selectable>
                                        {inviteCode}
                                    </Text>
                                    <MaterialCommunityIcons
                                        name="content-copy"
                                        size={22}
                                        color={theme.colors.primary}
                                        onPress={onCopyPress}
                                    />
                                </View>
                            </Surface>
                            <Button mode="contained" icon="arrow-right" onPress={navigateToOverview} style={styles.button}>
                                Go to Party
                            </Button>
                        </>
                    )}
                </View>
            </MainLayout>
        </>
    )
}

const styles = StyleSheet.create({
    qrContainer: {
        padding: 16,
        borderRadius: 16,
        marginBottom: 24
    },
    codeCard: {
        padding: 16,
        borderRadius: 12,
        width: '90%',
        marginBottom: 24
    },
    codeRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        borderRadius: 12,
        width: '80%'
    }
})
