import React, {createContext, useContext} from 'react'
import UseApiClient from "/src/hooks/UseApiClient.jsx";
import { API_ROUTES } from "/src/utils/apiRoutes/ApiRoutes.js"

const ApiContext = createContext(null)

export function ApiProvider({children}) {
    const { request } = UseApiClient(API_ROUTES.baseUrl)

    return (
        <ApiContext.Provider value={{request}}>
            {children}
        </ApiContext.Provider>
    )
}

export const useJsonApi = () => useContext(ApiContext);
