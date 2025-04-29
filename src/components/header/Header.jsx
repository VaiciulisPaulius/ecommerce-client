import React, { useState } from 'react';
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useJsonApi } from "../../contexts/JsonApiContext.jsx";
import { API_ROUTES } from "../../utils/apiRoutes/ApiRoutes.js";
import { useCart } from "../../contexts/CartContext.jsx";
import { Menu, X } from 'lucide-react';

function Header() {
    const auth = useAuth();
    const { request } = useJsonApi();
    const user = auth.user;
    const navigate = useNavigate();
    const { cartQuantity } = useCart();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="bg-gray-100 p-4">
            <div className="flex justify-between items-center">
                <h2
                    className="text-2xl md:text-3xl font-semibold text-sky-600 hover:text-sky-800 cursor-pointer flex items-center space-x-2"
                    onClick={() => {
                        navigate("/")
                    }}
                >
                    {/* Optional: Add an icon/logo */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-500" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                    </svg>
                    <span>LTech - Internetinė technologijų parduotuvė</span>
                </h2>


                {/* Mobile menu button */}
                <button
                    className="md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={24}/> : <Menu size={24}/>}
                </button>

                {/* Desktop nav */}
                <nav className="hidden md:flex space-x-4 items-center">
                    <Link to={"/"} className="hover:underline text-blue-500">Pradinis puslapis</Link>
                    {user ? (
                        <>
                            <Link to={"/products?page=1"} className="hover:underline text-blue-500">Produktai</Link>
                            <Link to={"/profile"} className="hover:underline text-blue-500">Profilis</Link>
                            <Link to="/cart" className="flex items-center hover:underline text-blue-500">
                                Cart
                                {cartQuantity > 0 && (
                                    <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                                        {cartQuantity}
                                    </span>
                                )}
                            </Link>
                            <Link to={"/orders"} className="hover:underline text-blue-500">Užsakymai</Link>
                            <a onClick={() => auth.logout()} href="#" className="hover:underline text-gray-700">Atsijungti</a>
                        </>
                    ) : (
                        <>
                            <Link to={"/register"} className="hover:underline text-blue-500">Registruotis</Link>
                            <Link to={"/login"} className="hover:underline text-blue-500">Prisijungti</Link>
                        </>
                    )}
                </nav>
            </div>

            {menuOpen && (
                <div className="mt-4 flex flex-col space-y-2 md:hidden">
                    <Link to={"/"} className="hover:underline text-blue-500">Home</Link>
                    {user ? (
                        <>
                            <Link to={"/products?page=1"} className="hover:underline text-blue-500">Products</Link>
                            <Link to={"/profile"} className="hover:underline text-blue-500">Profile</Link>
                            <Link to="/cart" className="flex items-center hover:underline text-blue-500">
                                Cart
                                {cartQuantity > 0 && (
                                    <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                                        {cartQuantity}
                                    </span>
                                )}
                            </Link>
                            <Link to={"/orders"} className="hover:underline text-blue-500">Orders</Link>
                            <a onClick={() => auth.logout()} href="#" className="hover:underline text-gray-700">Logout</a>
                        </>
                    ) : (
                        <>
                            <Link to={"/register"} className="hover:underline text-blue-500">Register</Link>
                            <Link to={"/login"} className="hover:underline text-blue-500">Login</Link>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default Header;
