import React, { useContext } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';

interface Props {}

function ProtectedScreen(props: Props) {
    const {} = props;

    const {user, logout} = useContext(AuthContext)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Protected Screen
            </Text>

            <Text>
                {JSON.stringify(user, null, 5)}
            </Text>

            <Button
            color={"red"}
            title='Logout'
            onPress={()=> logout()}
            />
        </View>
    )
}

export default ProtectedScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    title:{
        fontSize: 20,
        marginBottom: 20
    }
})
