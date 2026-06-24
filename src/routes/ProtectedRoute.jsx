import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from '../store/useUserStore';
import useCategoryStore from '../store/useCategoryStore';
import { ROUTES } from '../utils/constants';

const ProtectedRoute = () => {
  const isRegistered = useUserStore((state) => state.isRegistered);
  const isCategoriesSelected = useCategoryStore(
    (state) => state.isCategoriesSelected
  );

  if (!isRegistered) {
    return <Navigate to={ROUTES.REGISTER} replace />;
  }

  if (!isCategoriesSelected) {
    return <Navigate to={ROUTES.CATEGORIES} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
