import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/layout/sidebar";
import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";

const DashboardLayout = () => {
  return (
    <Flex minH="100vh" bg="bg.muted">
      <Sidebar />
      <Box
        ml="250px"
        flex="1"
        minH="100vh"
      >
        <Navbar />
        <Box
          minH="calc(100vh - 130px)"
          p={8}
        >
          <Outlet />
        </Box>

        <Footer />
      </Box>
    </Flex>
  );
};

export default DashboardLayout;