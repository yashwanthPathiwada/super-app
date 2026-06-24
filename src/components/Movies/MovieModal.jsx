import { useEffect, useState, useCallback } from 'react';
import { fetchMovieDetails } from '../../services/omdbService';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';

const PLACEHOLDER_POSTER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="445" viewBox="0 0 300 445"><rect width="300" height="445" fill="%231C232D"/><text x="50%25" y="50%25" fill="%238A93A3" font-size="16" text-anchor="middle" dy=".3em">No Poster</text></svg>';

const MovieModal = ({ imdbID, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDetails = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchMovieDetails(imdbID);
      setDetails(data);
    } catch (err) {
      setError(err.message || 'Unable to load movie details');
    } finally {
      setLoading(false);
    }
  }, [imdbID]);

  useEffect(() => {
    loadDetails();
  }, [loadDetails]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fadeIn"
    >
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-line bg-panel p-6 shadow-glow animate-pop">
        <button
          onClick={onClose}
          aria-label="Close"
          className="focus-ring absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-panel2 text-lg text-muted hover:text-white"
        >
          ×
        </button>

        {loading && <Loader label="Loading movie details..." size="lg" />}
        {!loading && error && <ErrorMessage message={error} onRetry={loadDetails} />}

        {!loading && !error && details && (
          <div className="flex flex-col gap-5 sm:flex-row">
            <img
              src={details.poster || PLACEHOLDER_POSTER}
              alt={details.title}
              className="h-64 w-44 shrink-0 self-center rounded-xl object-cover shadow-card sm:self-start"
              onError={(e) => {
                e.currentTarget.src = PLACEHOLDER_POSTER;
              }}
            />

            <div className="flex-1">
              <h2 className="font-display text-2xl font-bold text-white">
                {details.title}{' '}
                <span className="text-base font-normal text-muted">
                  ({details.year})
                </span>
              </h2>

              <div className="mt-2 flex flex-wrap gap-2">
                {details.genre?.split(',').map((g) => (
                  <span
                    key={g}
                    className="rounded-full border border-accent/40 bg-accent/10 px-3 py-0.5 text-xs font-medium text-accent"
                  >
                    {g.trim()}
                  </span>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-panel2 px-3 py-2">
                  <p className="text-[11px] uppercase text-muted">Runtime</p>
                  <p className="text-sm font-semibold text-white">
                    {details.runtime}
                  </p>
                </div>
                <div className="rounded-lg bg-panel2 px-3 py-2">
                  <p className="text-[11px] uppercase text-muted">Rating</p>
                  <p className="text-sm font-semibold text-accent2">
                    ★ {details.rating}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="mb-1 text-[11px] uppercase text-muted">Plot</p>
                <p className="text-sm leading-relaxed text-white">
                  {details.plot}
                </p>
              </div>

              <div className="mt-4">
                <p className="mb-1 text-[11px] uppercase text-muted">Actors</p>
                <p className="text-sm text-white">{details.actors}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
