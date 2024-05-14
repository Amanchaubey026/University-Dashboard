/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
const PrivateRoutes = ({Component}) => {
    const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn.isAuth ? <Component/> : <Navigate to="/auth" />;
}

export default PrivateRoutes
