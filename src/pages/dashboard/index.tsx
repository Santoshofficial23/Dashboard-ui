import { MODULE_TYPE_EXPENSE } from "../../types/type";
import { useExpenseStore } from "../../store/expenses.zustand";
import { Box, Flex, Text } from "@chakra-ui/react";
import ApexChart from "./piechart";
import ExpenseBarChart from "./barchart";

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

const avgExpense = expenseTransactions.length > 0
  ? expenseTransactions.reduce(
      (totalExpense, item) => totalExpense + Number(item.amount),
      0,
    ) / expenseTransactions.length
  : 0;

const topIncome = expenses
  .filter((expense) => expense.type === MODULE_TYPE_EXPENSE.INCOME)
  .reduce(
    (max, expense) => Math.max(max, Number(expense.amount)),
    0,
  );

  const formatCurrency = (amount: number) =>{
  return `Rs. ${new Intl.NumberFormat("en-IN").format(amount)}`;
};
  return (
    <Flex direction="column" gap={6}>
      <Flex gap={5} wrap="wrap">
        <Box
          p={6}
          borderWidth="1px"
          borderRadius="xl"
          flex="1"
          minW="220px"
          bg="white"
          boxShadow="sm"
          transition="all 0.2s"
          _hover={{
            boxShadow: "md",
            transform: "translateY(-2px)",
          }}
        >
          <Text color="gray.500" fontSize="sm" fontWeight="medium">
            Total Transaction
          </Text>

          <Text mt={2} fontSize="3xl" fontWeight="bold" color="gray.800">
            {totalTransaction}
          </Text>

          <Text mt={1} fontSize="sm" color="gray.500">
            All transactions
          </Text>
        </Box>
        <Box
          p={6}
          borderWidth="1px"
          borderRadius="xl"
          flex="1"
          minW="220px"
          bg="green.50"
          borderColor="green.100"
          boxShadow="sm"
          transition="all 0.2s"
          _hover={{
            boxShadow: "md",
            transform: "translateY(-2px)",
          }}
        >
          <Text color="green.700" fontSize="sm" fontWeight="medium">
            Total Income
          </Text>

          <Text mt={2} fontSize="3xl" fontWeight="bold" color="green.700">
            {formatCurrency(totals.income)}
          </Text>

          <Text mt={1} fontSize="sm" color="green.600">
            Money received
          </Text>
        </Box>

        <Box
          p={6}
          borderWidth="1px"
          borderRadius="xl"
          flex="1"
          minW="220px"
          bg="red.50"
          borderColor="red.100"
          boxShadow="sm"
          transition="all 0.2s"
          _hover={{
            boxShadow: "md",
            transform: "translateY(-2px)",
          }}
        >
          <Text color="red.700" fontSize="sm" fontWeight="medium">
            Total Expense
          </Text>

          <Text mt={2} fontSize="3xl" fontWeight="bold" color="red.700">
            {formatCurrency(totals.expense)}
          </Text>

          <Text mt={1} fontSize="sm" color="red.600">
            Money spent
          </Text>
        </Box>
       
          <Box
          p={6}
          borderWidth="1px"
          borderRadius="xl"
          flex="1"
          minW="220px"
          bg="red.50"
          borderColor="red.100"
          boxShadow="sm"
          transition="all 0.2s"
          _hover={{
            boxShadow: "md",
            transform: "translateY(-2px)",
          }}
        >
          <Text color="red.700" fontSize="sm" fontWeight="medium">
            Average Expense
          </Text>

          <Text mt={2} fontSize="3xl" fontWeight="bold" color="red.700">
            {formatCurrency(avgExpense)}
          </Text>

          <Text mt={1} fontSize="sm" color="red.600">
            Average expenses
          </Text>
        </Box>
       
       
       

        <Box
          p={6}
          borderWidth="1px"
          borderRadius="xl"
          flex="1"
          minW="220px"
          bg="green.100"
          borderColor="blue.100"
          boxShadow="sm"
          transition="all 0.2s"
          _hover={{
            boxShadow: "md",
            transform: "translateY(-2px)",
          }}
        >
          <Text color="green.700" fontSize="sm" fontWeight="medium">
            Balance
          </Text>
           <Text mt={2} fontSize="3xl" fontWeight="bold" color="green.700">
            {formatCurrency(totals.balance)}
          </Text>

          <Text mt={1} fontSize="sm" color="green.600">
            Remaining Balance
          </Text>
        </Box>

         <Box
          p={6}
          borderWidth="1px"
          borderRadius="xl"
          flex="1"
          minW="220px"
          bg="green.100"
          borderColor="blue.100"
          boxShadow="sm"
          transition="all 0.2s"
          _hover={{
            boxShadow: "md",
            transform: "translateY(-2px)",
          }}
        >
          <Text color="green.700" fontSize="sm" fontWeight="medium">
            High Income
          </Text>
           <Text mt={2} fontSize="3xl" fontWeight="bold" color="green.700">
            {formatCurrency(topIncome)}
          </Text>

          <Text mt={1} fontSize="sm" color="green.600">
            Highest Income
          </Text>
        </Box>
      </Flex>

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
