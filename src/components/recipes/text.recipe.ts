import { defineRecipe } from "@chakra-ui/react";

export const textRecipe = defineRecipe({
  base: {
    fontFamily: "body",
  },

  variants: {
    variant: {
      body: {
        fontSize: "md",
        color: "gray.700",
      },

      muted: {
        fontSize: "sm",
        color: "gray.500",
      },

      label: {
        fontSize: "sm",
        fontWeight: "600",
        color: "gray.700",
      },

      heading: {
        fontSize: "2xl",
        fontWeight: "700",
        color: "gray.900",
      },

      error: {
        fontSize: "sm",
        color: "danger.500",
      },

      success: {
        fontSize: "sm",
        color: "success.500",
      },
    },

    size: {
      sm: {
        fontSize: "sm",
      },

      md: {
        fontSize: "md",
      },

      lg: {
        fontSize: "lg",
      },

      xl: {
        fontSize: "xl",
      },
    },
  },

  defaultVariants: {
    variant: "body",
    size: "md",
  },
});