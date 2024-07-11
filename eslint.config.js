import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react";
import eslintPluginAstro from "eslint-plugin-astro";
import vitest from "eslint-plugin-vitest";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  {
    // Prettier plugin config
    ...eslintPluginPrettierRecommended,
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    rules: {
      "prettier/prettier": [
        "warn",
        {
          singleQuote: true,
          jsxSingleQuote: true,
          trailingComma: "es5",
          semi: false,
          arrowParens: "avoid",
          endOfLine: "crlf",
        },
      ],
    },
  },
  {
    languageOptions: { globals: globals.browser },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
      "react/react-in-jsx-scope": "off", // react can handle it
      "no-trailing-spaces": "warn",
    },
  },
  pluginJs.configs.recommended,
  {
    // React plugin config
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    plugins: {
      pluginReactConfig,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      // ... any rules you want
    },
    // ... others are omitted for brevity
  },
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.all,
  {
    // Testing config
    files: ["src/__test__/**/*"], // or any other pattern
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "off",
    },
    settings: {
      vitest: {
        typecheck: true,
      },
    },
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
  },
  {
    // Astro config
    files: ["src/**/*.astro"],
    rules: {
      "react/no-unknown-property": "off", // disable react rules on astro files
    },
  },
];
