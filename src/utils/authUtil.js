const fs = require('fs').promises;

async function getAuthContributor() {
    const fsPromises = require('fs').promises;
    const data = await fsPromises.readFile('../../mock_contributor')
                       .catch((err) => console.error('Failed to read file', err));

    return data;
}

//const data = await getAuthContributor();
//console.log(data.toString())

module.exports.getAuthContributor = getAuthContributor;