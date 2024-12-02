import { FiAlertTriangle } from "react-icons/fi";

interface FormErrorProps { 
    message?: string; 
}; 

export const FormError = ({
    message, 
}: FormErrorProps) => { 
    if (!message) return null; 

    return (
        <div className="bg-red-100 p-3 rounded-md flex items-center gap-x-2 text-sm text-red-400">
            <FiAlertTriangle className="h-5 w-5" /> 
            <p>{message}</p>
        </div>
    )
}