import { useEffect } from "react";
import { X } from "lucide-react";

function ToastNotification({ type, text, onClose }) {
    useEffect(() => {
        if (type && text) {
            console.log("activated")

            const timer = setTimeout(() => {
                onClose && onClose();
            }, 10000); // Auto-dismiss after 10s

            return () => clearTimeout(timer);
        }
    }, [type, text, onClose]); // Re-run when type or text changes

    const typeStyles = {
        success: "bg-green-500",
        error: "bg-red-500",
        warning: "bg-yellow-500 text-black",
        info: "bg-blue-500",
    };

    return (
        <div className={`fixed bottom-2 left-1/2 -translate-x-1/2 ${typeStyles[type] || "bg-gray-500"} text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-2 transition-opacity duration-500`}>
            <span>{text}</span>
            <button onClick={() => { onClose && onClose(); }} className="text-white hover:text-gray-300">
                <X size={18} />
            </button>
        </div>
    );
}

export default ToastNotification;
