import React from 'react';
import { useAuth } from '/src/contexts/AuthContext.jsx'; // Adjust the import path accordingly
import { useNavigate } from 'react-router';
import useInputValidation from "/src/hooks/UseInputValidation.jsx";
import FormErrorMessage from "/src/components/FormErrorMessage.jsx";
import {validationRules} from "../utils/InputRules.js";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const username = useInputValidation("", [validationRules.required, validationRules.minLength(4)]);
  const password = useInputValidation("", [validationRules.required, validationRules.minLength(8)]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.validate() === true && password.validate() === true)
      await register({ username: username.value, password: password.value });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <div className="mb-4">
          {username.error && (
              <FormErrorMessage message={username.error}></FormErrorMessage>
          )}
          <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username.value}
            onChange={e => username.onChange(e)}
            placeholder="Enter your username"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          {password.error && (
              <FormErrorMessage message={password.error}></FormErrorMessage>
          )}
          <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password.value}
            onChange={(e) => password.onChange(e)}
            placeholder="Enter your password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 mb-3">
          Register
        </button>
        <button type={"button"}
          onClick={() => navigate('/login')}
          className="w-full bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-md shadow-sm hover:bg-gray-300"
        >
          Go to Login
        </button>
      </form>
    </div>
  );
}

export default Register;

