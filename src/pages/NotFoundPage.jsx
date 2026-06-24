import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/constants';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ink px-4 text-center">
      <h1 className="font-display text-5xl font-bold text-accent">404</h1>
      <p className="text-muted">This page doesn&apos;t exist.</p>
      <Link
        to={ROUTES.REGISTER}
        className="focus-ring rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
      >
        Go home
      </Link>
    </div>
  );
};

export default NotFoundPage;
