import {
  Box,
  Button,
  Flex,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  LayoutDashboard,
  // Users,
  LandmarkIcon,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/token/tokenkey";
import { removeUserInfo, getUserInfo } from "../../utils/token/userinfo";
import { NAVIGATION_ROUTES } from "../../constants/routes";

const Sidebar = () => {
  const navigate = useNavigate();
  const userInfo = getUserInfo() || { username: "", email: "" };

  const handleLogout = () => {
    removeToken();
    removeUserInfo();
    navigate("/LOGIN", { replace: true });
  };

  return (
    <Box
      w="250px"
      h="100vh"
      bg="bg.emphasized"
      color="black"
      p={5}
      position="fixed"
      left={0}
      top={0}
      display="flex"
      flexDirection="column"
    >
      <Flex align="center" gap={3} mb={10}>
        <Image
          src="/hero.png"
          alt="Logo"
          w="50px"
          h="50px"
          objectFit="contain"
        />

        <Text fontSize="xl" fontWeight="bold">
          TBC NEPAL
        </Text>
      </Flex>

      <Stack gap={2} flex={1}>
        <NavItem
          to={NAVIGATION_ROUTES.DASHBOARD}
          icon={<LayoutDashboard size={18} />}
        >
          Dashboard
        </NavItem>

        <NavItem
          to={NAVIGATION_ROUTES.MENU}
          icon={<Menu size={18} />}
        >
          Menu Setup
        </NavItem>
        <NavItem
          to={NAVIGATION_ROUTES.BANK}
          icon={<LandmarkIcon size={18} />}
        >
          Bank setup
        </NavItem>

        <NavItem
          to="/settings"
          icon={<Settings size={18} />}
        >
          Settings
        </NavItem>
      </Stack>

      <Box
        bg="whiteAlpha.600"
        p={4}
        borderRadius="md"
        mt="auto"
      >
        <Flex align="center" gap={3} mb={3}>
          <Image
            height={10}
            w={10}
            borderRadius="50%"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXJNyWgnnidyZtwYgTLuwl1gUEpIwctB2HQDeDRdydiA&s=10"
            alt="Admin Avatar"
          />
          <Box flex={1}>
            <Text fontWeight="bold" fontSize="sm">
              {/* {userInfo.username || "Super Admin"} */}
              Super Admin
            </Text>
            <Text fontSize="xs" color="gray.600" truncate>
              {userInfo.username || "email@example.com"}
            </Text>
          </Box>
        </Flex>
        <Button
          w="full"
          size="sm"
          variant="ghost"
          onClick={handleLogout}
          display="flex"
          gap={2}
        >
          <LogOut size={16} />
          Logout
        </Button>
      </Box>
    </Box>
  );
};

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

const NavItem = ({
  to,
  icon,
  children,
}: NavItemProps) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <Flex
          align="center"
          gap={3}
          px={4}
          py={3}
          borderRadius="md"
          
          color={isActive ?'whiteAlpha.800' : "black"}
          bg={isActive ? "blue.500" : "bg.warning"}
          
        >
          {icon}
          <Text  color={isActive ?'whiteAlpha.800' : "black"}>

            {children}</Text>
        </Flex>
      )}
    </NavLink>
  );
};

export default Sidebar;