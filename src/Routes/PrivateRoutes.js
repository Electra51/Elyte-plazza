import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import DotLoader from "react-spinners/DotLoader";




const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return  <DotLoader
        color={'#E9C211'}
        loading={loading}
        
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    }

    if (user){
        return children;
    }

    return <Navigate to="/login" state={{from: location}} replace></Navigate>;
};

export default PrivateRoute;