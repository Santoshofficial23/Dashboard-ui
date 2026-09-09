import {Navigate, Route, Routes} from 'react-router-dom';
import PublicRoute from './publicroute';
import Loginpage from '../../pages/auth/Login';
import ProtectedRoute from './protectedroute';
import DashboardLayout from '../layout/dashboard';
import Userpage from '../../pages/user/Userpage';
import Dashboardpage from '../../pages/dashboard';
import {NAVIGATION_ROUTES} from '../../constants/routes'
import Bankpage from '../../pages/bank/Bankpage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path={NAVIGATION_ROUTES.LOGIN}
        element={<Loginpage />} />
        
      </Route>

      <Route element={<ProtectedRoute/>}>
        <Route element={<DashboardLayout />}>
           <Route path={NAVIGATION_ROUTES.USER}
            element={<Userpage/>} />
            <Route path={NAVIGATION_ROUTES.BANK}
            element={<Bankpage/>} />
          <Route path={NAVIGATION_ROUTES.DASHBOARD}
          element={<Dashboardpage />} />
          
        </Route>
        
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace/>} />
    </Routes>
  );
};

export default AppRoutes;
