=import { HStack, PaginationItems, PaginationNextTrigger, PaginationPageText, PaginationPrevTrigger, PaginationRoot, Skeleton, Stack, Table, Text } from "@chakra-ui/react";
import type { RowData } from "@tanstack/react-table";
import { flexRender, useTable } from "@tanstack/react-table";

import type { DataTableProps } from "@/@types/components/table";


import SearchBar from "../SearchBar";
import { dataTableFeatures } from "@/types/components/table";


const SKELETON_ROWS = 6;

const DataTable = <T extends RowData>({
  columns,
  data,
  isLoading = false,
  emptyText = "No data available",
  maxHeight = "calc(100vh - 418px)",
  hasSearch = true,
  searchPlaceholder,
  onSearchChange,
  hasPagination = true,
  payload,
  setPayload,
  totalCount = 0,
}: DataTableProps<T>) => {
  const table = useTable({ features: dataTableFeatures, columns, data });

  const columnCount = table.getAllLeafColumns().length;
  const isEmpty = !isLoading && data.length === 0;
  const showPagination =
    hasPagination && !!payload && !!setPayload && !isEmpty && totalCount > 0;

  // A new search always starts again from the first page.
  const handleSearch = (search: string) => {
    setPayload?.((prev) => ({ ...prev, search, page: 1 }));
    onSearchChange?.(search);
  };

  return (
    <Stack width="full" gap={4}>
      {hasSearch && (
        <SearchBar
          onSearchChange={handleSearch}
          placeholder={searchPlaceholder}
          defaultValue={payload?.search}
        />
      )}

      <Table.ScrollArea borderWidth="1px" borderRadius="lg" maxH={maxHeight}>
        <Table.Root stickyHeader striped interactive={!isEmpty}>
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id} bg="bg.muted">
                {headerGroup.headers.map((header) => (
                  <Table.ColumnHeader
                    key={header.id}
                    colSpan={header.colSpan}
                    whiteSpace="nowrap"
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
            {isLoading ? (
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
                <Table.Cell colSpan={columnCount} textAlign="center" py={10}>
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
      </Table.ScrollArea>

      {showPagination && (
        <PaginationRoot
          count={totalCount}
          pageSize={payload.limit}
          page={payload.page}
          onPageChange={({ page }) => setPayload((prev) => ({ ...prev, page }))}
        >
          <HStack justify="space-between" wrap="wrap" gap={3}>
            <PaginationPageText format="long" color="fg.muted" />
            <HStack gap={1}>
              <PaginationPrevTrigger />
              <PaginationItems/>
              <PaginationNextTrigger />
            </HStack>
          </HStack>
        </PaginationRoot>
      )}
    </Stack>
  );
};   
