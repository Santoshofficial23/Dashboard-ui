import { defineRecipe } from "@chakra-ui/react";

export const inputRecipe = defineRecipe({
  base: {
    width: "100%",
    borderWidth: "1px",
    borderColor: "gray.300",
    borderRadius: "md",
    outline: "none",

    _focus: {
      borderColor: "brand.500",
      boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
    },

    _disabled: {
      bg: "gray.100",
      cursor: "not-allowed",
    },
  },

  variants: {
    variant: {
      outline: {
        bg: "white",
      },

      filled: {
        bg: "gray.100",
        borderColor: "transparent",
      },
    },

    size: {
      sm: {
        h: "8",
        fontSize: "sm",
        px: "3",
      },

      md: {
        h: "10",
        fontSize: "md",
        px: "3",
      },

      lg: {
        h: "12",
        fontSize: "lg",
        px: "4",
      },
    },
  },

  defaultVariants: {
    variant: "outline",
    size: "md",
  },
});