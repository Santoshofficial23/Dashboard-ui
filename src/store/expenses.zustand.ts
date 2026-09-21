import { create } from "zustand";
import type { Expense, ExpenseFormData } from "../types/type";
import { createJSONStorage, persist } from "zustand/middleware";

type ExpenseStore = {
  expenses: Expense[];

  addExpense: (data: ExpenseFormData) => void;
  deleteExpense: (id: number) => void;
};

export const useExpenseStore = create<ExpenseStore>()(
  persist(
    (set) => ( {
      expenses: [],

   addExpense: (data) =>
    set((state) => ({
      expenses: [
        ...state.expenses,
        {
          id: Date.now(),
          title: data.title,
          amount: Number(data.amount),
          type: data.type,
          category: data.category,
          date: data.date,
          description: data.descriptions,
        },
      ],
    })),

  deleteExpense: (id) =>
    set((state) => ({
      expenses: state.expenses.filter(
        (expense) => expense.id !== id
      ),
    })),
}),

 {
  name: "expense",
  storage: createJSONStorage(()=> localStorage)
 },
)
);