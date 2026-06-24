const Loader = ({ label = 'Loading...', size = 'md' }) => {
  const sizeClasses = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-10 w-10' : 'h-6 w-6';

  return (
    <div className="flex flex-col items-center justify-center gap-2 py-6 text-muted">
      <div
        className={`${sizeClasses} animate-spin rounded-full border-2 border-line border-t-accent`}
      />
      {label ? <span className="text-xs">{label}</span> : null}
    </div>
  );
};

export default Loader;
