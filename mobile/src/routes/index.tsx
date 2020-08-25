import React from 'react'
import AuthStack from './AuthStack'
import AppStack from './AppStack'
import {useAuth} from '../contexts/auth'

const Routes = () => {
    const {signed} = useAuth()

    return signed ? <AppStack /> : <AuthStack />
}

export default Routes
