
const path = require('path');
const fs = require('fs');

const config = require('./config');


function getRapidReplaceConfig(rootPath){
    if(!rootPath){
        return;
    }
    const configFilePath = path.join(rootPath, path.sep, config.rapidConfigName); 
    const projectPackage = path.join(rootPath, path.sep, 'package.json'); 

    let rapidConfig = {};

    try {
        if(fs.existsSync(configFilePath)){
            const configContent = fs.readFileSync(configFilePath);
            rapidConfig = JSON.parse(configContent);
        }
        if(fs.existsSync(projectPackage)){
            const packageContent = fs.readFileSync(projectPackage);
            packageJson = JSON.parse(packageContent);
            if(packageJson.rapidConfig){
                rapidConfig = Object.assign({}, rapidConfig, packageJson.rapidConfig);
            }
        }
    } catch (error) {
        
    }finally {
        return rapidConfig;
    }
}

function getProjectRoot() {
    let projectRoot = '';
    const processCwd = process.cwd();
    const nodeModules = path.sep + 'node_modules' + path.sep;;
    const pos = processCwd.indexOf(nodeModules);
    if (pos < 0) {
        projectRoot = processCwd;
    }else{
        projectRoot =  processCwd.substring(0, pos);
    }

    if(!projectRoot){
        console.log('没有找到项目根目录！');
        return;
    }
    return projectRoot;
}


module.exports = {
    getRapidReplaceConfig: getRapidReplaceConfig,
    getProjectRoot: getProjectRoot,

};