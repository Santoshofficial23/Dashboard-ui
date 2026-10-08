import InputField from "../../components/input";
import { Button, Box, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

type FormValues = {
  Firstname: string;
  email: string;
};
const PractisePage = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      Firstname: "",
      email: "",
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { isDirty, dirtyFields, errors },
  } = methods;
  console.log(errors)
  const Firstname = watch("Firstname");
  const onSubmit = (data: FormValues) => {
    console.log(data);
    localStorage.setItem("formData", JSON.stringify(data))
    // console.log("saved data", localStorage.getItem("formData"))
  };

  return (
    <>
        <Box  h={400}
        w={400}
        bg={"white.200"}
        border="2px solid gray"
        borderRadius={8}
        p={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              name="Firstname"
              type="text"
              label="Name"
              control={control}
            />

            <InputField
              name="email"
              type="email"
              label="Email"
              control={control}
              disabled={!Firstname}
            />

            {dirtyFields.email && <Text> Firstname changed</Text>}
            {isDirty && <Text> Saved the changes </Text>}

            <Button type="submit" disabled={!isDirty}> Save </Button>
          </form>
        </Box>
    </>
  );
};

export default PractisePage;
