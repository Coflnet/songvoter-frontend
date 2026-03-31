import MainLayout from '../layouts/MainLayout'
import { Redirect, useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { CURRENT_PARTY, GOOGLE_AUTH_OBJECT, storage } from '../utils/StorageUtils'
import { Button, Text, useTheme } from 'react-native-paper'
import { View, StyleSheet, Linking } from 'react-native'
import { globalStyles } from '../styles/globalStyles'
import { showErrorToast } from '../utils/ErrorUtils'
import HeaderText from '../components/HeaderText'
import { getPartyController } from '../utils/ApiUtils'
import Toast from 'react-native-toast-message'

export default function App() {
    const router = useRouter()
    const theme = useTheme()

    useEffect(() => {
        checkDeeplinkIfUserIsInParty()
    }, [])

    if (!storage.contains(GOOGLE_AUTH_OBJECT)) {
        return <Redirect href="/google-signin" />
    }

    if (storage.contains(CURRENT_PARTY)) {
        return <Redirect href="/party-overview" />
    }

    async function checkDeeplinkIfUserIsInParty() {
        let initialURL = await Linking.getInitialURL()
        if (initialURL) {
            Toast.show({
                type: 'success',
                text1: initialURL
            })
            let id = initialURL.split('/invite/')[1]
            try {
                let partyController = await getPartyController()
                await partyController.apiPartyInviteIdJoinPost(id)
            } catch (e) {
                showErrorToast(e)
            }
        }
    }

    return (
        <>
            <MainLayout>
                <View style={globalStyles.fullCenterContainer}>
                    <HeaderText text="SongVoter" />
                    <Text style={{ ...theme.fonts.bodyLarge, color: theme.colors.onSurfaceVariant, marginBottom: 40, textAlign: 'center' }}>
                        Vote on songs together with your friends
                    </Text>
                    <Button
                        mode="contained"
                        icon="party-popper"
                        onPress={() => {
                            router.push('/create-party')
                        }}
                        style={styles.button}
                        contentStyle={styles.buttonContent}
                    >
                        Create Party
                    </Button>

                    <Button
                        mode="outlined"
                        icon="qrcode-scan"
                        onPress={() => {
                            router.push('/join-party')
                        }}
                        style={styles.button}
                        contentStyle={styles.buttonContent}
                    >
                        Join Party
                    </Button>
                </View>
            </MainLayout>
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        margin: 8,
        width: '70%',
        borderRadius: 12
    },
    buttonContent: {
        paddingVertical: 6
    }
})
