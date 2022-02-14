import React, { createContext, useReducer, useEffect } from "react";
import { Usuario, LoginResponse, LoginData, RegisterData } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cafeApi from '../api/cafeApi';

type AuthContextProps = {
    errorMessage: string,
    token: string | null,
    user: Usuario | null,
    status: 'checking' | 'auth' | 'no-auth',
    signUp: (obj: RegisterData) => void,
    signIn: (obj: LoginData) => void,
    logout: () => void,
    removeError: () => void,
}

const AuthInitialState: AuthState = {
    status: 'checking',
    errorMessage: '',
    token: null,
    user: null
}

export const AuthContext = createContext({

} as AuthContextProps);


export const AuthProvider = ({ children }: any) => {

    useEffect(() => {

        checkToken();

    }, [])

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');

        // no token no auth
       if(!token){
           return dispatch({type:'noAuth'})
       }

       console.log('token desde checkTOekn ', token)

       const resp = await cafeApi.get('/auth');
       

       if(resp.status !== 200){
           dispatch({type: 'noAuth'});
           return;
       }

       await AsyncStorage.setItem('token', resp.data.token);

       // Hay Token 
       dispatch({
        type: 'signUp', payload: {
            token: resp.data.token,
            user: resp.data.usuario
        }
    })
    }

    const [state, dispatch] = useReducer(authReducer, AuthInitialState);

    const signIn = async ({ correo, password }: LoginData) => {
        try {

            const resp = await cafeApi.post<LoginResponse>('/auth/login', { correo, password });

            dispatch({
                type: 'signUp', payload: {
                    token: resp.data.token,
                    user: resp.data.usuario
                }
            })

            await AsyncStorage.setItem('token', resp.data.token);

        } catch (error: any) {
            console.log(error.response.data.msg);
            dispatch({ type: "addError", payload: error.response.data.msg || "Informacion incorrecta" })
        }
    }


    const signUp =  async ({correo, nombre, password}: RegisterData) => {


        try {

            const resp = await cafeApi.post<LoginResponse>('/usuarios', {correo, nombre, password});

            dispatch({
                type: 'signUp', 
                payload:{
                    token: resp.data.token,
                    user: resp.data.usuario
                }
            })

            await AsyncStorage.setItem('token', resp.data.token);
            
        } catch (error: any) {
            console.log(error.response.data.msg);
        }

     }

    const logout = async () => { 
        await AsyncStorage.removeItem('token');
        dispatch({
            type: 'logout'
        })
    }
    const removeError = () => {
        dispatch({
            type: 'removeError'
        })
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            signIn,
            signUp,
            logout,
            removeError
        }}>
            {children}
        </AuthContext.Provider>
    )

}