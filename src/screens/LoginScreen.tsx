import React, { useContext, useEffect } from 'react'
import { View, Text, Platform, KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Background from '../components/Background';
import LogoD from '../components/LogoD';
import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';
import Toast from 'react-native-toast-message';

interface Props extends StackScreenProps<any, any> {

}

function LoginScreen(props: Props) {
    const { navigation } = props;

    const { signIn, errorMessage } = useContext(AuthContext);

    const { onChange, email, password } = useForm({
        email: '',
        password: ''
    });


    useEffect(() => {
        if (errorMessage.length === 0) return;

        //todo: respare this inthe future

        // showToast();

        console.log("desde el effect sale error")

    }, [errorMessage])

    const showToast = () => {
        Toast.show({
            type: 'success',
            text1: 'Hello',
            text2: 'This is some something 👋'
        });
    }


    const onLogin = () => {
        console.log({ email, password });
        Keyboard.dismiss();
        signIn({ correo: email, password })
    }


    return (
        <>
            {/* Background */}
            <Background />
            {/* Keyboard Avoid View */}

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={loginStyles.formContainer}>


                    <LogoD />

                    <Text style={loginStyles.title}>
                        Bienvenido
                    </Text>
                    <Text style={loginStyles.label}>
                        Email
                    </Text>

                    <TextInput
                        placeholder='Ingrese su email'
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        keyboardType='email-address'
                        underlineColorAndroid={'white'}
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIos
                        ]}
                        selectionColor="white"
                        onChangeText={(value) => onChange(value, 'email')}
                        value={email}
                        autoCapitalize='none'
                        autoCorrect={false}
                        onSubmitEditing={onLogin}

                    />

                    <Text style={loginStyles.label}>
                        Contraseña
                    </Text>
                    <TextInput
                        placeholder='Ingrese su contraseña'
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        underlineColorAndroid={'white'}
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIos
                        ]}
                        selectionColor="white"
                        onChangeText={(value) => onChange(value, 'password')}
                        value={password}
                        autoCapitalize='none'
                        secureTextEntry={true}
                        autoCorrect={false}
                        onSubmitEditing={onLogin}

                    />

                    {/* Login Button */}

                    <View style={loginStyles.buttonContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={loginStyles.button}
                            onPress={onLogin}
                        >
                            <Text style={loginStyles.buttonText}>Iniciar Sesion</Text>
                        </TouchableOpacity>
                    </View>


                    {/* Crear un nueva cuenta */}

                    <View style={loginStyles.newUserContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.replace('RegisterScreen')}
                        >
                            <Text style={{ ...loginStyles.buttonText, fontSize: 15 }}>
                                Crear Cuenta
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </KeyboardAvoidingView>



        </>
    )
}

export default LoginScreen
