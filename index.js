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

try {
    rapidReplace.processProject(rapidConfig, projectRoot);
} catch(e) {
    console.log(e);
}
