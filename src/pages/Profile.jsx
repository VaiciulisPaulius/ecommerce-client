import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { API_ROUTES } from "/src/utils/apiRoutes/ApiRoutes.js";
import useApiClient from "../hooks/UseApiClient.jsx";
import {Helmet} from "react-helmet";

function Profile() {
    const { user } = useAuth();
    const { request } = useApiClient()
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
    });

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log(API_ROUTES.AUTH.USERS)
                const response = await request("GET", API_ROUTES.USERS.BASE, null, user);
                setFormData({
                    firstName: response.firstName || "",
                    lastName: response.lastName || "",
                    email: response.email || "",
                    phoneNumber: response.phoneNumber || "",
                });
                console.log(response)
                setIsLoading(false);
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };

        fetchUser();
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            console.log("PUT", API_ROUTES.USERS.BASE)
            const updated = await request("PUT", API_ROUTES.USERS.BASE, formData, user);
            setSuccessMessage("Profile updated successfully.");
        } catch (err) {
            console.error("Failed to update user:", err);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div className="text-center mt-10">Kraunama profilis...</div>;

    return (
        <>
            <Helmet>
                <title>Mano profilis – LTech</title>
                <meta name="description" content="Peržiūrėkite savo užsakymus, informaciją ir nustatymus LTech paskyroje." />
            </Helmet>
            <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md min-h-screen">
                <h2 className="text-2xl font-bold mb-6">Mano profilis</h2>

                {successMessage && (
                    <div className="bg-green-100 text-green-800 p-2 rounded mb-4">
                        {successMessage}
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label className="block font-medium mb-1">Vardas</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Pavardė</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">E. paštas</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled
                            className="w-full border p-2 rounded bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Tel. Numeris</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        {isSaving ? "Saving..." : "Išsaugoti pakeitimus"}
                    </button>
                </div>
            </div>
        </>
    );
}

export default Profile;
