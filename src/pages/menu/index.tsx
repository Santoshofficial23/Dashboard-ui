import { useMemo, useState } from "react";
import { Button, Flex, HStack, useDisclosure } from "@chakra-ui/react";
import { Pencil, Trash2 } from "lucide-react";

import TableComp, {
  type TableColumnDef,
} from "../../components/table/Tablecomp";

import { useFetchMenu } from "../../components/hooks/menu/useFetchmenu";
import MenuDrawer from "./MenuDrawer";

import type { MenuResponseType } from "@/types/type";
import type { FilterPayloadType } from "@/types/index";

const MenuTable = () => {
  const [payload, setPayload] = useState<FilterPayloadType>({
    page: 1,
    size: 10,
    searchValue: "",
  });

  const [selectedMenuId, setSelectedMenuId] = useState<string | null>(null);

  const { open, onOpen, onClose } = useDisclosure();

  const { data, isLoading, isFetching } = useFetchMenu({
    payload,
  });

  // Add Menu
  const handleAddMenu = () => {
    setSelectedMenuId(null);
    onOpen();
  };

  // Edit Menu
  const handleEditMenu = (id: string) => {
    setSelectedMenuId(id);
    onOpen();
  };

  const columns = useMemo<TableColumnDef<MenuResponseType>[]>(
    () => [
      {
        id: "serialNumber",
        header: "SN",
        cell: ({ row }) => (payload.page - 1) * payload.size + row.index + 1,
      },

      {
        accessorKey: "menuCode",
        header: "Menu Code",
      },

      {
        accessorKey: "menuName",
        header: "Menu Name",
      },

      {
        accessorKey: "moduleType",
        header: "Module Type",
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
              bg="blue.600"
              color="white"
              onClick={() => handleEditMenu(row.original.id ?? "")}
            >
              <Pencil size={14} />
              Edit
            </Button>

            <Button size="xs" bg="red.600" color="white">
              <Trash2 size={14} />
              Delete
            </Button>
          </HStack>
        ),
      },
    ],
    [payload.page, payload.size],
  );

  return (
    <>

      <Flex justify="flex-end" mb={4}>
        <Button bg="purple.600" color="white" onClick={handleAddMenu}>
          Add Menu
        </Button>
      </Flex>

      <MenuDrawer
        open={open}
        onClose={onClose}
        selectedMenuId={selectedMenuId}
      />

      <TableComp
        data={data?.data ?? []}
        columns={columns}
        loading={isLoading || isFetching}
        totalCount={data?.totalCount ?? 0}
        payload={payload}
        setPayload={setPayload}
        searchPlaceholder="Search menu..."
      />
    </>
  );
};

export default MenuTable;
