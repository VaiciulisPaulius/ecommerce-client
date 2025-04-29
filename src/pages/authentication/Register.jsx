import React from 'react';
import { useAuth } from '/src/contexts/AuthContext.jsx';
import { useNavigate } from 'react-router';
import useInputValidation from "/src/hooks/UseInputValidation.jsx";
import FormErrorMessage from "/src/components/FormErrorMessage.jsx";
import { validationRules } from "/src/utils/InputRules.js";
import {Helmet} from "react-helmet";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const firstName = useInputValidation("", [validationRules.required, validationRules.minLength(2)]);
  const lastName = useInputValidation("", [validationRules.required, validationRules.minLength(2)]);
  const email = useInputValidation("", [validationRules.required]);
  const phoneNumber = useInputValidation("", [validationRules.required]); // Optional
  const password = useInputValidation("", [validationRules.required, validationRules.minLength(8)]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputs = [firstName, lastName, email, phoneNumber, password];
    const allValid = inputs.every(input => input.validate() === true);

    if (allValid) {
      const res = await register({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        password: password.value,
      });
      console.log(res)
    }
  };

  return (
      <>
        <Helmet>
          <title>Registruotis – LTech</title>
          <meta name="description" content="Sukurkite naują paskyrą LTech ir pradėkite apsipirkti iš karto. Tai greita, saugu ir paprasta." />
        </Helmet>

        <div className="flex min-h-screen items-center justify-center bg-gray-100">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

            {/* First Name */}
            <div className="mb-4">
              {firstName.error && <FormErrorMessage message={firstName.error} />}
              <label htmlFor="firstName" className="block text-gray-700 text-sm font-semibold mb-1">
                First Name
              </label>
              <input
                  type="text"
                  id="firstName"
                  value={firstName.value}
                  onChange={firstName.onChange}
                  placeholder="Enter your first name"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Last Name */}
            <div className="mb-4">
              {lastName.error && <FormErrorMessage message={lastName.error} />}
              <label htmlFor="lastName" className="block text-gray-700 text-sm font-semibold mb-1">
                Last Name
              </label>
              <input
                  type="text"
                  id="lastName"
                  value={lastName.value}
                  onChange={lastName.onChange}
                  placeholder="Enter your last name"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              {email.error && <FormErrorMessage message={email.error} />}
              <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-1">
                Email
              </label>
              <input
                  type="email"
                  id="email"
                  value={email.value}
                  onChange={email.onChange}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              {phoneNumber.error && <FormErrorMessage message={phoneNumber.error} />}
              <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-semibold mb-1">
                Phone Number (optional)
              </label>
              <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber.value}
                  onChange={phoneNumber.onChange}
                  placeholder="Enter your phone number"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              {password.error && <FormErrorMessage message={password.error} />}
              <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-1">
                Password
              </label>
              <input
                  type="password"
                  id="password"
                  value={password.value}
                  onChange={password.onChange}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 mb-3 cursor-pointer"
            >
              Register
            </button>

            {/* Go to Login */}
            <button
                type="button"
                onClick={() => navigate('/login')}
                className="w-full bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-md shadow-sm hover:bg-gray-300 cursor-pointer"
            >
              Go to Login
            </button>
          </form>
        </div>
      </>
  );
}

export default Register;
