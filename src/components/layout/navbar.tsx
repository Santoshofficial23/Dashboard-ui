import { Button, Box, Flex, Text } from "@chakra-ui/react";
import { PanelRightOpen, PanelRightClose } from "lucide-react";

type NavbarProps = {
  onToggleCollapse: () => void;
  collapsed: boolean;
};

const Navbar = ({ onToggleCollapse, collapsed }: NavbarProps) => {
  return (
    <Box>
      <Button
        position="fixed"
        top="16px"
        left={collapsed ? "12px" : "245px"}
        variant="ghost"
        bg="transparent"
        color="gray.700"
        onClick={onToggleCollapse}
        p={2}
        minW="auto"
        transition="left 0.25s ease-in-out"
      >
        {collapsed ? (
          <PanelRightOpen size={22} />
        ) : (
          <PanelRightClose size={22} />
        )}
      </Button>
      <Flex
        bg="blue.100"
        color="gray.800"
        justify="center"
        align="center"
        h="50px"
        borderBottom="1px solid"
        borderColor="gray.200"
      >
        <Text fontSize="2xl" fontWeight="bold">
          Trust Bridge Capital Nepal
        </Text>
      </Flex>
    </Box>
  );
};

export default Navbar;
