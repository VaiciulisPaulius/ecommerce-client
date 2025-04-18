import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext.jsx";
import { API_ROUTES } from "/src/utils/apiRoutes/ApiRoutes.js";
import { useJsonApi } from "/src/contexts/JsonApiContext.jsx"; // your wrapper for axios/fetch

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cartQuantity, setCartQuantity] = useState(0);
    const { request } = useJsonApi()

    const fetchCartQuantity = async () => {
        try {
            if (user) {
                const response = await request("GET", API_ROUTES.CART.BASE, null, user);
                const total = response.reduce((acc, item) => acc + item.quantity, 0);
                setCartQuantity(total);
            } else {
                setCartQuantity(0); // Clear cart if user logs out
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    useEffect(() => {
        fetchCartQuantity();
    }, [user]);

    return (
        <CartContext.Provider value={{ cartQuantity, fetchCartQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
