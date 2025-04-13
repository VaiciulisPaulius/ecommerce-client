import React, {createContext, useContext, useEffect, useState} from 'react'
import { digestMessage } from "../utils/crypto/hashing.js";
import {useJsonApi} from "./JsonApiContext.jsx";
import {useStatus} from "./StatusProvider.jsx";

const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const {request} = useJsonApi()
    const {setNewStatus} = useStatus()
    const [loading, setLoading] = useState(true);

    const login = async userData => {
        setLoading(true);
        const usersList = await request("GET", `/users?username=${userData.username}`);
        const user = usersList.find(user => user.username === userData.username);

        const passwordHash = await digestMessage(userData.password);

        if(passwordHash !== user?.password) {
            setNewStatus("Incorrect username or password.", "error")
            return;
        }

        localStorage.setItem("user", JSON.stringify(user));
        setNewStatus("Successfully logged in.", "success");
        setUser(user)
        setLoading(false);
    }

    useEffect(() => {
        if(localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem("user")))
            console.log(JSON.parse(localStorage.getItem("user")))
        }
        setLoading(false)
    }, []);

    const logout = () => {
        localStorage.removeItem("user")
        setUser(null)
    }

    const register = async userData => {
        setLoading(true);
        const usersList = await request("GET", `/users?username=${userData.username}`);
        const user = usersList.find(user => user.username === userData.username)

        if(user) {
            setNewStatus("User already exists. Cant register", "error")
            return;
        }

        const passwordHash = await digestMessage(userData.password)
        const data = {username: userData.username, password: passwordHash}

        await request("POST", `/users`, data);
        setNewStatus("Successfully registered.", "success");
        setLoading(false);
    }

    return (
        <AuthContext.Provider value={{user, login, logout, register, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
