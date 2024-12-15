const globals = require('globals');
const pluginJs = require('@eslint/js');
const prettierConfig = require('eslint-config-prettier');
const eslintPluginPrettier = require('eslint-plugin-prettier');

/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  {
    // Match all JavaScript files for Node.js
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'module', // Use ES modules (if using imports/exports)
      globals: {
        ...globals.node // Add Node.js-specific global variables
      }
    },
    rules: {
      // Add custom ESLint rules if needed here
    }
  },
  {
    // Apply recommended ESLint rules from @eslint/js
    ...pluginJs.configs.recommended
  },
  {
    // Integrate Prettier to handle formatting and disable conflicting rules
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node // Node.js globals
      }
    },
    rules: {
      // Prettier rule for consistent code formatting
      'prettier/prettier': ['error']
    }
  },
  {
    // Add Prettier’s configuration to disable conflicting ESLint rules directly
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
    rules: {
      ...prettierConfig.rules // Directly include Prettier's rules
    }
  },
  {
    // Plugins in flat config need to be an object, not an array
    plugins: {
      prettier: eslintPluginPrettier // Specify the Prettier plugin as an object
    }
  },
  {
    // Ignore specific files or directories (like eslint.config.js)
    ignores: ['eslint.config.js'],
  }
];
