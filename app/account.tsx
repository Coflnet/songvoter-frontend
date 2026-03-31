import { Divider, Surface, Text, useTheme } from 'react-native-paper'
import MainLayout from '../layouts/MainLayout'
import { StyleSheet, View } from 'react-native'
import { useEffect } from 'react'
import GoogleLogin from '../components/GoogleLogin'
import SpotifyLogin from '../components/SpotifyLogin'
import HeaderText from '../components/HeaderText'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function App() {
    let theme = useTheme()

    useEffect(() => {}, [])

    return (
        <>
            <MainLayout>
                <View style={styles.container}>
                    <HeaderText text="Account" />
                    <Text style={{ ...theme.fonts.titleMedium, marginBottom: 12 }}>Connected Services</Text>
                    <Surface style={styles.serviceCard} elevation={1}>
                        <View style={styles.serviceRow}>
                            <MaterialCommunityIcons name="google" size={24} color={theme.colors.primary} style={styles.serviceIcon} />
                            <Text style={{ flex: 1, ...theme.fonts.bodyLarge }}>Google</Text>
                            <View style={styles.loginButton}>
                                <GoogleLogin />
                            </View>
                        </View>
                        <Divider />
                        <View style={styles.serviceRow}>
                            <MaterialCommunityIcons name="spotify" size={24} color="#1DB954" style={styles.serviceIcon} />
                            <Text style={{ flex: 1, ...theme.fonts.bodyLarge }}>Spotify</Text>
                            <View style={styles.loginButton}>
                                <SpotifyLogin />
                            </View>
                        </View>
                    </Surface>
                </View>
            </MainLayout>
        </>
    )
}

const styles = StyleSheet.create({
    container: {},
    serviceCard: {
        borderRadius: 12,
        overflow: 'hidden'
    },
    serviceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        minHeight: 64
    },
    serviceIcon: {
        marginRight: 12
    },
    loginButton: {
        maxWidth: '50%'
    }
})
