import { createContext, useContext, useEffect, useState} from "react"
import { login as performLogin } from "../Services/client.jsx"
import {jwtDecode} from "jwt-decode"

const AuthContext = createContext({})

const AuthProvider = ({children}) => {
    const setUserFromToken = () => {
        let token = localStorage.getItem("token");
        if(token) {
            token = jwtDecode(token)
        }
    }
    useEffect(() => {
        setUserFromToken()
    }, [])

    const login = async(user) => {
        return new Promise((resolve, reject) => {
            performLogin(user).then(res => {
                const jwtToken = res.data.token
                localStorage.setItem("token", jwtToken)

                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }

    const logOut = () => {
        localStorage.removeItem("token")
        setUser(null)
    }

    const isUserAuthenticated = () => {
        const token = localStorage.getItem("token")
        if(!token) return false

        const {expiration : expirationTime} = jwtDecode(token)
 
        if(expirationTime * 1000 < Date.now()){
            logOut()
            return false
        }
        return true
    }
    return (
        <AuthContext.Provider value={{
            login,
            logOut,
            isUserAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    ) 
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider