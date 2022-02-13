import React from 'react'
import { View, Text } from 'react-native';

interface Props {}

function ProtectedScreen(props: Props) {
    const {} = props

    return (
        <View>
            <Text>
                Protected Screen
            </Text>
        </View>
    )
}

export default ProtectedScreen
