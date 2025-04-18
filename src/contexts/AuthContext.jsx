import React, {createContext, useContext, useEffect, useState} from 'react'
import {useJsonApi} from "/src/contexts/JsonApiContext.jsx";
import {useStatus} from "/src/contexts/StatusProvider.jsx";

import { API_ROUTES } from "/src/utils/apiRoutes/ApiRoutes.js"
import ForbiddenComponent from "../pages/ForbiddenComponent.jsx";

const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const {request} = useJsonApi()
    const {setNewStatus, isUnauthorized, isForbidden} = useStatus()
    const [loading, setLoading] = useState(true);

    const login = async userData => {
        setLoading(true);


        const res = await request("POST", API_ROUTES.AUTH.LOGIN, userData);
        localStorage.setItem("user", JSON.stringify(res.token));

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

        console.log(JSON.parse(localStorage.getItem("user")))

    }, []);

    const checkToken = async () => {
        const req = await request("GET", API_ROUTES.AUTH.CHECK, null, user);
        console.log(req)
    }

    useEffect(() => {
        if(!isUnauthorized) return;
        setNewStatus("Session expired. Please login again.", "error");
        //logout();
    }, [isUnauthorized])

    useEffect(() => {
        if(!isForbidden) return;
        setNewStatus("Cant access this page.", "error");
    }, [isForbidden])

    const logout = () => {
        localStorage.removeItem("user")
        setUser(null)
    }

    const register = async userData => {
        setLoading(true);

        const res = await request("POST", API_ROUTES.AUTH.REGISTER, userData);
        localStorage.setItem("user", JSON.stringify(res.token));

        setNewStatus("Successfully registered.", "success");
        setLoading(false);
    }

    return (
        <AuthContext.Provider value={{user, login, logout, register, loading}}>
            { !isForbidden ? children : <ForbiddenComponent/>}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
