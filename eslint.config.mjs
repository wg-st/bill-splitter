import { defineConfig, globalIgnores } from "eslint/config";
import { fixupConfigRules } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([
    globalIgnores(["**/build/", "**/dist/", "**/node_modules/"]),
    js.configs.recommended,
    ...fixupConfigRules(compat.extends("plugin:react/recommended")),
    {
        settings: {
            react: {
                version: "detect"
            }
        }
    }
]);