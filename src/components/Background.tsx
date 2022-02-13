import React from 'react'
import { Dimensions, View } from 'react-native';

interface Props {}

function Background(props: Props) {
    const {} = props;
    
    let deviceHeight = Dimensions.get('window').height;

    return (
        <View
        style={{
            position:'absolute',
             backgroundColor: '#DC3834', 
             width: 1000, 
             height: deviceHeight + 290,
             top: -250,
             transform:[
                 {rotate: '-70deg'}
             ]
            }}
        />
    )
}

export default Background
