import React, { createContext, useState, useEffect, useContext} from "react"
import api from "../services/api"

interface ISign {
    email: string,
    password: string
}

interface IContext {
    signed: boolean,
    user: boolean,
    SignIn: (loginData: ISign) => void,
    SignUp: (registerData: ISign) => void,
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
        
        const token = localStorage.getItem('@Proffy/token')

        if(token){
            setUser(true)
            api.defaults.headers['authorization'] = `Bearer ${token}`
        }
    }, [])

    async function SignIn(loginData: ISign){

        try {
        const {data} = await api.post('login', loginData)

        localStorage.setItem('@Proffy/token', data.token)
        setUser(true)
        api.defaults.headers["authorization"] = `Bearer ${data.token}`

        } catch (e) {
            console.log(e)
        }

    }

    async function SignUp(registerData: ISign){

        try {
            const {data} = await api.post('cadastro', registerData)

            localStorage.setItem('@Proffy/token', data.token)
            setUser(true)
            api.defaults.headers["authorization"] = `Bearer ${data.token}`

        } catch (e) {
            console.log(e)
        }
    }

    async function SignOut(){
        localStorage.removeItem('@Proffy/token')
        setUser(false)
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