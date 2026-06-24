import { useEffect, useState, useCallback } from 'react';
import { fetchMoviesByCategory } from '../../services/omdbService';
import MovieCard from './MovieCard';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';

const CategorySection = ({ category, onSelectMovie }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadMovies = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchMoviesByCategory(category);
      setMovies(data);
    } catch (err) {
      setError(err.message || `Unable to load ${category} movies`);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold text-white">
          {category}
        </h2>
        {!loading && !error && (
          <span className="text-xs text-muted">{movies.length} titles</span>
        )}
      </div>

      {loading && <Loader label={`Loading ${category} movies...`} />}
      {!loading && error && <ErrorMessage message={error} onRetry={loadMovies} />}

      {!loading && !error && movies.length === 0 && (
        <p className="text-sm text-muted">No movies found for this category.</p>
      )}

      {!loading && !error && movies.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onClick={() => onSelectMovie(movie.imdbID)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default CategorySection;
