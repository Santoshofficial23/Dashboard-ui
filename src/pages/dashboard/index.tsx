import { MODULE_TYPE_EXPENSE } from "../../types/type";
import { useExpenseStore } from "../../store/expenses.zustand";
import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import ApexChart from "./piechart";
import ExpenseBarChart from "./barchart";
import Dashcard from "./dashCard";

const Dashboardpage = () => {
  const expenses = useExpenseStore((state) => state.expenses);

  const totalTransaction = expenses.length;

  const totals = expenses.reduce(
    (acc, expense) => {
      if (expense.type === MODULE_TYPE_EXPENSE.INCOME) {
        acc.income += expense.amount;
      } else {
        acc.expense += expense.amount;
      }

      acc.balance = acc.income - acc.expense;

      return acc;
    },
    {
      income: 0,
      expense: 0,
      balance: 0,
    },
  );
  const expenseTransactions = expenses.filter(
    (expense) => expense.type === MODULE_TYPE_EXPENSE.EXPENSE,
  );

  const avgExpense =
    expenseTransactions.length > 0
      ? expenseTransactions.reduce(
          (totalExpense, item) => totalExpense + Number(item.amount),
          0,
        ) / expenseTransactions.length
      : 0;

  const Highincomeofmonth = expenses
    .filter((expense) => expense.type === MODULE_TYPE_EXPENSE.INCOME)
    .reduce((max, expense) => Math.max(max, Number(expense.amount)), 0);

  const formatCurrency = (amount: number) => {
    return `Rs. ${new Intl.NumberFormat("en-IN").format(amount)}`;
  };

  const totalincome = formatCurrency(totals.income);
  const Highincome = formatCurrency(Highincomeofmonth);
  const totalExpense = formatCurrency(totals.expense);
  const totalBalance = formatCurrency(totals.balance);
  const avgExpenses = formatCurrency(avgExpense);
  return (
    <Flex direction="column" gap={6}>
      <Grid gap={4}  templateColumns="repeat(4, 1fr)">
        <GridItem colSpan={2}>
        <Dashcard
          title="Total Transactions"
          value={String(totalTransaction)}
          borderColor="black"
          color={"red"}
          bg="blue.200"
        />
   </GridItem>
        <Dashcard
          title="Total Income"
          value={totalincome}
          borderColor="green"
          bg="green.100"
        />

        <Dashcard
          title="Total Expenses"
          value={totalExpense}
          borderColor="red"
          bg="red.100"
        />

        <Dashcard
          title="Average Expense"
          value={avgExpenses}
          borderColor="red"
          bg="red.100"
        />
        <Dashcard
          title="Remaining Balances"
          value={totalBalance}
          borderColor="green"
          bg="green.100"
        />

        <Dashcard
          title="Highest Income"
          value={Highincome}
          borderColor="green"
          bg="green.100"
        />
      </Grid>

      <Flex gap={6} direction={{ base: "column", lg: "row" }}>
        <Box p={5} borderWidth="1px" borderRadius="md" flex="1" minW={0}>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Expenses by Category
          </Text>
          <ApexChart />
        </Box>

        <Box p={5} borderWidth="1px" borderRadius="md" flex="1" minW={0}>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Category Spending
          </Text>
          <ExpenseBarChart />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Dashboardpage;
