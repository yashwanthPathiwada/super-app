import { useState } from 'react';
import Navbar from '../components/Layout/Navbar';
import CategorySection from '../components/Movies/CategorySection';
import MovieModal from '../components/Movies/MovieModal';
import useCategoryStore from '../store/useCategoryStore';

const MoviesPage = () => {
  const categories = useCategoryStore((state) => state.categories);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  return (
    <div className="min-h-screen bg-ink">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h1 className="mb-6 font-display text-2xl font-bold text-white">
          Movies for you
        </h1>

        {categories.map((category) => (
          <CategorySection
            key={category}
            category={category}
            onSelectMovie={setSelectedMovieId}
          />
        ))}
      </main>

      {selectedMovieId && (
        <MovieModal
          imdbID={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
        />
      )}
    </div>
  );
};

export default MoviesPage;
