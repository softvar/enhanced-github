const fs = require('fs');
const path = require('path');

// Load the desired config file based on the environment
const env = process.env.TSRC_EXT_NODE_ENV || 'devLocal';
const configFilePath = path.join(__dirname, `config.${env}.json`);
const config = require(configFilePath);

// Generate a JavaScript file with the required variables
const configJs = `const CONFIG = ${JSON.stringify(config)};
module.exports = CONFIG;`;
fs.writeFileSync(path.join(__dirname, 'src', 'config.js'), configJs);

console.log()
console.log('\033[1mturbosrc build mode:\033[0m \033[33m%s\033[0m', env);
console.log()
console.log('config file:', configFilePath)
console.log('# Begin config file contents')
console.log(configJs)
console.log('# End')