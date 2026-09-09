import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  base: {
    fontWeight: "600",
    borderRadius: "md",
    cursor: "pointer",
  },

  variants: {
    variant: {
      primary: {
        bg: "brand.500",
        color: "white",

        _hover: {
          bg: "brand.600",
        },
      },

      secondary: {
        bg: "gray.200",
        color: "gray.900",

        _hover: {
          bg: "gray.300",
        },
      },

      danger: {
        bg: "danger.500",
        color: "white",
      },
    },

    size: {
      sm: {
        h: "8",
        px: "3",
        fontSize: "sm",
      },

      md: {
        h: "10",
        px: "4",
        fontSize: "md",
      },

      lg: {
        h: "12",
        px: "6",
        fontSize: "lg",
      },
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});