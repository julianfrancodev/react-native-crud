import React from 'react'
import { ActivityIndicator, View } from 'react-native';

interface Props {}

function LoadingScreen(props: Props) {
    const {} = props

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={50} color={'red'}/>
        </View>
    )
}

export default LoadingScreen
