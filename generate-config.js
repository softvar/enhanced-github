const fs = require('fs');
const path = require('path');

// Load the desired config file based on the environment
const env = process.env.NODE_ENV || 'development';
const configFilePath = path.join(__dirname, `config.${env}.json`);
const config = require(configFilePath);

// Generate a JavaScript file with the required variables
const configJs = `const CONFIG = ${JSON.stringify(config)};
module.exports = CONFIG;`;
fs.writeFileSync(path.join(__dirname, 'src', 'config.js'), configJs);