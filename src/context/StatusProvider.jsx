import {createContext, useContext, useState} from "react";
import ToastNotification from "../components/ToastNotification.jsx";

const StatusContext = createContext();

export const StatusProvider = ({ children }) => {
    const [status, setStatus] = useState(null);
    const [type, setType] = useState("");

    const setNewStatus = (newStatus, newType) => {
        if(newType !== "success" &&
            newType !== "error" &&
            newType !== "info" &&
            newType !== "warning") {
            console.error("Incorrect status type: " + type + ". Must be either 'success', 'error', 'warning', 'info'.");
            return;
        }
        if(!newStatus) {
            console.error("Empty status.");
            return;
        }

        setStatus(newStatus);
        setType(newType);
    }
    const onClose = () => {
        setStatus(null);
        setType(null);
    }

    return (
        <StatusContext.Provider value={{ setNewStatus }}>
            {children}
            {status && (
                <ToastNotification text={status} type={type} onClose={onClose}></ToastNotification>
            )}
        </StatusContext.Provider>
    );
};

export const useStatus = () => useContext(StatusContext);
