const PLACEHOLDER_POSTER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="445" viewBox="0 0 300 445"><rect width="300" height="445" fill="%231C232D"/><text x="50%25" y="50%25" fill="%238A93A3" font-size="16" text-anchor="middle" dy=".3em">No Poster</text></svg>';

const MovieCard = ({ movie, onClick }) => {
  return (
    <button
      onClick={() => onClick(movie)}
      className="focus-ring group flex flex-col overflow-hidden rounded-xl border border-line bg-panel text-left shadow-card transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.05] hover:shadow-glow"
    >
      <div className="aspect-[2/3] w-full overflow-hidden bg-panel2">
        <img
          src={movie.poster || PLACEHOLDER_POSTER}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = PLACEHOLDER_POSTER;
          }}
        />
      </div>
      <div className="p-3">
        <p className="truncate text-sm font-semibold text-white">
          {movie.title}
        </p>
        <p className="text-xs text-muted">{movie.year}</p>
      </div>
    </button>
  );
};

export default MovieCard;
