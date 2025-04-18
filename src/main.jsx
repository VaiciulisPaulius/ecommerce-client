import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {ApiProvider} from "/src/contexts/JsonApiContext.jsx";
import {AuthProvider} from "/src/contexts/AuthContext.jsx";
import {BrowserRouter} from "react-router";
import {StatusProvider} from "/src/contexts/StatusProvider.jsx";
import ProfileProvider from "/src/contexts/ProfileContext.jsx";
import {CartProvider} from "./contexts/CartContext.jsx";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <StatusProvider>
            <ApiProvider>
                <AuthProvider>
                    <CartProvider>
                        <ProfileProvider>
                            <StrictMode>
                                <App />
                            </StrictMode>
                        </ProfileProvider>
                    </CartProvider>
                </AuthProvider>
            </ApiProvider>
        </StatusProvider>
    </BrowserRouter>
)
