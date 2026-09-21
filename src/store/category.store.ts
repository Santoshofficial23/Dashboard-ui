import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Category = {
  id: number;
  name: string;
  type: string;
};

type CategoryStore = {
  categories: Category[];

  addCategory: (name: string, type: string) => void;
  deleteCategory: (id: number) => void;
};

export const useCategoryStore = create<CategoryStore>()(
  persist(
    (set) => ({
      categories: [],

      addCategory: (name, type) =>
        set((state) => {
          const trimmedName = name.trim();

          if (!trimmedName) {
            return state;
          }

          const alreadyExists = state.categories.some(
            (category) =>
              category.name.toLowerCase() ===
                trimmedName.toLowerCase() &&
              category.type === type,
          );

          if (alreadyExists) {
            return state;
          }

          return {
            categories: [
              ...state.categories,
              {
                id: Date.now(),
                name: trimmedName,
                type,
              },
            ],
          };
        }),

      deleteCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter(
            (category) => category.id !== id,
          ),
        })),
    }),
    {
      name: "expense-categories",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);