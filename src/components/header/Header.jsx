import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from "react-router";
import { useAuth } from "../../contexts/AuthContext.jsx";
import {useJsonApi} from "../../contexts/JsonApiContext.jsx";
import { API_ROUTES } from "../../utils/apiRoutes/ApiRoutes.js";
import {useCart} from "../../contexts/CartContext.jsx";

function Header() {
    const auth = useAuth();
    const { request } = useJsonApi()
    const user = auth.user;
    const navigate = useNavigate()

    // Cart state to hold the total quantity
    const { cartQuantity } = useCart();

    return (
        <div className="bg-gray-100 p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold cursor-pointer" onClick={() => { navigate("/products")}}>LTech - Internetinė technologijų parduotuvė</h2>
            <nav className="flex space-x-4">
                {user && (
                    <>
                        <Link to={"/products?page=1"}>
                            <span className="hover:underline text-blue-500">Products</span>
                        </Link>
                        <Link to={"/profile"}>
                            <span className="hover:underline text-blue-500">Profile</span>
                        </Link>
                        <Link to="/cart" className="flex items-center">
                            <span className="hover:underline text-blue-500">Cart</span>
                            {cartQuantity > 0 && (
                                <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                                    {cartQuantity}
                                </span>
                            )}
                        </Link>
                        <Link to={"/orders"}>
                            <span className="hover:underline text-blue-500">Orders</span>
                        </Link>
                        <a onClick={() => auth.logout()} href="#" className="hover:underline text-gray-700">Logout</a>
                    </>
                )}
                {!user && (
                    <>
                        <Link to={"/register"}>
                            <span className="hover:underline text-blue-500">register</span>
                        </Link>
                        <Link to={"/login"}>
                            <span className="hover:underline text-blue-500">login</span>
                        </Link>
                    </>
                )}
            </nav>
        </div>
    );
}

export default Header;
