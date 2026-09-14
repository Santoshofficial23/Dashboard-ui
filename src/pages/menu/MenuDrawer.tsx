import {
  Box,
  Button,
  Stack,
  HStack,
  Text,
  VStack,
  Tabs,
  Checkbox,
} from "@chakra-ui/react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import InputField from "../../components/input";
import CommonDrawer from "../../components/Drawer/Commondrawer";
import SubMenuForm from "./Submenu";
import {
  useCreateMenu,
  useUpdateMenu,
} from "../../components/hooks/menu/useFetchmenu";
import { useFetchMenuById } from "../../components/hooks/menu/useFetchmenuid";
import { ACTION_PERMISSIONS } from "../../constants/Menuoptions";
import type { MenuSetupPayload } from "@/types/type";
import { MODULE_TYPE } from "../../types/type";

type MenuDrawerProps = {
  open: boolean;
  onClose: () => void;
  selectedMenuId: string | null;
};

export type MenuFormData = Omit<MenuSetupPayload, "privilege" | "subMenus"> & {
  privilege: string[];
  status: boolean;
  active: boolean;
  subMenus?: Array<{
    id?: string;
    displayOrder: number;
    menuName: string;
    menuCode: string;
    moduleType: MODULE_TYPE;
    privilege: string[];
    status: boolean;
  }>;
};

const defaultValues: MenuFormData = {
  menuName: "",
  menuCode: "",
  moduleType: MODULE_TYPE.CRM,
  privilege: [],
  displayOrder: 0,
  status: true,
  active: true,
  subMenus: [],
};

const MenuDrawer = ({ open, onClose, selectedMenuId }: MenuDrawerProps) => {
  const { control, reset, handleSubmit, setValue, watch } =
    useForm<MenuFormData>({ defaultValues });
  const moduleType = watch("moduleType");

  const { mutate: createMenu, isPending: isCreating } = useCreateMenu();
  const { mutate: updateMenu, isPending: isUpdating } = useUpdateMenu();

  const { data: menuData, isLoading: isMenuLoading } = useFetchMenuById(
    selectedMenuId ?? "",
    open,
  );

  useEffect(() => {
    if (!selectedMenuId) {
      reset(defaultValues);
      return;
    }
    if (!menuData) return;

    reset({
      menuName: menuData.menuName,
      menuCode: menuData.menuCode,
      moduleType: menuData.moduleType,
      privilege: menuData.privilege || [],
      displayOrder: menuData.displayOrder || 0,
      status: menuData.status,
      active: menuData.active,
      subMenus: menuData.subMenus || [],
    });
  }, [menuData, selectedMenuId, reset]);

  useEffect(() => {
    if (open && !selectedMenuId) {
      reset(defaultValues);
    }
  }, [open, selectedMenuId, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subMenus",
  });

  const privileges = watch("privilege");

  const allPermissionsSelected =
    ACTION_PERMISSIONS.length > 0 &&
    ACTION_PERMISSIONS.every((permission) =>
      privileges.includes(permission.value),
    );

  const handleMenuEnableAll = (checked: boolean) => {
    const allPermissions = ACTION_PERMISSIONS.map((p) => p.value);
    setValue("privilege", checked ? allPermissions : []);
  };

  const addSubMenu = () => {
    append({
      displayOrder: 0,
      menuName: "",
      menuCode: "",
      moduleType: MODULE_TYPE.CRM,
      privilege: [],
      status: true,
    });
  };

  const handleClear = () => reset(defaultValues);

  const handleClose = () => {
    reset(defaultValues);
    onClose();
  };

  const onSubmit = (data: MenuFormData) => {
    const payload = {
      ...data,
      active: data.active ?? true,
      status: data.status ?? true,
      displayOrder: Number(data.displayOrder ?? 0),
      subMenus: data.subMenus ?? [],
    };

    if (selectedMenuId) {
      updateMenu(
        {
          id: selectedMenuId,
          ...payload,
        },
        {
          onSuccess: () => {
            reset(defaultValues);
            onClose();
          },
          onError: (error) => {
            console.error("Update menu error:", error);
          },
        },
      );

      return;
    }

    createMenu(payload, {
      onSuccess: () => {
        reset(defaultValues);
        onClose();
      },
      onError: (error) => {
        console.error("Create menu error:", error);
      },
    });
  };
  return (
    <CommonDrawer
      size="full"
      placement="end"
      open={open}
      onClose={handleClose}
      title={selectedMenuId ? "Edit Menu" : "Add Menu"}
      footer={
        <HStack justify="flex-end" gap={4} w="full">
          <Button variant="outline" type="button" onClick={handleClear}>
            Clear
          </Button>

          <Button variant="outline" type="button" onClick={handleClose}>
            Close
          </Button>

          <Button
            bg="blue.700"
            color="white"
            type="submit"
            form="menu-form"
            loading={isMenuLoading}
          >
            {isMenuLoading
              ? "Loading..."
              : isCreating
                ? "Adding..."
                : isUpdating
                  ? "Updating..."
                  : "Submit"}
          </Button>
        </HStack>
      }
    >
      <Box as="form" id="menu-form" onSubmit={handleSubmit(onSubmit)} p={6}>
        <Stack gap={6}>
          <Box>
            <Tabs.Root
              value={moduleType === MODULE_TYPE.CRM ? "crm" : "cms"}
              onValueChange={(details) => {
                setValue(
                  "moduleType",
                  details.value === "crm" ? MODULE_TYPE.CRM : MODULE_TYPE.CMS,
                );
              }}
            >
              <Tabs.List>
                <Tabs.Trigger value="crm">CRM</Tabs.Trigger>
                <Tabs.Trigger value="cms">CMS</Tabs.Trigger>
              </Tabs.List>
            </Tabs.Root>
          </Box>

          <Box borderWidth="1px" borderRadius="md" p={4} borderColor="gray.200">
            <Text fontSize="lg" fontWeight="600" mb={4}>
              Menu
            </Text>
            <Text fontSize="sm" color="gray.600" mb={4}>
              Provide dynamic fields for menu configuration.
            </Text>

            <Stack gap={4}>
              <HStack gap={8}>
                <Box flex={1}>
                  <InputField
                    name="displayOrder"
                    control={control}
                    label="Display Order"
                    type="number"
                    placeholder="9"
                  />
                </Box>
                <Box flex={1}>
                  <InputField
                    name="menuName"
                    control={control}
                    label="Menu Name"
                    placeholder="Master Data"
                  />
                </Box>
                <Box flex={1}>
                  <InputField
                    name="menuCode"
                    control={control}
                    label="Menu Code"
                    placeholder="eg:MASTER_DATA"
                  />
                </Box>
              </HStack>

              <Box>
                <HStack justify="space-between" mb={3}>
                  <Text fontWeight="600" fontSize="sm">
                    Action Permissions
                  </Text>
                  <HStack gap={2}>
                    <Text fontSize="sm">Enable All</Text>
                    <Checkbox.Root
                      checked={allPermissionsSelected}
                      onCheckedChange={(details) =>
                        handleMenuEnableAll(details.checked === true)
                      }
                      colorPalette="purple"
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                    </Checkbox.Root>
                  </HStack>
                </HStack>

                <HStack gap={8} flexWrap="wrap">
                  {ACTION_PERMISSIONS.map((permission) => (
                    <Controller
                      key={permission.value}
                      name="privilege"
                      control={control}
                      render={({ field }) => (
                        <Checkbox.Root
                          checked={field.value.includes(permission.value)}
                          onCheckedChange={(details) => {
                            const current = field.value || [];
                            field.onChange(
                              details.checked
                                ? [...current, permission.value]
                                : current.filter((v) => v !== permission.value),
                            );
                          }}
                          colorPalette="purple"
                        >
                          <Checkbox.HiddenInput />
                          <Checkbox.Control />
                          <Checkbox.Label>{permission.label}</Checkbox.Label>
                        </Checkbox.Root>
                      )}
                    />
                  ))}
                </HStack>
              </Box>
            </Stack>
          </Box>

          <Box>
            <HStack justify="space-between" mb={4}>
              <Text fontSize="md" fontWeight="600">
                Sub Menus
              </Text>
              <Button
                size="sm"
                variant="outline"
                colorPalette="purple"
                type="button"
                onClick={addSubMenu}
              >
                + Add Sub Menu
              </Button>
            </HStack>

            <VStack gap={4} align="stretch">
              {fields.map((field, index) => (
                <SubMenuForm
                  key={field.id}
                  control={control}
                  index={index}
                  onRemove={remove}
                />
              ))}
            </VStack>
          </Box>

          {/* <HStack
            justify="flex-end"
            gap={4}
            pt={6}
            borderTopWidth="1px"
            borderColor="gray.200"
          >
            <Button variant="outline" type="button" onClick={handleClear}>
              Clear
            </Button>
            <Button variant="outline" type="button" onClick={handleClose}>
              Close
            </Button>
            <Button
              bg="purple.600"
              color="white"
              type="submit"
              loading={isMenuLoading}
            >
              {isMenuLoading
                ? "Loading..."
                : isCreating
                  ? "Adding..."
                  : isUpdating
                    ? "Updating..."
                    : "Submit"}
            </Button>
          </HStack> */}
        </Stack>
      </Box>
    </CommonDrawer>
  );
};
export default MenuDrawer;
