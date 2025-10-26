import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import { Navigate, useLocation } from 'react-router';


const AdminRoute = ({children}) => {

    const { user, loading } = useAuth();
    const{role,isLoading} = useUserRole();
    const location = useLocation();

    if (loading || isLoading) {
        return <span className="loading loading-spinner loading-xl"></span>
    }
    if (!user || role !== 'admin') {
        return <Navigate to='/forbiddenAccess' state={{ from: location.pathname }}></Navigate>
    }

    return children;
};

export default AdminRoute;