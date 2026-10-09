import { Box, Button, HStack, Stack, Text, Checkbox } from "@chakra-ui/react";
import { Controller, useWatch, type Control } from "react-hook-form";
import InputField from "../../components/input";
import { ACTION_PERMISSIONS } from "../../constants/menuOptions";
import type { MenuFormData } from "./MenuDrawer";

type SubMenuFormProps = {
  control: Control<MenuFormData>;
  index: number;
  onRemove: (index: number) => void;
};

const SubMenuForm = ({ control, index, onRemove }: SubMenuFormProps) => {
  const subMenuPrivileges =
    useWatch({ control, name: `subMenus.${index}.privilege` }) || [];

  const subMenuAllSelected =
    ACTION_PERMISSIONS.length > 0 &&
    ACTION_PERMISSIONS.every((permission) =>
      subMenuPrivileges.includes(permission.value),
    );

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} borderColor="gray.200">
      <HStack justify="space-between" mb={3}>
        <Text fontWeight="600" fontSize="sm">
          {index + 1}. Sub Menu
        </Text>
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

              <Controller
                name={`subMenus.${index}.privilege`}
                control={control}
                render={({ field }) => (
                  <Checkbox.Root
                    checked={subMenuAllSelected}
                    onCheckedChange={(details) => {
                      const allPermissions = ACTION_PERMISSIONS.map(
                        (p) => p.value,
                      );
                      field.onChange(details.checked === true ? allPermissions : []);
                    }}
                    colorPalette="purple"
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                  </Checkbox.Root>
                )}
              />
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
                    checked={field.value?.includes(permission.value) ?? false}
                    onCheckedChange={(details) => {
                      const current = field.value || [];
                      field.onChange(
                        details.checked === true
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

        <HStack justify="flex-end">
          <Button
            size="sm"
            colorPalette="red"
            variant="outline"
            type="button"
            onClick={() => onRemove(index)}
          >
            Remove
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
};

export default SubMenuForm;