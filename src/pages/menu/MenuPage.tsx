import { Box, Text } from "@chakra-ui/react";
import MenuTable from ".";

const MenuPage = () => {
  return (
    <Box >
      <Text fontWeight={'bold'}>Menu Setup</Text>
      <Text mb={5}>Manage your menu items and configurations</Text>
      <MenuTable />
    </Box>
  );
};

export default MenuPage;
