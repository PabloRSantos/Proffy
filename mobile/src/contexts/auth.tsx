import React, { createContext, useState, useEffect, useContext } from "react"
import api from "../services/api"
import AsyncStorage from '@react-native-community/async-storage'


export interface ISignIn {
    email: string,
    password: string,
    remember: boolean
}

interface ISignUp {
    email: string,
    password: string,
    name: string,
    sobrenome: string
}

interface IContext {
    signed: boolean,
    user: boolean,
    newUser: boolean
    SignIn: (loginData: ISignIn) => void,
    SignUp: (registerData: ISignUp) => void,
    SignOut: () => void,
    FreeAcess: () => void,
}

const AuthContext = createContext<IContext>({
    signed: true,
    user: true,
    newUser: true,
    SignIn: () => { },
    SignUp: () => { },
    SignOut: () => { },
    FreeAcess: () => { },
})

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState(false)
    const [newUser, setNewUser] = useState(true)

    useEffect(() => {

        async function loadDatas() {
            const newUserStorage = await AsyncStorage.getItem('@Proffy/newUser')

            if(newUserStorage){
                setNewUser(false)
            }

            const token = await AsyncStorage.getItem('@Proffy/token')
            if (token) {
                console.log(token)
                setUser(true)
                api.defaults.headers['authorization'] = `Bearer ${token}`
            }
        }

        loadDatas()

    }, [])

    async function FreeAcess(){
        setNewUser(false)
        await AsyncStorage.setItem('@Proffy/newUser', 'false')
    }

    async function SignIn(loginData: ISignIn) {

        try {
            const { data } = await api.post('login', loginData)


            if (data.token) {

                loginData.remember && await AsyncStorage.setItem('@Proffy/token', data.token)
                setUser(true)
                api.defaults.headers["authorization"] = `Bearer ${data.token}`
            }

            if(data.message)
                alert(data.message)

            return data

        } catch (e) {
            console.log(e)
        }

    }

    async function SignUp(registerData: ISignUp) {

        try {
            const { data } = await api.post('cadastro', registerData)

            if (data.token) {
                await AsyncStorage.setItem('@Proffy/token', data.token)
                setUser(true)
                api.defaults.headers["authorization"] = `Bearer ${data.token}`
            }

            if(data.message)
                alert(data.message)

            return data

        } catch (e) {
            console.log(e)
        }
    }

    async function SignOut() {
        await AsyncStorage.removeItem('@Proffy/token')
        setUser(false)
        api.defaults.headers["authorization"] = ``
    }


    return (
        <AuthContext.Provider value={{ signed: !!user, SignIn, SignUp, SignOut, FreeAcess, user, newUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)

    return context
}