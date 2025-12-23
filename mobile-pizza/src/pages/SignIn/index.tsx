import React, {useContext, useState} from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { AuthContext } from '../../contexts/AuthContext';
import { Button } from '../../components/Button';

export default function SignIn(){

    const { signIn, loadingAuth } = useContext(AuthContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(){
        
        if (!email || !password){
            return;
        }
        
        await signIn({email, password})
    }

    return(
        <View style={styles.container}>
            <Image 
            style={styles.logo}
            source={require('../../assets/marcello-pizza-logo-compacto.png')}
            />

            <View style={styles.inputContainer}>
             <Text style={styles.text}>Digite seu email: </Text>
                <TextInput
                    placeholder="Email..."
                    placeholderTextColor="#8a8a8a"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />

                <Text style={styles.text}>Digite sua senha: </Text>
                 <TextInput
                    placeholder="Senha..."
                    placeholderTextColor="#8a8a8a"
                    secureTextEntry={true}
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                />

                <Button title="Acessar" loading={loadingAuth} onPress={handleLogin}/>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1d1d2e',
    },
    logo:{
        width: 300,      
        height: 160,   
        resizeMode: 'contain',
    },
    inputContainer:{
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical:32,
        paddingHorizontal:14,
    },
    input:{
        width: '95%',
        height: 40,
        backgroundColor: '#101026',
        marginBottom:12,
        borderRadius: 4,
        paddingHorizontal: 8,
        color: '#FFF',
        borderWidth: 1,
        borderColor: '#8a8a8a',
    },
    text:{
        fontSize: 18,
        display: 'flex',
        color: '#FFF',
        marginBottom: 13,
        marginRight: 190
    }
});