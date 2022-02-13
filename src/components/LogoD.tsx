import React from 'react'
import { Image, View } from 'react-native';

interface Props {}

function LogoD(props: Props) {
    const {} = props;

    return (
        <View style={{
            alignItems: 'center',
            marginBottom: 20
        }}>

            <Image

            source={require('../assets/dav-logo.png')}
            style={{
                width: 208,
                height:100,
                resizeMode: 'stretch'
            }}
            
            />

        </View>
    )
}

export default LogoD
