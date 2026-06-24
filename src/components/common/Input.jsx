const Input = ({ label, name, value, onChange, onBlur, error, type = 'text', placeholder }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-muted">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`focus-ring w-full rounded-lg border bg-panel2 px-4 py-2.5 text-sm text-white placeholder:text-muted/60 transition-colors ${
          error ? 'border-red-500' : 'border-line focus:border-accent'
        }`}
      />
      {error ? (
        <span className="text-xs font-medium text-red-400">{error}</span>
      ) : null}
    </div>
  );
};

export default Input;
