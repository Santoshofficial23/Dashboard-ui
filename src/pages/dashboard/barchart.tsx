import { Box, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useExpenseStore } from "../../store/expenses.zustand";
import { MODULE_TYPE_EXPENSE } from "../../types/type";

const formatCurrency = (amount: number) =>
  `Rs. ${new Intl.NumberFormat("en-IN").format(amount)}`;

const ExpenseBarChart = () => {
  const expenses = useExpenseStore((state) => state.expenses);

  const categoryTotals = useMemo(() => {
    const totals = new Map<string, number>();

    expenses
      .filter((expense) => expense.type === MODULE_TYPE_EXPENSE.EXPENSE)
      .forEach((expense) => {
        const amount = Number(expense.amount);
        if (!Number.isFinite(amount)) return;

        const category = expense.category || "Uncategorized";
        totals.set(
          category,
          (totals.get(category) ?? 0) + amount,
        );
      });

    return [...totals.entries()].sort(([, first], [, second]) => second - first);
  }, [expenses]);

  const options: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 5,
        distributed: true,
      },
    },
    colors: ["#0EA5E9", "#14B8A6", "#F59E0B", "#F43F5E", "#8B5CF6"],
    dataLabels: { enabled: false },
    xaxis: {
      categories: categoryTotals.map(([category]) => category),
      labels: {
        formatter: (value) => formatCurrency(Number(value)),
      },
    },
    tooltip: {
      y: { formatter: formatCurrency },
    },
    legend: { show: false },
    grid: { borderColor: "#E2E8F0" },
  };

  return (
    <Box w="full">
      {categoryTotals.length === 0 ? (
        <Text color="gray.500">Add an expense to see category totals.</Text>
      ) : (
        <ReactApexChart
          options={options}
          series={[
            {
              name: "Expenses",
              data: categoryTotals.map(([, amount]) => amount),
            },
          ]}
          type="bar"
          height={Math.max(260, categoryTotals.length * 58)}
          width="100%"
        />
      )}
    </Box>
  );
};

export default ExpenseBarChart;
