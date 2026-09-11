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

import {
  useCreateMenu,
  useUpdateMenu,
} from "../../components/hooks/menu/useFetchmenu";

import { useFetchMenuById } from "../../components/hooks/menu/useFetchmenuid";

import {
  MODULE_TYPE_OPTIONS,
  ACTION_PERMISSIONS,
} from "../../constants/Menuoptions";

import type { MenuSetupPayload } from "@/types/type";
import { MODULE_TYPE } from "../../types/type";

type MenuDrawerProps = {
  open: boolean;
  onClose: () => void;
  selectedMenuId: string | null;
};

type MenuFormData = Omit<MenuSetupPayload, "privilege" | "subMenus"> & {
  privilege: string[];
  status: boolean;
  subMenus?: Array<{
    id?: string;
    displayOrder: number ;
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
  displayOrder:0,
  status: true,
  subMenus: [],
};

const MenuDrawer = ({ open, onClose, selectedMenuId }: MenuDrawerProps) => {


  const { control, reset, handleSubmit, setValue, watch } =
    useForm({
      defaultValues: defaultValues,
    });

  const { mutate: createMenu, isPending: isCreating } = useCreateMenu();

  const { mutate: updateMenu, isPending: isUpdating } = useUpdateMenu();

  const { data: menuData, isLoading: isMenuLoading } = useFetchMenuById(
    selectedMenuId??"",
    open,
  );

  useEffect(() => {
    if (!selectedMenuId) {
      reset(defaultValues);
      return;
    }

    reset({
      menuName: menuData?.menuName ?? "",
      menuCode: menuData?.menuCode ?? "",
      moduleType: menuData?.moduleType ?? MODULE_TYPE.CRM,
      privilege: menuData?.privilege ?? [],
      displayOrder:menuData?.displayOrder ,
      status: menuData?.status ?? true,
      subMenus: menuData?.subMenus ?? [],
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

  const handleEnableAll = () => {
    if (allPermissionsSelected) {
      setValue("privilege", []);
    } else {
      setValue(
        "privilege",
        ACTION_PERMISSIONS.map((permission) => permission.value),
      );
    }
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

  const handleClear = () => {
    reset(defaultValues);
  };

  const handleClose = () => {
    reset(defaultValues);
    onClose();
  };

  const onSubmit = (data: MenuFormData) => {
    const normalizedPayload: MenuSetupPayload = {
      ...data,
      status: data.status ?? true,
      displayOrder: data.displayOrder ?? "0",
      subMenus: (data.subMenus ?? []).map((subMenu) => ({
        ...subMenu,
        displayOrder: subMenu.displayOrder ?? "0",
        privilege: subMenu.privilege ?? [],
        status: subMenu.status ?? true,
      })),
    };

    if (selectedMenuId && selectedMenuId) {
      updateMenu(
        {
          ...normalizedPayload,
          id: selectedMenuId,
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

    createMenu(normalizedPayload, {
      onSuccess: (response) => {
        console.log("Menu created successfully:", response);

        reset(defaultValues);
        onClose();
      },

      onError: (error) => {
        console.error("Create menu error:", error);
      },
    });
  };

  const isLoading = isMenuLoading || isCreating || isUpdating;

  return (
    <CommonDrawer
      size="full"
      placement="end"
      open={open}
      onClose={handleClose}
      title={selectedMenuId ? "Edit Menu" : "Add Menu"}
    >
      <Box as="form" onSubmit={handleSubmit(onSubmit)} p={6}>
        <Stack gap={6}>
          <Box>
            <Tabs.Root defaultValue="crm">
              <Tabs.List>
                {MODULE_TYPE_OPTIONS.map((option) => (
                  <Tabs.Trigger
                    key={option.value}
                    value={option.value.toLowerCase()}
                  >
                    {option.label}
                  </Tabs.Trigger>
                ))}
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
                    placeholder="MASTER_DATA"
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
                      onCheckedChange={handleEnableAll}
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

                            if (details.checked) {
                              field.onChange([...current, permission.value]);
                            } else {
                              field.onChange(
                                current.filter(
                                  (value) => value !== permission.value,
                                ),
                              );
                            }
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
                <Box
                  key={field.id}
                  borderWidth="1px"
                  borderRadius="md"
                  p={4}
                  borderColor="gray.200"
                >
                  <HStack justify="space-between" mb={3}>
                    <Text fontWeight="600" fontSize="sm">
                      {index + 1}. Sub Menu
                    </Text>

                    <Checkbox.Root colorPalette="purple" defaultChecked>
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                    </Checkbox.Root>
                  </HStack>

                  <Stack gap={4}>
                    <HStack gap={8}>
                      <Box flex={1}>
                        <InputField
                          name={`subMenus.${index}.displayOrder`}
                          control={control}
                          label="Display Order"
                          type="number"
                          placeholder="14"
                        />
                      </Box>

                      <Box flex={1}>
                        <InputField
                          name={`subMenus.${index}.menuName`}
                          control={control}
                          label="Sub Menu Name"
                          placeholder="Insurance Setup"
                        />
                      </Box>

                      <Box flex={1}>
                        <InputField
                          name={`subMenus.${index}.menuCode`}
                          control={control}
                          label="Menu Code"
                          placeholder="INSURANCE_SETUP"
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

                          <Checkbox.Root colorPalette="purple">
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />
                          </Checkbox.Root>
                        </HStack>
                      </HStack>

                      <HStack gap={8} flexWrap="wrap">
                        {ACTION_PERMISSIONS.map((permission) => (
                          <Controller
                            key={permission.value}
                            name={`subMenus.${index}.privilege`}
                            control={control}
                            render={({ field }) => (
                              <Checkbox.Root
                                checked={field.value?.includes(
                                  permission.value,
                                )}
                                onCheckedChange={(details) => {
                                  const current = field.value || [];

                                  if (details.checked) {
                                    field.onChange([
                                      ...current,
                                      permission.value,
                                    ]);
                                  } else {
                                    field.onChange(
                                      current.filter(
                                        (value) => value !== permission.value,
                                      ),
                                    );
                                  }
                                }}
                                colorPalette="purple"
                              >
                                <Checkbox.HiddenInput />
                                <Checkbox.Control />
                                <Checkbox.Label>
                                  {permission.label}
                                </Checkbox.Label>
                              </Checkbox.Root>
                            )}
                          />
                        ))}
                      </HStack>
                    </Box>

                    <HStack justify="flex-end">
                      <Button
                        size="sm"
                        colorPalette="red"
                        variant="outline"
                        type="button"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </Button>
                    </HStack>
                  </Stack>
                </Box>
              ))}
            </VStack>
          </Box>

          <HStack
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
              loading={isLoading}
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
        </Stack>
      </Box>
    </CommonDrawer>
  );
};

export default MenuDrawer;
