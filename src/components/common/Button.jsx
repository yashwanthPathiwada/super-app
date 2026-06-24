const VARIANTS = {
  primary:
    'bg-accent text-white hover:bg-orange-600 disabled:bg-line disabled:text-muted disabled:cursor-not-allowed',
  secondary:
    'bg-panel2 text-white border border-line hover:border-accent disabled:opacity-50 disabled:cursor-not-allowed',
  ghost: 'bg-transparent text-muted hover:text-white',
  danger: 'bg-transparent text-red-400 hover:text-red-300 border border-red-500/40',
};

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
  fullWidth = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`focus-ring rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
        VARIANTS[variant]
      } ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
