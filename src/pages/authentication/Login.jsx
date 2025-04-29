import React, { useState } from 'react';
import { useAuth } from '/src/contexts/AuthContext.jsx'; // Adjust the import path accordingly
import { useNavigate } from 'react-router';
import {Helmet} from "react-helmet";

function Login() {
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({ email, password })

        await login({ email, password });
        setTimeout(() => {
            navigate("/products")
        }, 1000)
    };

    return (
        <>
            <Helmet>
                <title>Prisijungti – LTech</title>
                <meta name="description" content="Prisijunkite prie savo LTech paskyros, kad galėtumėte stebėti užsakymus ir valdyti paskyros informaciją." />
            </Helmet>

            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                    {/* Username Input */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-1">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your Email"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 mb-3 cursor-pointer">
                        Login
                    </button>

                    <button type={"button"}
                        onClick={() => navigate('/register')}
                        className="w-full bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-md shadow-sm hover:bg-gray-300 cursor-pointer"
                    >
                        Go to Register
                    </button>
                </form>
            </div>
        </>
    );
}

export default Login;