import { Box, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useExpenseStore } from "../../store/expenses.zustand";
import { MODULE_TYPE_EXPENSE } from "../../types/type";

const formatCurrency = (amount: number) =>
  `Rs. ${new Intl.NumberFormat("en-IN").format(amount)}`;

const ApexChart = () => {
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

  const series = categoryTotals.map(([, amount]) => amount);
  const labels = categoryTotals.map(([category]) => category);
  const options: ApexOptions = {
    chart: { type: "donut", width: "100%" },
    labels,
    colors: ["#0EA5E9", "#14B8A6", "#F59E0B", "#F43F5E", "#8B5CF6"],
    plotOptions: {
      pie: {
        borderRadius: 12,
        donut: {
          size: "68%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total Expense",
              formatter: () =>
                formatCurrency(series.reduce((total, amount) => total + amount, 0)),
            },
          },
        },
      },
    },
    stroke: { width: 0 },
    dataLabels: { enabled: false },
    tooltip: { y: { formatter: formatCurrency } },
    legend: { position: "bottom" },
    responsive: [
      {
        breakpoint: 480,
        options: { chart: { width: 320 } },
      },
    ],
  };

  return (
    <Box>
      {series.length === 0 ? (
        <Text color="gray.500">Add an expense to see category spending.</Text>
      ) : (
        <Box maxW="420px" w="full">
          <ReactApexChart
            options={options}
            series={series}
            type="donut"
            width="90%"
          />
        </Box>
      )}
    </Box>
  );
};

export default ApexChart;