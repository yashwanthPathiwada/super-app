import { useNavigate } from 'react-router-dom';
import useCategoryStore from '../store/useCategoryStore';
import Button from '../components/common/Button';
import { CATEGORIES, MIN_CATEGORIES, ROUTES } from '../utils/constants';

const CategoriesPage = () => {
  const navigate = useNavigate();
  const categories = useCategoryStore((state) => state.categories);
  const toggleCategory = useCategoryStore((state) => state.toggleCategory);
  const isCategoriesSelected = useCategoryStore(
    (state) => state.isCategoriesSelected
  );

  const handleContinue = () => {
    if (!isCategoriesSelected) return;
    navigate(ROUTES.DASHBOARD, { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4 py-10">
      <div className="w-full max-w-xl rounded-2xl border border-line bg-panel p-8 shadow-card animate-fadeIn">
        <div className="mb-6 text-center">
          <h1 className="font-display text-2xl font-bold text-white">
            Pick your favorite genres
          </h1>
          <p className="mt-1 text-sm text-muted">
            Step 2 of 2 &mdash; choose at least {MIN_CATEGORIES} categories
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {CATEGORIES.map((category) => {
            const selected = categories.includes(category);
            return (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`focus-ring rounded-xl border px-4 py-4 text-sm font-semibold transition-all duration-200 hover:scale-[1.03] ${
                  selected
                    ? 'border-accent bg-accent/15 text-accent shadow-glow'
                    : 'border-line bg-panel2 text-muted hover:text-white'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs text-muted">
            {categories.length} / {MIN_CATEGORIES} minimum selected
          </span>
        </div>

        <Button
          onClick={handleContinue}
          disabled={!isCategoriesSelected}
          fullWidth
          className="mt-4"
        >
          Continue to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default CategoriesPage;
