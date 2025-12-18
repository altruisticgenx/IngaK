import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "node_modules", "*.config.js", "*.config.ts"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // === React Hooks - Federal-grade strictness ===
      ...reactHooks.configs.recommended.rules,
      "react-hooks/exhaustive-deps": "error",
      "react-hooks/rules-of-hooks": "error",
      
      // React Refresh
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      
      // === TypeScript - High security standard ===
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/prefer-optional-chain": "warn",
      
      // === Security hardening ===
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
      "no-script-url": "error",
      
      // === Code quality & correctness ===
      "eqeqeq": ["error", "always"],
      "no-console": ["warn", { allow: ["warn", "error", "debug"] }],
      "prefer-const": "error",
      "no-var": "error",
      "curly": ["error", "all"],
      "no-throw-literal": "error",
      "no-return-await": "warn",
      "no-await-in-loop": "warn",
      
      // === Best practices ===
      "no-nested-ternary": "warn",
      "no-unneeded-ternary": "error",
      "object-shorthand": ["error", "always"],
      "prefer-arrow-callback": "error",
      "prefer-template": "warn",
    },
  },
);
