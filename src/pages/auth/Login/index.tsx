import type { LoginFormData } from "@/types/type";
import InputField from "../../../components/input";
import { Image, Box, Button, Flex, Text, Checkbox } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useLogin } from "../../../components/hooks/auth/useLogin";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../schemas/auth.schema";
import sastoLoanLogo from "../../../assets/logo/sastoloan_logo.png";
import { useEffect, useState } from "react";

const BGImage =
  "https://i.pinimg.com/1200x/4f/0b/a4/4f0ba4cdd7fda6043c4f93c927631510.jpg";

const Loginpage = () => {
  const [rememberme, Setrememberme] = useState(false);

  const { control, handleSubmit, reset } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const loginMutation = useLogin();

  useEffect(() => {
    const savedusername = localStorage.getItem("username");
    const savedpassword = localStorage.getItem("password");
    if (savedusername && savedpassword) {
      // Setrememberme(true);

      reset({
        username: savedusername,
        password: savedpassword,
      });
    }
  }, [reset]);

  const onSubmit = (data: LoginFormData) => {
    if (rememberme) {
      localStorage.setItem("username", data.username);
      localStorage.setItem("password", data.password);
    }
    loginMutation.mutate(data);
  };
  return (
    <Flex
      bgImage={`url(${BGImage})`}
      bgSize="cover"
      justify="center"
      bgRepeat="no-repeat"
      justifyContent="center"
      alignItems="center"
      p={10}
      h="100vh"
      w="100vw"
    >
      <Box
        bg="white"
        w="full"
        maxW="600px"
        p={20}
        pt={20}
        borderRadius={8}
        boxShadow={"lg"}
      >
        <Image
          src={sastoLoanLogo}
          alt="Sasto Loan Logo"
          display="block"
          maxW="220px"
          maxH="100px"
          objectFit="contain"
          mb={6}
        />
        <Text fontWeight={"bold"} fontSize={"2xl"} mb={2}>
          Welcome to Sasto Loan
        </Text>
        <Text mb={10}> Secure access to manage operations.</Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            control={control}
            name="username"
            type="text"
            label="Username"
            placeholder="Enter Email"
          />
          <InputField
            control={control}
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
          />
          <Checkbox.Root
            checked={rememberme}
            onCheckedChange={(details) => {
              Setrememberme(!!details.checked);
            }}
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>Remember me</Checkbox.Label>
          </Checkbox.Root>
          <Box mt={4}>
            <Button
              type="submit"
              bg={"purple.600"}
              ml={28}
              w={52}
              loading={loginMutation.isPending}
            >
              Sign In
            </Button>
          </Box>
        </form>
      </Box>
    </Flex>
  );
};

export default Loginpage;
