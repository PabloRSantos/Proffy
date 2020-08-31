import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import OnBoarding from '../pages/OnBoarding'



const {Navigator, Screen} = createStackNavigator()

function WelcomeStack(){
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name="Profile" component={OnBoarding}/>
            </Navigator>
        </NavigationContainer>
    )
}


export default WelcomeStack