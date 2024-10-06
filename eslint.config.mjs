import js from "@eslint/js";
import prettierConfig from "@vue/eslint-config-prettier";
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import pluginCypress from "eslint-plugin-cypress/flat";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import pluginVue from "eslint-plugin-vue";

export default [
  {
    files: [
      "**/*.vue",
      "**/*.js",
      "**/*.jsx",
      "**/*.cjs",
      "**/*.mjs",
      "**/*.ts",
      "**/*.tsx",
      "**/*.cts",
      "**/*.mts",
    ],
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },

  // eslint default
  js.configs.recommended,

  // eslint-plugin-vue
  ...pluginVue.configs["flat/recommended"],

  // @vue/eslint-config-typescript
  ...vueTsEslintConfig(),

  // eslint-plugin-cypress
  pluginCypress.configs.recommended,

  // @vue/eslint-config-prettier
  prettierConfig,
];
