import { Box, Text } from "@chakra-ui/react";

type SummaryCardprops = {
  title: string;
  value?: string;
  color?: string;
  borderColor: string;
  bg: string;
};

const Dashcard = ({
  title,
  value,
  color,
  borderColor,
  bg,
}: SummaryCardprops) => {
  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="xl"
      flex="1"
      minW="90px"
      h={90}
      color={color}
      bg={bg}
      borderColor={borderColor}
      boxShadow="sm"
      transition="all 0.2s"
      _hover={{
        boxShadow: "md",
        transform: "translateY(-2px)",
      }}
    >
      <Text color="gray.500" fontSize="sm" fontWeight="medium">
        {title}
      </Text>

      <Text mt={1} fontSize="2xl" fontWeight="bold" color="gray.800">
        {value}
      </Text>
    </Box>
  );
};

export default Dashcard;
