import React from 'react'

import AuthStack from './AuthStack'
import AppStack from './AppStack'
import WelcomeStack from './WelcomeStack'

import {useAuth} from '../contexts/auth'

const Routes = () => {
    const {signed, newUser} = useAuth()

    if(newUser){
        return <WelcomeStack />
    }

    return signed ? <AppStack /> : <AuthStack />
}

export default Routes
