import {
  Box,
  Button,
  HStack,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useForm, useWatch } from "react-hook-form";
import InputField from "../../components/input";
import CommonDrawer from "../../components/Drawer/Commondrawer";
import { MODULE_TYPE_EXPENSE, type ExpenseFormData } from "../../types/type";
import Multiselect from "../../components/multiselect/Multiselect";
import SelectField from "../../components/select/SelectField";
import { yupResolver } from "@hookform/resolvers/yup";
import { ExpenseSchema } from "../../schemas/expense.schema";
import Datepicker from "../../components/ui/date-picker";

type ExpenseDrawerProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (data: ExpenseFormData) => void;
};

const defaultExpense: ExpenseFormData = {
  title: "",
  amount: 0,
  type: MODULE_TYPE_EXPENSE.EXPENSE,
  category: "",
  date: "",
  descriptions: "",
};

const ExpenseDrawer = ({ open, onClose, onAdd }: ExpenseDrawerProps) => {
  const { control, handleSubmit, reset } = useForm<ExpenseFormData>({
    resolver: yupResolver(ExpenseSchema),
    defaultValues: defaultExpense,
  });
  const moduleType = useWatch({ control, name: "type" });

  const handleClose = () => {
    reset(defaultExpense);
    onClose();
  };

  const handleClear = () => {
    reset(defaultExpense);
  };

  const onSubmit = (data: ExpenseFormData) => {
    onAdd(data);

    reset(defaultExpense);
    onClose();
  };

  return (
    
    <CommonDrawer
      title="Add Expenses and Income Details"
      size="lg"
      placement="end"
      open={open}
      onClose={handleClose}
      footer={
        <HStack justify="flex-end" gap={4} w="full">
          <Button variant="outline" type="button" onClick={handleClear}>
            Clear
          </Button>

          <Button bg="blue.700" color="white" type="submit" form="expense-form">
            Submit
          </Button>
        </HStack>
      }
    >
      <Box as="form" id="expense-form" onSubmit={handleSubmit(onSubmit)} p={6} >
        <Stack gap={5}>
          <Stack gap={5}>
            <HStack gap={6}>
              
              <Box flex={1}>
                <InputField
                  name="title"
                  control={control}
                  label="Title"
                  placeholder="Enter Title"
                />
              </Box>

              <Box flex={1}>
                <InputField
                  name="amount"
                  control={control}
                  label="Amount"
                  type="number"
                  placeholder="500"
                />
              </Box>
            </HStack>
           
              <SelectField
                name="type"
                width="574px"
                control={control}
                label="Transaction Type"
                options={Object.entries(MODULE_TYPE_EXPENSE).map(
                  ([, value]) => ({
                    label: value,
                    value,
                  }),
                )}
                placeholder="Select transaction type"
              />
            
            <Box flex={1} mt={4}>
              <Multiselect
                name="category"
                control={control}
                type={moduleType}
                label="Category"
              />
            </Box>

            <Box flex={1} mt={4}>
              <Datepicker name="date" control={control} label="Date" />
            </Box>

            <Box mt={4}>
              <InputField
                type="textarea"
                name="descriptions"
                control={control}
                label="Description"
                height="120px"
                placeholder="Enter expense description"
                textarea
              />
            </Box>
              <Separator mt={24} color={'blackAlpha.200'}/>
          </Stack>
        
        </Stack>
      </Box>
    </CommonDrawer>
   
  );
};

export default ExpenseDrawer;
