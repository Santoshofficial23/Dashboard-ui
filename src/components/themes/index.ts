import {
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";

import { colors} from "../tokens/color";
import { fonts } from "../tokens/font";
import {textRecipe} from "../recipes/text.recipe";
import {buttonRecipe} from "../recipes/button.recipe";
import { inputRecipe } from "../recipes/input.recipe";

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