import { useMemo, useState, useCallback } from "react";
import { Button, Flex, HStack, useDisclosure } from "@chakra-ui/react";
import { Pencil, Trash2 } from "lucide-react";

import type { Bank } from "../../types/type";
import BankFormDialog from "../../pages/bank/Bankdialog";
import { useDeleteBank } from "../../components/hooks/bank/useDeletebank";
import { useFetchBank } from "../../components/hooks/bank/useFetchbank";
import type { TableColumnDef } from "../../components/table/Tablecomp";
import { INSTITUTION_TYPE_OPTIONS } from "../../constants/Bankoptions";
import Deletedialog from "./Deletedialog";
import TableComp from "../../components/table/Tablecomp";


const BankTable = () => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { open: deleteDialogOpen, onOpen: onDeleteDialogOpen, onClose: onDeleteDialogClose } = useDisclosure()
  const { open: bankDialogOpen, onOpen: onBankDialogOpen, onClose: onBankDialogClose } = useDisclosure()
  
  const { mutate: deleteBank, isPending: isDeleting } = useDeleteBank();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(4)
  const [searchValue, setSearchValue] = useState("");
  const [selectedBankId, setSelectedBankId] = useState<string | null>(null);

  const { data, isLoading, isFetching } = useFetchBank({
    page,
    size,
    searchValue,
  });
 const handlePageSizeChange = (newSize: number) => {
  setSize(newSize);
  setPage(1);
};

  const handleDeleteClick = useCallback((id: string) => {
    setDeleteId(id);
    onDeleteDialogOpen();
  }, [onDeleteDialogOpen]);

  const handleDelete = () => {
    if (deleteId === null) return;
    deleteBank(deleteId, {
      onSuccess: () => {
        setDeleteId(null);
      },
    });
  };

  const columns = useMemo<TableColumnDef<Bank>[]>(
    () => [
      {
        id: "serialNumber",
        header: "SN",
        cell: ({ row }) => row.index + 1,
      },

      {
        accessorKey: "bankCode",
        header: "Bank Code",
      },

      {
        accessorKey: "bankName",
        header: "Bank Name",
      },

      {
        accessorKey: "institutionType",
        header: "Institution Type",

        cell: ({ row }) => {
          const value = row.original.institutionType;

          return (
            INSTITUTION_TYPE_OPTIONS.find((item) => item.value === value)
              ?.label ?? value
          );
        },
      },

      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (row.original.status ? "Active" : "Inactive"),
      },

      {
        id: "action",
        header: "Action",

        cell: ({ row }) => (
          <HStack gap="2">
            <Button
              size="xs"
              bg={"blue.600"}
              onClick={() => {
                if (row.original.id === undefined) return;
                setSelectedBankId(row.original.id);
                onBankDialogOpen()
               
              }}
            >
              <Pencil size={14} />
              Edit
            </Button>
            <Button
              size="xs"
              bg={"red.600"}
              onClick={() => {
                if (row.original.id === undefined) {
                  return;
                }
                handleDeleteClick(row.original.id);
              }}
            >
              <Trash2 size={14} />
              Delete
            </Button>
          </HStack>
        ),
      },
    ],
    [handleDeleteClick, onBankDialogOpen ],
  );

  return (
    <>
      <Flex justify="flex-end">
        <Button
          bg={"purple.600"}
          onClick={() => {
            setSelectedBankId(null);
            onBankDialogOpen()
      
          }}
        >
          Add Bank
        </Button>
      </Flex>
      <BankFormDialog
        isOpen={bankDialogOpen}
        selectedBankId={selectedBankId}
        onClose={() => {
          onBankDialogClose();
          setSelectedBankId(null);
        }}
      />

      <Deletedialog
        isOpen={deleteDialogOpen}
        onClose={onDeleteDialogClose}
        onDelete={handleDelete}
        message="Are you sure want to delete it"
        isDeleting={isDeleting}
        onClear={() => setDeleteId(null)}
      />
      <TableComp<Bank>
        data={data?.data ?? []}
        columns={columns}
        loading={isLoading || isFetching}
        page={page}
        pageSize={size}
        totalCount={data?.totalCount ?? 0}
        onPageChange={setPage}
        onPageSizeChange={handlePageSizeChange}
        onSearch={setSearchValue}
        searchPlaceholder="Search bank..."
      />
    </>
  );
};

export default BankTable;
