import { Box} from "@chakra-ui/react";
import BankTable from "./bankTable";


const Bankpage = () => {
  return (
    <Box>
      {/* <Text fontWeight={"bold"}> Bank setup</Text>
      <Text> Manage your bank from here</Text> */}
      <BankTable/>
    </Box>
  );
};

export default Bankpage;
