import type { LoginFormData} from "@/types/type";
import InputField from "../../../components/input";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useLogin } from "../../../components/hooks/auth/useLogin";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../schemas/auth.schema";

const Loginpage = () => {
  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
 const loginMutation = useLogin();

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  }

  return (
      <Flex justify={"center"} alignItems={"center"} p={10} border={8} borderRadius={8} h='100vh' >
        <Box 
        bg={"blue.500"} w={600} p={20} pt={20}>
          <Text fontWeight={"bold"} fontSize={"4xl"}>
           Login
          </Text>
          <Text mb={10}> Welcome back, Please login to your account.</Text>
            <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            control={control}
            name = 'username'
            type="text"
            label="username"
            placeholder="Enter Email"
          />
           <InputField
            control={control}
            name='password'
            type="text"
            label="password"
            placeholder="Password"
          />
           <Button type="submit" bg={'black'} ml={40} w={36}
           loading={loginMutation.isPending}
           >
             Login
           </Button>
          </form>
        </Box>
      </Flex>
      
  );
};

export default Loginpage;
