import type { TableCellProps } from "@chakra-ui/react";
import {
  metaHelper,
  tableFeatures,
  type ColumnDef,
  type RowData,
} from "@tanstack/react-table";
import type { Dispatch, ReactNode, SetStateAction } from "react";

import type { FilterPayloadType } from "../index";

/** Per-column layout, applied to both the header and body cells. */
export type DataTableColumnMeta = Pick<
  TableCellProps,
  "textAlign" | "width" | "minWidth" | "maxWidth"
>;

export const dataTableFeatures = tableFeatures({
  columnMeta: metaHelper<DataTableColumnMeta>(),
});

export type DataTableFeatures = typeof dataTableFeatures;

// `any` is TanStack's recommended value type: accessor columns are typed
// `ColumnDef<…, string>` etc., which don't assign to `ColumnDef<…, unknown>`.
export type TableColumnDef<T extends RowData> = ColumnDef<
  DataTableFeatures,
  T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any
>;

/**
 * Paging and search can be driven either by a single `payload` state
 * (`payload` + `setPayload`) or by individual `page`/`pageSize` values and
 * callbacks. When `payload` is given it takes precedence.
 */
export interface TableCompProps<T extends RowData> {
  data: T[];
  columns: TableColumnDef<T>[];
  loading?: boolean;
  emptyText?: ReactNode;
  totalCount?: number;

  payload?: FilterPayloadType;
  setPayload?: Dispatch<SetStateAction<FilterPayloadType>>;

  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  onSearch?: (value: string) => void;

  showSearch?: boolean;
  searchPlaceholder?: string;
  showPagination?: boolean;
}
