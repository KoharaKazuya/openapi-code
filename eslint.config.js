import eslint from "@eslint/js";
import importEslint from "eslint-plugin-import";
import openAPICode from "openapi-code/eslint";
import tsEslint from "typescript-eslint";

export default tsEslint.config(
  {
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
  },
  eslint.configs.recommended,
  tsEslint.configs.recommended,
  importEslint.flatConfigs.recommended,
  importEslint.flatConfigs.typescript,
  openAPICode.configs.recommended,
  {
    rules: {
      "sort-imports": ["error", { ignoreDeclarationSort: true }],
      "import/order": ["error", { alphabetize: { order: "asc" } }],
      "import/consistent-type-specifier-style": ["error", "prefer-inline"],
      "import/no-duplicates": ["error", { "prefer-inline": true }],
    },
  },
);
