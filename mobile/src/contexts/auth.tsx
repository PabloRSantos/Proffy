import React, { createContext, useState, useEffect, useContext} from "react"
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
    SignIn: (loginData: ISignIn) => void,
    SignUp: (registerData: ISignUp) => void,
    SignOut: () => void,

}

const AuthContext = createContext<IContext>({
    signed: true,
    user: true,
    SignIn: () => {},
    SignUp: () => {},
    SignOut: () => {},
})

export const AuthProvider: React.FC = ({children}) => {
    const [user, setUser] = useState(false)

    useEffect(() => {

        async function loadDatas(){
            const token = await AsyncStorage.getItem('@Proffy/token')
            if(token){
                setUser(true)
                api.defaults.headers['authorization'] = `Bearer ${token}`
            }
        }

        loadDatas()

    }, [])

    async function SignIn(loginData: ISignIn){

        try {
        const {data} = await api.post('login', loginData)


        if(data.token) {

            loginData.remember && await AsyncStorage.setItem('@Proffy/token', data.token)
            setUser(true)
            api.defaults.headers["authorization"] = `Bearer ${data.token}`
        }

        return data

        } catch (e) {
            console.log(e)
        }

    }

    async function SignUp(registerData: ISignUp){

        try {
            const {data} = await api.post('cadastro', registerData)

            if(data.token) {
                await AsyncStorage.setItem('@Proffy/token', data.token)
                setUser(true)
                api.defaults.headers["authorization"] = `Bearer ${data.token}`
            }

            return data

        } catch (e) {
            console.log(e)
        }
    }

    async function SignOut(){
        await AsyncStorage.removeItem('@Proffy/token')
        setUser(false)
        api.defaults.headers["authorization"] = ``
    }


    return (
        <AuthContext.Provider value={{signed: !!user, SignIn, SignUp, SignOut, user}}> 
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)

    return context
}