import React, {createContext, useContext} from 'react'
import UseApiClient from "/src/hooks/UseApiClient.jsx";

const JsonApiContext = createContext(null)

export function JsonApiProvider({children}) {
    const { request } = UseApiClient("https://dummyjson.com")

    return (
        <JsonApiContext.Provider value={{request}}>
            {children}
        </JsonApiContext.Provider>
    )
}

export const useJsonApi = () => useContext(JsonApiContext);
