module.exports = {
  root: true,

  env: {
    es6: true,
  },

  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "eslint-config-prettier",
  ],

  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },

  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jest/recommended",
      ],
      rules: {
        "unused-imports/no-unused-imports": "error",
        "react/no-children-prop": "off",
        "react/react-in-jsx-scope": "off",
        "prettier/prettier": 1,
      },
      plugins: [
        "@typescript-eslint",
        "eslint-plugin-prettier",
        "jest",
        "unused-imports",
      ],
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
    {
      files: [".eslintrc.cjs", "vite.config.ts"],
      env: { node: true, "jest/globals": true },
    },
    {
      files: ["*.cjs"],
      parserOptions: { sourceType: "script" },
    },
  ],

  ignorePatterns: ["/build", "/.git", "/.cache"],

  settings: {
    "import/resolver": {
      typescript: {
        project: ["tsconfig.json"],
      },
    },
    "import/core-modules": ["__STATIC_CONTENT_MANIFEST"],
    react: {
      version: "detect",
    },
  },
};
