import js from "@eslint/js";
import { globalIgnores } from "eslint/config";

export default [
  js.configs.recommended,
  {
    plugins: {
      extends: ["airbnb-base/legacy"]
    },
    languageOptions: {
      globals: {
        console: 'readonly',
      }
    }
  },
  globalIgnores(['dist/'])
];
