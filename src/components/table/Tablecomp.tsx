import * as React from "react";
import {
  Box,
  Stack,
  Table as ChakraTable,
  Text,
  Input,
} from "@chakra-ui/react";
import {
  Search,
} from "lucide-react";
import { flexRender, useTable } from "@tanstack/react-table";
import {
  stockFeatures,
  tableFeatures,
  type ColumnDef,
  type RowData,
} from "@tanstack/table-core";
import Pagination from "./Pagination";
const tableFeaturesWithoutSorting = Object.fromEntries(
  Object.entries(stockFeatures).filter(
    ([featureName]) => featureName !== "rowSortingFeature",
  ),
) as Omit<typeof stockFeatures, "rowSortingFeature">;
const tableFeaturesConfig = tableFeatures(tableFeaturesWithoutSorting);

export type TableColumnDef<TData extends RowData> = ColumnDef<
  typeof tableFeaturesConfig,
  TData,
  unknown
>;
type TableCompProps<TData extends RowData> = {
  data: TData[];
  columns: TableColumnDef<TData>[];
  loading?: boolean;
  page: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;

  onSearch?: (value: string) => void;
  searchPlaceholder?: string;
  showSearch?: boolean;
};

const TableComp = <TData extends RowData>({
  data,
  columns,
  loading = false,
  page,
  pageSize,
  totalCount,
  onPageChange,
  onPageSizeChange,
  onSearch,
  searchPlaceholder = "Search...",
  showSearch = true,
}: TableCompProps<TData>) => {
  const [textFilter, settextFilter] = React.useState("");
  const isInitialSearchRender = React.useRef(true);

  const pageCount = Math.ceil(totalCount / pageSize);

  const table = useTable({
    data,
    columns,
    features: tableFeaturesConfig,
  });
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    settextFilter(event.target.value);
  };

  React.useEffect(() => {
    if (isInitialSearchRender.current) {
      isInitialSearchRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      onPageChange(1);
      onSearch?.(textFilter.trim());
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [textFilter, onPageChange, onSearch]);
  
  return (
    <Stack gap="6">
      {showSearch && (
        <Box position="relative" maxW="360px" mt="4">
          <Box
            position="absolute"
            left="3"
            top="50%"
            transform="translateY(-50%)"
            color="fg.muted"
            pointerEvents="none"
          >
            <Search size={16} />
          </Box>

          <Input
            value={textFilter}
            onChange={handleSearch}
            placeholder={searchPlaceholder}
            ps="9"
          />
        </Box>
      )}

      <Box borderWidth="1px" rounded="lg" overflow="hidden" bg="bg.panel">
        <Box overflowX="auto" p={{ base: 3, md: 6 }}>
          <ChakraTable.Root
            interactive
            showColumnBorder
            size="sm"
            variant="outline"
          >
    
            <ChakraTable.Header>
              {table.getHeaderGroups().map((headerGroup) => (
                <ChakraTable.Row key={headerGroup.id} bg="bg.subtle">
                  {headerGroup.headers.map((header) => {
                    return (
                      <ChakraTable.ColumnHeader
                        key={header.id}
                        colSpan={header.colSpan}
                      >
                        {header.isPlaceholder ? null : (
                          <Text fontWeight="semibold">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                          </Text>
                        )}
                      </ChakraTable.ColumnHeader>
                    );
                  })}
                </ChakraTable.Row>
              ))}
            </ChakraTable.Header>


            <ChakraTable.Body>
              {loading ? (
                <ChakraTable.Row>
                  <ChakraTable.Cell
                    colSpan={table.getVisibleLeafColumns().length}
                    textAlign="center"
                    py="8"
                  >
                    Loading...
                  </ChakraTable.Cell>
                </ChakraTable.Row>
              ) : data.length === 0 ? (
                <ChakraTable.Row>
                  <ChakraTable.Cell
                    colSpan={table.getVisibleLeafColumns().length}
                    textAlign="center"
                    py="8"
                  >
                    {textFilter ? "No matching data" : "No data"}
                  </ChakraTable.Cell>
                </ChakraTable.Row>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <ChakraTable.Row key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <ChakraTable.Cell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </ChakraTable.Cell>
                    ))}
                  </ChakraTable.Row>
                ))
              )}
            </ChakraTable.Body>
          </ChakraTable.Root>
        </Box>

        <Pagination
          page={page}
          pageSize={pageSize}
          pageCount={pageCount}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </Box>
    </Stack>
  );
};

export default TableComp;
