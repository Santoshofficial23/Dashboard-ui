import type { BoxProps, TableCellProps } from "@chakra-ui/react";
import { metaHelper, tableFeatures, type ColumnDef, type RowData } from "@tanstack/react-table";
import type { Dispatch, ReactNode, SetStateAction } from "react";

export const dataTableFeatures = tableFeatures({
  columnMeta: metaHelper<DataTableColumnMeta>(),
});

/** Server-side list query: which page, how many rows, and the search term. */
export interface FilterPayload {
  page: number;
  limit: number;
  search?: string;
}

/** Per-column layout, applied to both the header and body cells. */
export type DataTableColumnMeta = Pick<
  TableCellProps,
  "textAlign" | "width" | "minWidth" | "maxWidth"
>;

export type DataTableFeatures = typeof dataTableFeatures;

// `any` is TanStack's recommended value type: accessor columns are typed
// `ColumnDef<…, string>` etc., which don't assign to `ColumnDef<…, unknown>`.
// oxlint-disable-next-line typescript/no-explicit-any
export type DataTableColumnDef<T extends RowData> = ColumnDef<
  DataTableFeatures,
  T,
  any
>;

export interface DataTableProps<T extends RowData> {
  columns: DataTableColumnDef<T>[];
  data: T[];
  isLoading?: boolean;
  emptyText?: ReactNode;
  maxHeight?: BoxProps["maxHeight"];

  hasSearch?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;

  hasPagination?: boolean;
  payload?: FilterPayload;
  setPayload?: Dispatch<SetStateAction<FilterPayload>>;
  totalCount?: number;
}

export interface SearchBarProps {
  onSearchChange: (value: string) => void;
  placeholder?: string;
  defaultValue?: string;
  debounceMs?: number;
}
