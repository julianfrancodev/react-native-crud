import { Usuario } from '../interfaces/appInterfaces';
export interface AuthState{
    status: 'checking' | 'auth' | 'no-auth',
    token: string | null,
    errorMessage: string,
    user: Usuario | null,

}

export type AuthAction = 
        | {type: 'signUp', payload: {token :string, user: Usuario}}
        | {type: 'addError', payload: string}
        | {type: 'removeError' }
        | {type: 'noAuth' }
        | {type: 'logout' }


export const authReducer = (state: AuthState, action: AuthAction): AuthState =>{

    switch (action.type) {
        
        case 'addError':
           return {
               ...state,
               user: null,
               status: 'no-auth',
               token: null,
               errorMessage: action.payload
           }

        case 'removeError':  
        return{
            ...state,
            errorMessage: ''
        }

        case 'signUp':
            return {
                ...state,
                errorMessage: '',
                status: 'auth',
                token: action.payload.token,
                user: action.payload.user
            }

        case 'logout':    
        case 'noAuth':
            return {
                ...state,
                token: null,
                user: null,
                status:'no-auth'

            }

        default:
            return {
                ...state
            }
    }

}