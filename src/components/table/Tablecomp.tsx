import { useEffect, useEffectEvent, useState } from "react";
import { Box, Skeleton, Stack, Table, Text } from "@chakra-ui/react";
import { flexRender, useTable, type RowData } from "@tanstack/react-table";

import {
  dataTableFeatures,
  type TableCompProps,
} from "../../types/components/table";
import Pagination from "./Pagination";
import SearchBar from "./Searchbar";

export type { TableColumnDef } from "../../types/components/table";

const SKELETON_ROWS = 5;
const SEARCH_DEBOUNCE_MS = 500;

const TableComp = <T extends RowData>({
  data,
  columns,
  loading = false,
  emptyText = "No data available",
  totalCount = 0,
  payload,
  setPayload,
  page: pageProp = 1,
  pageSize: pageSizeProp = 10,
  onPageChange,
  onPageSizeChange,
  onSearch,
  showSearch = true,
  searchPlaceholder = "Search...",
  showPagination = true,
}: TableCompProps<T>) => {
  const table = useTable({ features: dataTableFeatures, columns, data });

  const page = payload?.page ?? pageProp;
  const pageSize = payload?.size ?? pageSizeProp;
  const pageCount = Math.ceil(totalCount / pageSize);
  const columnCount = table.getAllLeafColumns().length;
  const isEmpty = !loading && data.length === 0;

  const handlePageChange = (nextPage: number) => {
    setPayload?.((prev) => ({ ...prev, page: nextPage }));
    onPageChange?.(nextPage);
  };

  const handlePageSizeChange = (size: number) => {
    setPayload?.((prev) => ({ ...prev, size, page: 1 }));
    onPageSizeChange?.(size);
  };

  const handleSearch = (searchValue: string) => {
    setPayload?.((prev) => ({ ...prev, searchValue, page: 1 }));
    onPageChange?.(1);
    onSearch?.(searchValue);
  };

  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const onDebouncedSearch = useEffectEvent(handleSearch);

  useEffect(() => {
    if (searchTerm === null) return;
    const timer = setTimeout(
      () => onDebouncedSearch(searchTerm.trim()),
      SEARCH_DEBOUNCE_MS,
    );
    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <Stack gap="4">
      {showSearch && (
        <SearchBar
          onSearchChange={setSearchTerm}
          placeholder={searchPlaceholder}
        />
      )}

      <Box borderWidth="1px" rounded="lg"  bg="bg.panel">
        <Box maxH="400px" overflowY="auto">
          <Table.Root
            minW={"900px"}
            interactive={!isEmpty}
            size="sm"
            variant="outline"
          >
            <Table.Header position="sticky" top={0} zIndex={1} bg="gray.800">
              {table.getHeaderGroups().map((headerGroup) => (
                <Table.Row key={headerGroup.id} bg="bg.subtle">
                  {headerGroup.headers.map((header) => (
                    <Table.ColumnHeader
                      key={header.id}
                      colSpan={header.colSpan}
                      whiteSpace="nowrap"
                      fontWeight="semibold"
                      {...header.column.columnDef.meta}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </Table.ColumnHeader>
                  ))}
                </Table.Row>
              ))}
            </Table.Header>

            <Table.Body>
              {loading ? (
                Array.from({ length: SKELETON_ROWS }, (_, rowIndex) => (
                  <Table.Row key={rowIndex}>
                    {Array.from({ length: columnCount }, (_, cellIndex) => (
                      <Table.Cell key={cellIndex}>
                        <Skeleton height="5" />
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))
              ) : isEmpty ? (
                <Table.Row>
                  <Table.Cell colSpan={columnCount} textAlign="center" py="8">
                    <Text color="fg.muted">{emptyText}</Text>
                  </Table.Cell>
                </Table.Row>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <Table.Row key={row.id}>
                    {row.getAllCells().map((cell) => (
                      <Table.Cell key={cell.id} {...cell.column.columnDef.meta}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table.Root>
        </Box>

        {showPagination && (
          <Pagination
            page={page}
            pageSize={pageSize}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </Box>
    </Stack>
  );
};

export default TableComp;
