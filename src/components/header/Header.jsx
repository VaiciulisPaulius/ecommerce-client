import React from 'react';
import { Link } from "react-router";
import {useAuth} from "../../contexts/AuthContext.jsx";

function Header() {
    const auth = useAuth();
    const user = auth.user;


    return (
        <div className="bg-gray-100 p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">LTech - Internetinė technologijų parduotuvė</h2>
            <nav className="flex space-x-4">
                {user && (
                    <>
                        <Link to={"/"}>
                            <span className="hover:underline text-blue-500">Home</span>
                        </Link>
                        <Link to={"/products/1"}>
                            <span className="hover:underline text-blue-500">Products</span>
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