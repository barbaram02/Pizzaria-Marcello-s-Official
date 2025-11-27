import React, {useState, createContext, ReactNode, Children} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SingInProps) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
}

type AuthProviderProps = {
    children : ReactNode;
}

type SingInProps = {
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: ''
    })

    const [loadingAuth, setloadingAuth] = useState(false); //Ter controle de carregamento ao clicar em Acessar(login)

    const isAuthenticated = !!user.name //Retorna true se user.name existe e não é vazio, e false caso contrário.

    async function signIn({email, password} : SingInProps){
        setloadingAuth(true); //Vai rodar o loading para mostrar que está carregando

        try{
            const response = await api.post('/sessions', {
                email,
                password
            })

            //console.log(response.data)

            const {id, name, token} = response.data;

            const data = { //Objeto data e depois é convertido em uma string para armazenar
                ...response.data
            };

            await AsyncStorage.setItem('@pizzariamarcello', JSON.stringify(data)) //AsyncStorage serve para salvar dados persistentes como token, dados do usuario..

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setUser({
                id,
                name,
                email,
                token,
            })

            setloadingAuth(false);

        }catch(err: any){
            console.log('Erro ao acessar', err.response.data)
            setloadingAuth(false);//Vai parar o loading e mostrar erro
        }
    }
    
    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}