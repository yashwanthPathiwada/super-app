import { NavLink, useNavigate } from 'react-router-dom';
import useUserStore from '../../store/useUserStore';
import useCategoryStore from '../../store/useCategoryStore';
import { ROUTES } from '../../utils/constants';

const Navbar = () => {
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);
  const clearCategories = useCategoryStore((state) => state.clearCategories);
  const user = useUserStore((state) => state.user);

  const handleLogout = () => {
    logout();
    clearCategories();
    navigate(ROUTES.REGISTER, { replace: true });
  };

  const linkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? 'bg-accent text-white' : 'text-muted hover:text-white'
    }`;

  return (
    <nav className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-display text-sm font-bold text-white">
            SA
          </div>
          <span className="font-display text-lg font-semibold text-white">
            Super App
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <NavLink to={ROUTES.DASHBOARD} className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to={ROUTES.MOVIES} className={linkClass}>
            Movies
          </NavLink>
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <span className="text-sm text-muted">{user?.name}</span>
          <button
            onClick={handleLogout}
            className="focus-ring rounded-md border border-line px-3 py-1.5 text-xs font-semibold text-muted hover:border-accent hover:text-white"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex justify-end px-4 pb-2 sm:hidden">
        <button
          onClick={handleLogout}
          className="focus-ring rounded-md border border-line px-3 py-1.5 text-xs font-semibold text-muted hover:border-accent hover:text-white"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
