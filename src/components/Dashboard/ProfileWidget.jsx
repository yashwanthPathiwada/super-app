import useUserStore from '../../store/useUserStore';
import useCategoryStore from '../../store/useCategoryStore';

const ProfileWidget = () => {
  const user = useUserStore((state) => state.user);
  const categories = useCategoryStore((state) => state.categories);

  if (!user) return null;

  const fields = [
    { label: 'Name', value: user.name },
    { label: 'Username', value: `@${user.username}` },
    { label: 'Email', value: user.email },
    { label: 'Mobile', value: user.mobile },
  ];

  return (
    <div className="rounded-xl border border-line bg-panel p-5 shadow-card">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 font-display text-lg font-bold text-accent">
          {user.name?.charAt(0)?.toUpperCase()}
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-white">
            {user.name}
          </h3>
          <p className="text-xs text-muted">@{user.username}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.label} className="rounded-lg bg-panel2 px-3 py-2">
            <p className="text-[11px] uppercase tracking-wide text-muted">
              {field.label}
            </p>
            <p className="truncate text-sm font-medium text-white">
              {field.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <p className="mb-2 text-[11px] uppercase tracking-wide text-muted">
          Favorite Categories
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileWidget;
