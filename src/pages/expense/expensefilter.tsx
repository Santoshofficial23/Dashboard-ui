import { Box, Flex, NativeSelect } from "@chakra-ui/react";
import SearchBar from "../../components/table/Searchbar";

type TypeFilter = "Expense" | "Income" | "none";
type SortAmount = "asc" | "desc" | "none";

type ExpenseFilterProps = {
  search: string;
  setSearch: (value: string) => void;
  typeFilter: TypeFilter;
  setTypeFilter: (value: TypeFilter) => void;

  sortamount: SortAmount;
  setSortamount: (value: SortAmount) => void;
};

const ExpenseFilter = ({
  search,
  setSearch,
  typeFilter,
  setTypeFilter,
  sortamount,
  setSortamount,
}: ExpenseFilterProps) => {
  return (
    <Box w="full">
      <Flex
        justify="space-between"
        align="center"
        gap={2}
        flexWrap={{ base: "wrap", md: "nowrap" }}
        minH={20}
        mt={4}
        w="full"
        borderRadius="lg"
      >
        <SearchBar
          defaultValues={search}
          onSearchChange={setSearch}
          placeholder="Search expenses..."
        />

        <Flex  justify={'flex-end'} gap={2}>
        <NativeSelect.Root
          size="sm"
          width={{ base: "full", sm: "150px" }}
        >
          <NativeSelect.Field
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(e.target.value as TypeFilter)
            }
            borderRadius="lg"
            borderColor="gray.200"
            bg="white"
          >
            <option value="none">All types</option>
            <option value="Expense">Expenses</option>
            <option value="Income">Income</option>
          </NativeSelect.Field>

          <NativeSelect.Indicator />
        </NativeSelect.Root>

        {/* Amount Sort */}
        <NativeSelect.Root
          size="sm"
          width={{ base: "full", sm: "180px" }}
        >
          <NativeSelect.Field
            value={sortamount}
            onChange={(e) =>
              setSortamount(e.target.value as SortAmount)
            }
            borderRadius="lg"
            borderColor="gray.200"
            bg="white"
          >
            <option value="none">Sort by amount</option>
            <option value="asc">Amount: low to high</option>
            <option value="desc">Amount: high to low</option>
          </NativeSelect.Field>
 
          <NativeSelect.Indicator />
        </NativeSelect.Root>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ExpenseFilter;