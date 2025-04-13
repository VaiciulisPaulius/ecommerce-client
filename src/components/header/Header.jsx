import React from 'react';
import { Link } from "react-router";

function Header() {
    return (
        <div className="bg-gray-100 p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Trecias React praktinis darbas</h2>
            <nav className="flex space-x-4">
                <Link to={"/"}>
                    <span className="hover:underline text-blue-500">Home</span>
                </Link>
                <Link to={"/users"}>
                    <span className="hover:underline text-blue-500">Users</span>
                </Link>
            </nav>
        </div>
    );
}

export default Header;