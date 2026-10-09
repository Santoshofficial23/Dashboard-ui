import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

import { colors } from "../tokens/color";
import { fonts } from "../tokens/font";
import { textRecipe } from "../recipes/textRecipe";
import { buttonRecipe } from "../recipes/buttonRecipe";
import { inputRecipe } from "../recipes/inputRecipe";

const config = defineConfig({
  theme: {
    tokens: {
      colors,
      fonts,
    },

    recipes: {
      button: buttonRecipe,
      input: inputRecipe,
      text: textRecipe,
    },
  },
});

export const system = createSystem(defaultConfig, config);
