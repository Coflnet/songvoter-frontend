import { List, Text } from 'react-native-paper'
import { CoflnetSongVoterModelsSong } from '../generated'
import { View, Image, StyleSheet } from 'react-native'

interface Props {
    song: CoflnetSongVoterModelsSong
    clickElement: JSX.Element
    isPlaying?: boolean
    playButtonElement?: JSX.Element
}

export default function SongListElement(props: Props) {
    return (
        <>
            <List.Item
                style={props.isPlaying ? styles.selectedItem : styles.item}
                key={props.song.id}
                title={<Text style={props.isPlaying ? styles.selectedTitle : null}>{props.song.title}</Text>}
                descriptionEllipsizeMode={'middle'}
                description={
                    <View>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ width: 200 }}>
                            {props.song.occurences[0].artist}
                        </Text>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ width: 200, opacity: 0.6, fontSize: 11 }}>
                            {props.song.occurences[0].platform}
                        </Text>
                    </View>
                }
                left={() => (
                    <>
                        {props.playButtonElement}
                        <Image style={styles.thumbnail} source={{ uri: props.song.occurences[0].thumbnail }} />
                    </>
                )}
                right={() => props.clickElement}
            />
        </>
    )
}

const styles = StyleSheet.create({
    item: {
        borderRadius: 8,
        marginVertical: 2
    },
    selectedItem: {
        backgroundColor: '#2a2d31',
        borderRadius: 8,
        borderLeftWidth: 3,
        borderLeftColor: 'rgb(165, 200, 255)',
        marginVertical: 2
    },
    selectedTitle: {
        color: 'rgb(165, 200, 255)',
        fontWeight: '600'
    },
    thumbnail: {
        width: 56,
        height: 56,
        borderRadius: 4,
        marginLeft: 10,
        alignSelf: 'center'
    }
})
