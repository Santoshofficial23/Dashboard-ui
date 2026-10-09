import InputField from "../../components/input";
import { Button, Box, Separator } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

type FormValues = {
  Firstname: string;
  Address: string;
  email: string;
  contact: number;
};
const DefaultValues = {
  Firstname: "",
  Address: "",
  email: "",
  contact: 0,
};
const PractisePage = () => {
  const methods = useForm<FormValues>({});

  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { isDirty, errors },
  } = methods;

  console.log(errors);
  const Firstname = watch("Firstname");
  const Address = watch("Address");
  const Email = watch("email");
  const onSubmit = (data: FormValues) => {
    console.log(data);
    localStorage.setItem("formData", JSON.stringify(data));
    reset(DefaultValues);
    // console.log("saved data", localStorage.getItem("formData"))
  };

  return (
    <>
      <Box
        h={440}
        w={400}
        bg={"white.200"}
        border="2px solid gray"
        borderRadius={8}
        p={8}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            name="Firstname"
            type="text"
            label="Name"
            control={control}
          />
          <InputField
            name="Address"
            type="text"
            label="Address"
            control={control}
            disabled={!Firstname}
          />

          <InputField
            name="email"
            type="email"
            label="Email"
            control={control}
            disabled={!Address}
          />
          <InputField
            name="contact"
            type="text"
            label="Contact"
            control={control}
            disabled={!Email}
            maxLength={10}
          />

          {/* 
            {dirtyFields.email && <Text> Firstname changed</Text>}
            {isDirty && <Text> Saved the changes </Text>} */}
          <Separator size={"md"} />
          <Button type="submit" disabled={!isDirty} mt={4}>
            {" "}
            Save{" "}
          </Button>
        </form>
      </Box>
    </>
  );
};

export default PractisePage;
