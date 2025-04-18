import axios from "axios";
import {useStatus} from "/src/contexts/StatusProvider.jsx";

function UseApiClient(baseURL) {
    const { setNewStatus, setIsForbidden, setIsUnauthorized } = useStatus();

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: {
            "Content-Type": "application/json"
        }
    })

    axiosInstance.interceptors.response.use(
        response => {
            setIsForbidden(false)
            setIsUnauthorized(false)
            return response
        },
        error => {
            console.log(error)
            if (error.response) {
                const status = error.response.status;

                if (status === 401) {
                    setNewStatus("Something went wrong.", "error");
                    setIsUnauthorized(true)
                }
                if(status === 403) {
                    setIsForbidden(true)
                }
            } else if (error.request) {
                setNewStatus("Network error, please try again.", "error");
            } else if(error.status != 404) {
                setNewStatus("Unexpected error occurred.", "error");
            }
            return Promise.reject(error); // Ensure errors are still thrown
        }
    );

    const request = async (method, url, data = null, token = null) => {
        // Set up headers
        const headers = token ? {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        } : { 'Content-Type': 'application/json' };

        // Log the URL (for debugging)
        console.log(url);

        // Perform the request with optional token
        const response = await axiosInstance({
            method,
            url,
            data,
            headers
        });

        return response.data;
    }


    return { request }
}

export default UseApiClient
