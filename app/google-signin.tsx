import { View } from 'react-native'
import MainLayout from '../layouts/MainLayout'
import HeaderText from '../components/HeaderText'
import GoogleLogin from '../components/GoogleLogin'
import { globalStyles } from '../styles/globalStyles'
import { router } from 'expo-router'
import { Text, useTheme } from 'react-native-paper'

export default function GoogleSigninPage() {
    const theme = useTheme()

    function onAfterLogin() {
        router.push('/')
    }

    return (
        <>
            <MainLayout routes={[]}>
                <View style={globalStyles.fullCenterContainer}>
                    <HeaderText text={'SongVoter'} />
                    <Text style={{ ...theme.fonts.bodyLarge, color: theme.colors.onSurfaceVariant, marginBottom: 32, textAlign: 'center' }}>
                        Sign in to start or join a party
                    </Text>
                    <GoogleLogin onAfterLogin={onAfterLogin} />
                </View>
            </MainLayout>
        </>
    )
}
