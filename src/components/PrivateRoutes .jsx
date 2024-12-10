import { Outlet, Navigate } from 'react-router-dom';
import { pathname } from '~/routes/pathname';

function PrivateRoutes({ children }) {
    const isLoggedIn = localStorage.profileId;
    return isLoggedIn ? <Outlet /> : <Navigate to={pathname.EXPERIENCE} />;
}

export default PrivateRoutes;
