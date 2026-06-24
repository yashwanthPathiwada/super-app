import axios from 'axios';

const BASE_URL = 'https://www.omdbapi.com/';
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

// OMDb has no native genre filter on search, so each category is mapped
// to a representative search term that reliably returns movies of that genre.
export const CATEGORY_SEARCH_TERMS = {
  Action: 'action',
  Comedy: 'comedy',
  Drama: 'drama',
  Music: 'music',
  Sports: 'sports',
  Thriller: 'thriller',
  Fantasy: 'fantasy',
  Romance: 'love',
};

export const fetchMoviesByCategory = async (category) => {
  if (!API_KEY) {
    throw new Error('Missing VITE_OMDB_API_KEY in your .env file');
  }

  const searchTerm = CATEGORY_SEARCH_TERMS[category] || category.toLowerCase();

  const response = await axios.get(BASE_URL, {
    params: {
      s: searchTerm,
      type: 'movie',
      apikey: API_KEY,
    },
  });

  if (response.data.Response === 'False') {
    return [];
  }

  return (response.data.Search || []).map((movie) => ({
    imdbID: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster !== 'N/A' ? movie.Poster : null,
  }));
};

export const fetchMovieDetails = async (imdbID) => {
  if (!API_KEY) {
    throw new Error('Missing VITE_OMDB_API_KEY in your .env file');
  }

  const response = await axios.get(BASE_URL, {
    params: {
      i: imdbID,
      plot: 'full',
      apikey: API_KEY,
    },
  });

  if (response.data.Response === 'False') {
    throw new Error(response.data.Error || 'Movie details not found');
  }

  const data = response.data;

  return {
    imdbID: data.imdbID,
    title: data.Title,
    poster: data.Poster !== 'N/A' ? data.Poster : null,
    genre: data.Genre,
    runtime: data.Runtime,
    rating: data.imdbRating,
    plot: data.Plot,
    actors: data.Actors,
    year: data.Year,
  };
};
