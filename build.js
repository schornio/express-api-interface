const fs = require('fs');
const { copyFile } = fs.promises;

copyFile(`${__dirname}/package.json`, `${__dirname}/build/package.json`);
