import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router, usePathname } from 'expo-router'
import { View } from 'react-native'
import { Text, TouchableRipple, useTheme } from 'react-native-paper'
import { globalStyles } from '../styles/globalStyles'

export const DEFAULT_ROUTES: Route[] = [
    {
        href: '/',
        icon: 'home-outline',
        selectedIcon: 'home',
        label: 'Home',
        aliasRoutes: ['/party-overview', '/create-party', '/invite-party']
    },
    {
        href: '/your-songs',
        icon: 'music-note-outline',
        selectedIcon: 'music-note',
        label: 'Your Songs'
    },
    {
        href: '/account',
        icon: 'account-outline',
        selectedIcon: 'account',
        label: 'Account'
    }
]

export interface Route {
    href: string
    icon: keyof typeof MaterialCommunityIcons.glyphMap
    selectedIcon: keyof typeof MaterialCommunityIcons.glyphMap
    label: string
    aliasRoutes?: string[]
}

interface Props {
    routes?: Route[]
}

export function FooterNavigation(props: Props) {
    let pathname = usePathname()
    let theme = useTheme()

    let routes = props.routes || DEFAULT_ROUTES

    function isSelected(route: Route) {
        return route.href === pathname || (route.aliasRoutes && route.aliasRoutes.findIndex(r => r === pathname) !== -1)
    }

    return (
        <View style={{ backgroundColor: theme.colors.secondaryContainer, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
            {routes.map(route => {
                const selected = isSelected(route)
                return (
                    <View key={route.href} style={{ flex: 1 }}>
                        <TouchableRipple onPress={() => router.replace(route.href)} rippleColor="rgba(0, 0, 0, .32)" borderless={true}>
                            <View style={globalStyles.horizontalCenter}>
                                <View style={selected ? { backgroundColor: theme.colors.primaryContainer, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 2, marginTop: 4 } : { paddingHorizontal: 16, paddingVertical: 2, marginTop: 4 }}>
                                    <MaterialCommunityIcons
                                        name={selected ? route.selectedIcon : route.icon}
                                        size={25}
                                        color={selected ? theme.colors.onPrimaryContainer : theme.colors.onSecondaryContainer}
                                    />
                                </View>
                                <Text style={{ fontSize: 12, color: selected ? theme.colors.primary : theme.colors.onSecondaryContainer, marginBottom: 4, fontWeight: selected ? '700' : '400' }}>{route.label}</Text>
                            </View>
                        </TouchableRipple>
                    </View>
                )
            })}
        </View>
    )
}
