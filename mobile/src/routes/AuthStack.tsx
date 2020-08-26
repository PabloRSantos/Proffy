import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Cadastro from '../pages/Cadastro'
import Login from '../pages/Login'
import ForgotPassword from '../pages/ForgotPassword'



const {Navigator, Screen} = createStackNavigator()

function AuthStack(){
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name="Login" component={Login}/>
                <Screen name="Cadastro" component={Cadastro}/>
                <Screen name="ForgotPassword" component={ForgotPassword}/>
            </Navigator>
        </NavigationContainer>
    )
}


export default AuthStack