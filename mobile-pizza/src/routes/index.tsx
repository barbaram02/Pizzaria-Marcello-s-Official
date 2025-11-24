import React, { useContext } from "react";

import {View, ActivityIndicator} from "react-native"

import { AuthContext } from "../contexts/AuthContext";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

function Routes(){
    const {isAuthenticated} = useContext(AuthContext)

    const loading = false; //Para saber se está carregando

    if(loading){
        return(
            <View 
              style={{
                flex: 1, 
                backgroundColor: '#1d1d2e', 
                justifyContent:'center', 
                alignItems: 'center'
              }}>
                <ActivityIndicator size={60} color="#F5F7fb"/>
            </View>
        )
    }
    return(
        isAuthenticated ? <AppRoutes/> : <AuthRoutes/>
    )
}

export default Routes;