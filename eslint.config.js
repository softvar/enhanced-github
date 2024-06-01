// const globals = require('globals');
const pluginJs = require('@eslint/js');
const prettierConfig = require('eslint-config-prettier');

module.exports = [{
  languageOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
    globals: {
      require: 'readonly',  // Declare 'require' as a global variable
      document: 'readonly',
      window: 'readonly',
      local: 'readonly',
      URL: 'readonly',
      setTimeout: 'readonly',
      setInterval: 'readonly',
      clearInterval: 'readonly',
      module: 'readonly'
    }
  },
},
pluginJs.configs.recommended,
prettierConfig
];
