import { MODULE_TYPE_EXPENSE } from "../../types/type";
import TableComp from "../../components/table";
import { Badge, Box, Button, Flex, Text } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import ExpenseDrawer from "./ExpenseDrawer";
import { useExpenseStore } from "../../store/expenses.zustand";
import ExpenseFilter from "./expensefilter";

const ExpenseTrackertable = () => {
  const expenses = useExpenseStore((state) => state.expenses);
  const addExpenses = useExpenseStore((state) => state.addExpense);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sortamount, setSortamount] = useState<"asc" | "desc" | "none">("none");
  const [typeFilter, setTypeFilter] = useState<"Expense" | "Income" | "none">(
    "none",
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredexpenses = useMemo(() => {
    const filtered = expenses.filter((expense) => {
      return (
        expense.title.toLowerCase().includes(search.toUpperCase()) ||
        expense.category.toLowerCase().includes(search.toUpperCase())
      );
    });

    const typeFiltered =
      typeFilter === "none"
        ? filtered
        : filtered.filter((expense) =>
            typeFilter === "Expense"
              ? expense.type === MODULE_TYPE_EXPENSE.EXPENSE
              : expense.type === MODULE_TYPE_EXPENSE.INCOME,
          );

    if (sortamount === "asc") {
      return [...typeFiltered].sort((a, b) => a.amount - b.amount);
    }

    if (sortamount === "desc") {
      return [...typeFiltered].sort((a, b) => b.amount - a.amount);
    }

    return typeFiltered;
  }, [expenses, search, sortamount, typeFilter]);

  const pageCount = Math.ceil(filteredexpenses.length / pageSize);

  const validPage = pageCount === 0 ? 1 : Math.min(page, pageCount);

  const paginatedExpenses = useMemo(() => {
    const start = (validPage - 1) * pageSize;

    return filteredexpenses.slice(start, start + pageSize);
  }, [filteredexpenses, validPage, pageSize]);

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPage(1);
  };

  const formatCurrency = (amount: number) => {
    return `Rs. ${new Intl.NumberFormat("en-IN").format(amount)}`;
  };

  const columns = [
    {
      id: "SerialNumber",
      header: "SN",
      cell: ({ row }: any) => row.index + 1,
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ getValue }: any) => (
        <Text fontWeight="semibold">{formatCurrency(Number(getValue()))}</Text>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ getValue }: any) => {
        const type = getValue();
        const isIncome = type === MODULE_TYPE_EXPENSE.INCOME;
        return (
          <Badge colorPalette={isIncome ? "green" : "red"} variant="subtle">
            {type}
          </Badge>
        );
      },
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
  ];

  return (
    <Box mt={6} textAlign="left">
      <Flex justify="flex-end" mb={4}>
        <Button bg="blue.700" gap={2} onClick={() => setIsDrawerOpen(true)}>
          Add Expense or Income
        </Button>
      </Flex>

      <ExpenseFilter
        search={search}
        setSearch={setSearch}
        typeFilter={typeFilter}
        setSortamount={setSortamount}
        sortamount={sortamount}
        setTypeFilter={setTypeFilter}
      />

      <ExpenseDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onAdd={addExpenses}
      />
      <TableComp
        data={paginatedExpenses}
        columns={columns}
        page={validPage}
        pageSize={pageSize}
        totalCount={filteredexpenses.length}
        onPageChange={setPage}
        onPageSizeChange={handlePageSizeChange}
        showSearch={false}
        showPagination={true}
      />
    </Box>
  );
};
<Box
  borderWidth="1px"
  borderColor="gray.200"
  borderRadius="xl"
  bg="white"
  p={5}
  boxShadow="sm"
  borderTopWidth="3px"
  borderTopColor="black"
></Box>;

export default ExpenseTrackertable;
