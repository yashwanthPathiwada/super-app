const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-6 text-center">
      <span className="text-sm font-medium text-red-400">
        {message || 'Something went wrong.'}
      </span>
      {onRetry ? (
        <button
          onClick={onRetry}
          className="focus-ring rounded-md border border-red-400/40 px-4 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-500/10"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
};

export default ErrorMessage;
