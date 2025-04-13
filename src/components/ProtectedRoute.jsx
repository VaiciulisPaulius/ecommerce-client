import React, { useEffect } from 'react';
import { useAuth } from '/src/contexts/AuthContext.jsx';
import { useNavigate } from 'react-router';

function ProtectedRoute({ children, allowAuthenticated }) {
    const auth = useAuth();
    const user = auth.user;
    const navigate = useNavigate();

    const handleCheck = () => {
        if(auth.loading) return;
        if (allowAuthenticated) {
            if (!user) {
                navigate("/login");
            }
        } else {
            if (user) {
                navigate("/");
            }
        }
    }
    useEffect(() => {
        handleCheck()
    }, [user, allowAuthenticated]);

    if ((allowAuthenticated && user) || (!allowAuthenticated && !user)) {
        return children;
    } else {
        return null;
    }
}

export default ProtectedRoute;