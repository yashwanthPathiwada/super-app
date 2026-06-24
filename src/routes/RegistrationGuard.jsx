import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from '../store/useUserStore';
import { ROUTES } from '../utils/constants';

const RegistrationGuard = () => {
  const isRegistered = useUserStore((state) => state.isRegistered);

  if (!isRegistered) {
    return <Navigate to={ROUTES.REGISTER} replace />;
  }

  return <Outlet />;
};

export default RegistrationGuard;
