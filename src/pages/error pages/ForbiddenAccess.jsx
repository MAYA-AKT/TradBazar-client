import React from 'react';
import { useNavigate } from 'react-router';


const ForbiddenAccess = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-6">
            <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>
            <h2 className="text-2xl font-semibold mb-2">Forbidden Access</h2>
            <p className="text-gray-700 mb-6 text-center">
                You don’t have permission to access this page.
            </p>
            <button
                onClick={() => navigate('/')}
                className="btn btn-primary text-black"
            >
                Go Back Home
            </button>
        </div>
    );
};

export default ForbiddenAccess;
