import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import lit from "eslint-plugin-lit";
import wc from "eslint-plugin-wc";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": ts,
      lit,
      wc,
    },
    rules: {
      ...ts.configs.recommended.rules,
      ...lit.configs.recommended.rules,
      ...wc.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "warn",
      "lit/no-invalid-html": "error",
      "lit/no-useless-template-literals": "error",
    },
  },
  {
    files: ["wordpress/assets/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
        wp: "readonly",
      },
      ecmaVersion: "latest",
      sourceType: "script",
    },
    rules: {
      "no-undef": "error",
    },
  },
];