import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/layout/sidebar";
import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? "0px" : "250px";

  return (
    <Flex h="100vh" overflow="hidden" bg="bg.muted">
      <Sidebar collapsed={collapsed} />

      <Box
        ml={sidebarWidth}
        flex="1"
        h="100vh"
        display="flex"
        flexDirection="column"
        overflow="hidden"
        transition="margin-left 0.15s ease-in-out"
      >
        <Navbar
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((prev) => !prev)}
        />

        <Box flex="1" minH="0" p={4}>
          <Outlet />
        </Box>

        <Footer />
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
