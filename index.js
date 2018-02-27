const fs = require('fs');
const path = require('path');

const config = require('./lib/config');
const rapidReplace = require('./lib/rapid-replace');

let projectRoot = rapidReplace.getProjectRoot();

if (!projectRoot) {
    console.log('没有找到项目根目录');
    return;
}

const rapidConfig = rapidReplace.getRapidReplaceConfig(projectRoot);

console.log('当前的配置内容：', rapidConfig);

try {
    if (!fs.existsSync(rapidDir)) {
        fs.mkdirSync(rapidDir);


    } else {
        console.log('项目文件已存在！');
    }
} catch(e) {
    console.log(e);
}



console.log(`${rapidDir} 成功创建！`)
console.log('__dirname:',__dirname);
console.log('cwd:',process.cwd());
console.log('========hello word： from rapid replace');