import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import openAPICode from "openapi-code/eslint";

const compat = new FlatCompat();

/** @type { import("eslint").Linter.FlatConfig[] } */
export default [
  {
    languageOptions: {
      parser: tsParser,
    },
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
  },
  js.configs.recommended,
  ...compat.extends(
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ),
  openAPICode.configs.recommended,
  {
    rules: {
      "sort-imports": ["error", { ignoreDeclarationSort: true }],
      "import/order": ["error", { alphabetize: { order: "asc" } }],
      "import/consistent-type-specifier-style": ["error", "prefer-inline"],
      "import/no-duplicates": ["error", { "prefer-inline": true }],
      "import/no-unresolved": "off",
    },
  },
];
