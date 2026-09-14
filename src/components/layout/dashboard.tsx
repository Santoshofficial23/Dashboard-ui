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
    <Flex minH="90vh" bg="bg.muted">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} />
      <Box
        ml={sidebarWidth}
        flex="1"
        minH="100vh"
        transition="margin-left 0.15s ease-in-out"
      >
        <Navbar
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((prev) => !prev)}
        />

        <Box minH="calc(100vh - 130px)" p={8}>
          <Outlet />
        </Box>

        <Footer />
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
