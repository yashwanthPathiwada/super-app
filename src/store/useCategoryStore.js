import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const MIN_CATEGORIES = 3;

const useCategoryStore = create(
  persist(
    (set, get) => ({
      categories: [],
      isCategoriesSelected: false,

      toggleCategory: (category) => {
        const current = get().categories;
        const exists = current.includes(category);
        const updated = exists
          ? current.filter((c) => c !== category)
          : [...current, category];

        set({
          categories: updated,
          isCategoriesSelected: updated.length >= MIN_CATEGORIES,
        });
      },

      setCategories: (categories) =>
        set({
          categories,
          isCategoriesSelected: categories.length >= MIN_CATEGORIES,
        }),

      clearCategories: () =>
        set({
          categories: [],
          isCategoriesSelected: false,
        }),
    }),
    {
      name: 'super-app-categories',
    }
  )
);

export const MIN_CATEGORIES_REQUIRED = MIN_CATEGORIES;
export default useCategoryStore;
