import React from 'react'

function FormErrorMessage({message}) {
    return (
        <span className="block w-full bg-red-50 text-red-700 p-2 border-l-4 border-red-600">
            {message}
        </span>
    )
}

export default FormErrorMessage
