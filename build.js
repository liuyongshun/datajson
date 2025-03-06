const fs = require('fs');
const path = require('path');
const json2md = require("json2md");
const allData = require('./src/index.js');
const { rimrafSync } = require('rimraf');


const jsonMkDownList = [];
const typekeys = Object.keys(allData);

const createFile = (file = './README.md', content) => {
    const dir = path.dirname(file);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(file, content, 'utf8');
}

typekeys.forEach(item => {
    const subItem = allData[item];
    const subKyeys = Object.keys(subItem);
    jsonMkDownList.push({
        h3: item
    });
    jsonMkDownList.push({
        ul: [subKyeys.map(ssItem => {
            return [ssItem + ": " + subItem[ssItem].link, {
                ul: subItem[ssItem].desc
            }]
        })],
    });
});

rimrafSync('./docs');

createFile('./docs/res.md', json2md(jsonMkDownList));
createFile('./dist/index.json5', JSON.stringify(allData));