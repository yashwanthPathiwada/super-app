import { Routes, Route } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage';
import CategoriesPage from './pages/CategoriesPage';
import DashboardPage from './pages/DashboardPage';
import MoviesPage from './pages/MoviesPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './routes/ProtectedRoute';
import RegistrationGuard from './routes/RegistrationGuard';
import { ROUTES } from './utils/constants';

function App() {
  return (
    <Routes>
      <Route path={ROUTES.REGISTER} element={<RegistrationPage />} />

      <Route element={<RegistrationGuard />}>
        <Route path={ROUTES.CATEGORIES} element={<CategoriesPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTES.MOVIES} element={<MoviesPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
