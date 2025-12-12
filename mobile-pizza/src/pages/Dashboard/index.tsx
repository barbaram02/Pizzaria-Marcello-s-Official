import React, {useState, useContext} from "react";
import {View, Text, TouchableOpacity, TextInput, StyleSheet, Image} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'

import { useNavigation } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackPramsList } from "../../routes/app.routes";

import {AuthContext} from "../../contexts/AuthContext"

export default function Dashboard(){

    const { singOut, loadingAuth } = useContext(AuthContext)

    const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();

    const [number, setNumber] = useState('');

    async function openOrder(){
        if(number === ''){
            return;
        }

        navigation.navigate('Order', { number: number, order_id: 'cdscd'})
    }

    return(
        <SafeAreaView style={styles.container}>

            <Image 
            style={styles.logo}
            source={require('../../assets/marcello-pizza-logo-compacto.png')}
            />

            <TouchableOpacity style={styles.buttonExit} onPress={singOut}>
                    <Text style={styles.buttonText}> Sair </Text>
            </TouchableOpacity>

            <Text style={styles.title}>Novo Pedido</Text>

            <TextInput placeholder="Numero da mesa"
            placeholderTextColor={"#F0F0F0"}
            keyboardType="numeric"
            value={number}
            onChangeText={setNumber}
            style={styles.input}/>

            <TouchableOpacity style={styles.button} onPress={openOrder}>
                <Text style={styles.buttonText}>Abrir Mesa</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#1d1d2e'
    },
    logo:{
        width: 300,      
        height: 160,   
        resizeMode: 'contain',
    },
    title:{
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 24,
    },
    buttonExit:{
        width: '15%',
        height: 30,
        backgroundColor: '#FF3F4b',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center', // para centralizar o texto dentro
        alignSelf: 'flex-end', // <- esse move o botão no container
        position: 'absolute',
        top: 60,        // <-- faz o botão subir
        marginRight: 20
    },
    input:{
        width: '90%',
        height: 60,
        backgroundColor: '#101026',
        borderRadius: 4,
        paddingHorizontal: 8,
        textAlign: 'center',
        fontSize: 20,
        color: '#FFF'
    },
    button:{
        width: '90%',
        height: 40,
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        marginVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText:{
        fontSize: 18,
        color: '#101026',
        fontWeight: 'bold'   
    }
})