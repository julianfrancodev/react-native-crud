import { StyleSheet } from "react-native";


export const loginStyles = StyleSheet.create({
    formContainer:{
        flex: 1,
        paddingHorizontal: 40,
        justifyContent: 'center',
        height: 600,
        marginBottom: 100
    },
    title:{
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20
    },
    label:{
        marginTop: 25,
        color: 'white',
        fontWeight: 'bold'
    },
    inputField: {
        color: 'white',
        fontSize: 20,
    },
    inputFieldIos:{
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        paddingBottom: 4
    },
    buttonContainer:{
        alignItems: 'center',
        marginTop: 50,

    },
    button:{
        borderWidth: 2,
        borderColor:'white',
        paddingHorizontal: 50, 
        paddingVertical: 10,
        borderRadius: 5
    },
    buttonText:{
        color: 'white',
        fontSize: 18
    },
    newUserContainer:{
        alignItems: 'center',
        marginTop: 30
    }
});