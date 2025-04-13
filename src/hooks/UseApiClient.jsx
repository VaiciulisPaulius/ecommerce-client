import axios from "axios";
import {useStatus} from "/src/contexts/StatusProvider.jsx";

function UseApiClient(baseURL) {
    const { setNewStatus } = useStatus();

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: {
            "Content-Type": "application/json"
        }
    })

    axiosInstance.interceptors.response.use(
        response => response,
        error => {
            console.log(error)
            if (error.response) {
                setNewStatus(error.response.data.message || "Something went wrong.", "error");
            } else if (error.request) {
                setNewStatus("Network error, please try again.", "error");
            } else if(error.status != 404) {
                setNewStatus("Unexpected error occurred.", "error");
            }
            return Promise.reject(error); // Ensure errors are still thrown
        }
    );

    const request = async (method, url, data = null) => {
        const response = await axiosInstance({method, url, data})
        return response.data
    }

    return { request }
}

export default UseApiClient
