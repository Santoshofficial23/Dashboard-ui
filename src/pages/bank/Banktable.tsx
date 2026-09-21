import { useMemo, useState, useCallback } from "react";
import { Button, Flex, HStack, useDisclosure } from "@chakra-ui/react";
import { Pencil, Trash2 } from "lucide-react";
import type { Bank } from "../../types/type";
import { useDeleteBank } from "../../components/hooks/bank/useDeletebank";
import { useFetchBank, useToggleBank } from "../../components/hooks/bank/useFetchbank";
import type { TableColumnDef } from "../../components/table/Tablecomp";
import { INSTITUTION_TYPE_OPTIONS } from "../../constants/Bankoptions";
import Deletedialog from "./Deletedialog";
import TableComp from "../../components/table/Tablecomp";
import { SwitchComp } from "../../components/ui/switch-button";
import Bankdrawer from "./Bankdrawer";


const BankTable = () => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { open: deleteDialogOpen, onOpen: onDeleteDialogOpen, onClose: onDeleteDialogClose } = useDisclosure()
  const { open: bankDialogOpen, onOpen: onBankDialogOpen, onClose: onBankDialogClose } = useDisclosure()
  const {mutate: toggleBank} = useToggleBank();
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

const handleToggleBank = (id:string)=>{
  toggleBank(id)
}
  const handleDeleteClick = useCallback((id: string) => {
    setDeleteId(id);
    onDeleteDialogOpen();
  }, [onDeleteDialogOpen]);

  const handleDelete = () => {
    if (!deleteId) return;

    deleteBank(deleteId, {
      onSuccess: () => {
        setTimeout(() => {
          onDeleteDialogClose();
          setDeleteId(null);
        }, 1000);
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
        cell: ({ row }) => 
        (
          <SwitchComp 
          checked={row.original.active}
          onCheckedChange={() =>{
            handleToggleBank(String(row.original.id))
          }}

          />
        ) 
         
      },

      {
        id: "action",
        header: "Action",

        cell: ({ row }) => (
          <HStack gap="2">
            <Button
              size="xs"
              bg={"blue.600"}
               onClick={() => {setSelectedBankId(String(row.original.id)); onBankDialogOpen();}}
            >
              <Pencil size={14} />
              Edit
            </Button>
            <Button
              size="xs"
              bg={"danger.600"}
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
    [handleDeleteClick, onBankDialogOpen],
  );

  return (
    <>
      <Flex justify="flex-end">
        <Button
          bg={"blue.700"}
          onClick={() => {
            setSelectedBankId(null);
            onBankDialogOpen()
      
          }}
        >
          Add Bank
        </Button>
      </Flex>
      <Bankdrawer
      open ={bankDialogOpen}
        onClose={onBankDialogClose}
        selectedBankId={selectedBankId}
        isOpen={bankDialogOpen}
      />

      <Deletedialog
        isOpen={deleteDialogOpen}
        onClose={onDeleteDialogClose}
        onDelete={handleDelete}
        message="Are you sure want to delete it"
        isDeleting={isDeleting}
        onClear={() => setDeleteId(null)}
      />
      <TableComp
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
