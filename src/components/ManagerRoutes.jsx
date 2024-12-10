import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { pathname } from '~/routes/pathname';

function ManagerRoutes() {
    const isInstructor = localStorage.getItem('role') === 'INSTRUCTOR' || localStorage.getItem('role') === 'ADMIN';
    return isInstructor ? <Outlet /> : <Navigate to={pathname.EXPERIENCE} />;
}

export default ManagerRoutes;
