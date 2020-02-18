const fs = require('fs');
const { copyFile } = fs.promises;

copyFile(`${__dirname}/package.json`, `${__dirname}/build/package.json`);
copyFile(`${__dirname}/README.md`, `${__dirname}/build/README.md`);
