import 'react-native-reanimated'
import 'react-native-gesture-handler'
import 'expo-router/entry'
import 'react-native-url-polyfill/auto'
import { registerRootComponent } from 'expo'
import { ExpoRoot } from 'expo-router'
import { MD3DarkTheme, PaperProvider } from 'react-native-paper'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export const myTheme = {
    ...MD3DarkTheme,
    colors: {
        primary: 'rgb(165, 200, 255)',
        onPrimary: 'rgb(0, 49, 95)',
        primaryContainer: 'rgb(0, 71, 134)',
        onPrimaryContainer: 'rgb(212, 227, 255)',
        secondary: 'rgb(188, 199, 220)',
        onSecondary: 'rgb(39, 49, 65)',
        secondaryContainer: 'rgb(61, 71, 88)',
        onSecondaryContainer: 'rgb(216, 227, 248)',
        tertiary: 'rgb(218, 189, 226)',
        onTertiary: 'rgb(61, 40, 70)',
        tertiaryContainer: 'rgb(85, 63, 93)',
        onTertiaryContainer: 'rgb(247, 216, 255)',
        error: 'rgb(255, 180, 171)',
        onError: 'rgb(105, 0, 5)',
        errorContainer: 'rgb(147, 0, 10)',
        onErrorContainer: 'rgb(255, 180, 171)',
        background: 'rgb(26, 28, 30)',
        onBackground: 'rgb(227, 226, 230)',
        surface: 'rgb(26, 28, 30)',
        onSurface: 'rgb(227, 226, 230)',
        surfaceVariant: 'rgb(67, 71, 78)',
        onSurfaceVariant: 'rgb(195, 198, 207)',
        outline: 'rgb(141, 145, 153)',
        outlineVariant: 'rgb(67, 71, 78)',
        shadow: 'rgb(0, 0, 0)',
        scrim: 'rgb(0, 0, 0)',
        inverseSurface: 'rgb(227, 226, 230)',
        inverseOnSurface: 'rgb(47, 48, 51)',
        inversePrimary: 'rgb(0, 95, 175)',
        elevation: {
            level0: 'transparent',
            level1: 'rgb(33, 37, 41)',
            level2: 'rgb(37, 42, 48)',
            level3: 'rgb(41, 47, 55)',
            level4: 'rgb(43, 49, 57)',
            level5: 'rgb(46, 52, 62)'
        },
        surfaceDisabled: 'rgba(227, 226, 230, 0.12)',
        onSurfaceDisabled: 'rgba(227, 226, 230, 0.38)',
        backdrop: 'rgba(45, 49, 56, 0.4)'
    }
}

export default function App() {
    const ctx = require.context('./app')

    return (
        <>
            <PaperProvider theme={myTheme}>
                <ExpoRoot context={ctx} />
            </PaperProvider>
            <Toast />
        </>
    )
}

registerRootComponent(App)
