
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
            const configContent = fs.readFileSync(configFilePath, {
                encoding:'utf8'
            });
            rapidConfig = JSON.parse(configContent);
        }
        if(fs.existsSync(projectPackage)){
            const packageContent = fs.readFileSync(projectPackage, {
                encoding:'utf8'
            });
            const packageJson = JSON.parse(packageContent);
            if(packageJson.rapidConfig){
                rapidConfig = Object.assign({}, rapidConfig, packageJson.rapidConfig);
            }
        }
    } catch (error) {
        console.log('rapid error:', error);
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

function replaceFile(originFile, newFile, mode){
    // replace
    try{
        if(fs.existsSync(originFile) && fs.existsSync(newFile)){
            // backup origin file
            // fs.renameSync();
            // 删除原文件
            fs.unlinkSync(originFile);
            // 复制新文件
            fs.createReadStream(newFile, { mode: mode && 0o666, }).pipe(fs.createWriteStream(originFile));
            // fs.rename(newFile, originFile);
            console.log('文件替换完成：',newFile, originFile);
        }
    }catch(e){
        console.log(e);
    }finally{

    }
}

function processFiles(projectRoot, npmProject, files){
    files.forEach((file, idx) => {
        if(file.new && file.origin) {
            const newFile = path.join(projectRoot, path.sep, file.new);
            replaceFile(path.join(npmProject, path.sep, file.origin), newFile, file.permission);
        }
    });
}

function processDir(projectRoot, npmProject, dir){
    const dirPath = path.join(projectRoot, path.sep, dir);
    if(fs.existsSync(dirPath)){
        let fileList = fs.readdirSync(dirPath);
        fileList.forEach((relFile) => {
            const newFile = path.join(projectRoot, path.sep, dir, path.sep, relFile);

            const originFile = path.join(npmProject, path.sep, relFile);
            
            replaceFile(originFile, newFile);
        });
    }
}

// 处理项目一一替换对应的文件
function processProject(projectConfig, rootPath){
    if(!projectConfig.projects){
        return;
    }
    const projects = projectConfig.projects;
    projects.forEach((project, idx) => {
        if(!project.name){
            return;
        }
        
        let projectDir = path.join(rootPath, path.sep, 'node_modules', path.sep, project.name);
        try{
            if(!fs.existsSync(projectDir)){
                console.log('rapid replace: 项目不存在');
                return;
            }
        }catch(e){
            console.log(e);
        }

        if(project.type === 'file' && project.files){
            processFiles(rootPath, projectDir, project.files);
        }else if(project.type === 'dir' && project.dir){
            // processDir(rootPath, projectDir, project.dir);
        }
    });
    console.log('项目处理完成！');
}

module.exports = {
    getRapidReplaceConfig: getRapidReplaceConfig,
    getProjectRoot: getProjectRoot,
    processProject: processProject,
};