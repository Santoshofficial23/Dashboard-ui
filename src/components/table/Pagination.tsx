import {
  Button,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";

import {
  ArrowLeft,
  ArrowRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

type PaginationProps = {
  page: number;
  pageSize: number;
  pageCount: number;

  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

const Pagination = ({
  page,
  pageSize,
  pageCount,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  const getPageNumbers = (): (
    | number
    | "ellipsis"
  )[] => {
    if (pageCount <= 1) {
      return pageCount === 1 ? [1] : [];
    }

    const pages: (
      | number
      | "ellipsis"
    )[] = [];

    const range: number[] = [];

    const delta = 1;

    for (
      let index = 1;
      index <= pageCount;
      index++
    ) {
      if (
        index === 1 ||
        index === pageCount ||
        (index >= page - delta &&
          index <= page + delta)
      ) {
        range.push(index);
      }
    }

    let previous: number | undefined;

    for (const current of range) {
      if (
        previous !== undefined &&
        current - previous > 1
      ) {
        pages.push("ellipsis");
      }

      pages.push(current);
      previous = current;
    }

    return pages;
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newSize = Number(event.target.value);

    onPageSizeChange(newSize);

    // Reset to page 1 when page size changes
    onPageChange(1);
  };

  return (
    <HStack
      justify="space-between"
      px="4"
      py="3"
      borderTopWidth="1px"
      flexWrap="wrap"
      gap="3"
    >
      <HStack gap="4">
        <Text
          fontSize="sm"
          color="black"
        >
          Rows per page
        </Text>

        <select
          value={pageSize}
          onChange={handlePageSizeChange}
          style={{
            height: "32px",
            borderRadius: "6px",
            border: "1px solid #CBD5E0",
            padding: "0 8px",
          }}
        >
          <option value={4}>4</option>
          <option value={8}>8</option>
          <option value={10}>10</option>
          <option value={12}>12</option>
          <option value={16}>16</option>
          <option value={20}>20</option>
        </select>
      </HStack>

      {/* Pagination Buttons */}
      <HStack gap="1">
        {/* First */}
        <IconButton
          aria-label="First page"
          size="sm"
          variant="ghost"
          disabled={page <= 1}
          onClick={() => onPageChange(1)}
        >
          <ChevronsLeft size={16} />
        </IconButton>

        {/* Previous */}
        <IconButton
          aria-label="Previous page"
          size="sm"
          variant="ghost"
          disabled={page <= 1}
          onClick={() =>
            onPageChange(page - 1)
          }
        >
          <ArrowLeft size={16} />
        </IconButton>

        {/* Page Numbers */}
        {getPageNumbers().map(
          (pageNumber, index) =>
            pageNumber === "ellipsis" ? (
              <Text
                key={`ellipsis-${index}`}
                px="2"
                color="fg.muted"
                fontSize="sm"
              >
                …
              </Text>
            ) : (
              <Button
                key={pageNumber}
                size="sm"
                minW="8"
                variant={
                  pageNumber === page
                    ? "solid"
                    : "ghost"
                }
                colorPalette={
                  pageNumber === page
                    ? "blue"
                    : undefined
                }
                onClick={() =>
                  onPageChange(pageNumber)
                }
              >
                {pageNumber}
              </Button>
            ),
        )}

        <IconButton
          aria-label="Next page"
          size="sm"
          variant="ghost"
          disabled={
            page >= pageCount ||
            pageCount === 0
          }
          onClick={() =>
            onPageChange(page + 1)
          }
        >
          <ArrowRight size={16} />
        </IconButton>

        <IconButton
          aria-label="Last page"
          size="sm"
          variant="ghost"
          disabled={
            page >= pageCount ||
            pageCount === 0
          }
          onClick={() =>
            onPageChange(pageCount)
          }
        >
          <ChevronsRight size={16} />
        </IconButton>
      </HStack>
    </HStack>
  );
};

export default Pagination;