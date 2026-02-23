import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";
import { fixupPluginRules } from "@eslint/compat";

export default defineConfig([
    globalIgnores(["dist"]),
    {
        files: ["**/*.{js,jsx}"],
        extends: [js.configs.recommended, reactRefresh.configs.vite],
        plugins: {
            "react-hooks": fixupPluginRules(reactHooks),
            react: react,
        },
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: "latest",
                ecmaFeatures: { jsx: true },
                sourceType: "module",
            },
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            "no-unused-vars": "warn",
            "react/jsx-uses-vars": "error",
            "react/jsx-uses-react": "error",
        },
    },
]);
