import React, {useContext} from 'react'
import { View, Text, Platform, KeyboardAvoidingView, Keyboard } from 'react-native';
import { loginStyles } from '../theme/loginTheme';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import LogoD from '../components/LogoD';
import { StackScreenProps } from '@react-navigation/stack';
import { useForm } from '../hooks/useForm';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}

function RegisterScreen(props: Props) {
    const {navigation} = props;

    const {signUp} = useContext(AuthContext);

    const { onChange, email, password, name } = useForm({
        name: '',
        email: '',
        password: ''
    });


    const onRegister = () => {
        console.log({email, password, name});
        Keyboard.dismiss();
        signUp({correo: email,nombre: name, password})
    }

    return (
        <>
           
            {/* Keyboard Avoid View */}

            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor: '#DC3834' }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={loginStyles.formContainer}>


                    <LogoD />

                    <Text style={loginStyles.title}>
                        Bienvenido
                    </Text>

                    <Text style={loginStyles.label}>
                        Nombre
                    </Text>

                    <TextInput
                        placeholder='Ingrese su nombre'
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        keyboardType='email-address'
                        underlineColorAndroid={'white'}
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIos
                        ]}
                        selectionColor="white"
                        onChangeText={(value) => onChange(value, 'name')}
                        value={name}
                        autoCapitalize='words'
                        autoCorrect={false}
                        onSubmitEditing={onRegister}

                    />

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
                        onSubmitEditing={onRegister}

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
                        onSubmitEditing={onRegister}

                    />

                    {/* Login Button */}

                    <View style={loginStyles.buttonContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={loginStyles.button}
                            onPress={onRegister}
                        >
                            <Text style={loginStyles.buttonText}>Registrarme!</Text>
                        </TouchableOpacity>
                    </View>


                    {/* Crear un nueva cuenta */}

                    <View style={loginStyles.newUserContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.replace('LoginScreen')}
                        >
                            <Text style={{ ...loginStyles.buttonText, fontSize: 15 }}>
                                Iniciar Sesion
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </KeyboardAvoidingView>



        </>
    )
}

export default RegisterScreen
