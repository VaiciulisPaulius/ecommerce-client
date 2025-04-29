import React from 'react';
import { Link } from 'react-router'; // For internal links

const Sitemap = () => {
    return (
        <div className="container mx-auto p-4 min-h-screen">
            <h1 className="text-3xl font-bold mb-4">HTML svetainės žemėlapis</h1>
            <ul>
                <li>
                    <h2 className="text-xl font-semibold">Pagrindiniai puslapiai</h2>
                    <ul className="ml-4">
                        <li><Link to="/" className="text-blue-500">Home</Link></li>
                        <li><Link to="/products" className="text-blue-500">Product List</Link></li>
                        <li><Link to="/cart" className="text-blue-500">Cart</Link></li>
                        <li><Link to="/profile" className="text-blue-500">Profile</Link></li>
                        <li><Link to="/orders" className="text-blue-500">Orders</Link></li>
                        <li><Link to="/login" className="text-blue-500">Login</Link></li>
                        <li><Link to="/register" className="text-blue-500">Register</Link></li>
                    </ul>
                </li>
                {/* Optionally, add more categories or sub-categories here */}
            </ul>
        </div>
    );
};

export default Sitemap;
