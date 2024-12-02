import { FiCheckSquare } from "react-icons/fi";

interface FormSuccessProps { 
    message?: string; 
}; 

export const FormSuccess = ({
    message, 
}: FormSuccessProps) => { 
    if (!message) return null; 

    return (
        <div className="bg-emerald-100 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-400">
            <FiCheckSquare className="h-5 w-5" /> 
            <p>{message}</p>
        </div>
    )
}