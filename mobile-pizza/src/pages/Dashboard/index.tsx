import React, {useState} from "react";
import {View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'

import { useNavigation } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackPramsList } from "../../routes/app.routes";

export default function Dashboard(){

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
    title:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 24,
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