# Rapid Replace
快速替换 npm 或者 yarn 安装的node module中的一些脚本文件

## 场景
一般情况下node moudle是项目安装的依赖包，但是有些时候会用到一些依赖项目，这些项目基本上能满足需求，但是有些情况下不能满足需求，就涉及到改动依赖项目的问题。如果是项目bug的话可以提PR给原来的项目，如果涉及一些私有的定制就会比较麻烦。
改动项目有几种方式:    
1. fork 一个项目，改完代码，提交交一个pr 坐等新版本
   需要周期很长，时间很难控制
2. fork一个项目，改完代码自己发布到npm
   需要改依赖的项目，不能同步新的版本
3. 直接替换node modules 对应的文件， Rapid Replace就是这种方式
   可以迅速替换需要改的文件，相应的改动跟随项目同步管理


## Rapid Replace优缺说明
优点:   
1. 不用提交代码到原项目，周期短
2. 不用修改项目名称
3. 每个项目都可以有不同的版本

缺点:
1. 项目管理起来复杂
2. 不能跟随原项目升级，或者说升级需要重新验证代码


## 使用说明

### 配置

1. 项目根目录下 

```
.rapid-replace.conf
{
    projects:[
        {
            type:'dir',// 暂时不支持目录配置
            project:'react-native',
            dir:'./rapid-replace/react-native/'
        },
        {
            type:'file',
            project:'react-native',
            files:[
                {
                    origin:'./local-cli/bundle/bundle.js',
                    new:'./rapid-replace/react-native/local-cli/bundle/bundle.js'
                },
                {
                    origin:'./local-cli/bundle/saveAssets.js',
                    new:'./rapid-replace/react-native/local-cli/bundle/saveAssets.js'
                }
            ]
        }
    ]
}
```

2. 项目根目录的package.json 文件

```
rapidReplaceConfig: {
    projects:[
        {
            type:'dir', // 暂时不支持目录配置
            project:'react-native',
            dir:'./rapid-replace/react-native/'
        },
        {
            type:'file',
            project:'react-native',
            files:[
                {
                    origin:'./local-cli/bundle/bundle.js',
                    new:'./rapid-replace/react-native/local-cli/bundle/bundle.js'
                },
                {
                    origin:'./local-cli/bundle/saveAssets.js',
                    new:'./rapid-replace/react-native/local-cli/bundle/saveAssets.js'
                }
            ]
        }
    ]
}

```

### 执行时机
在项目安装完成后执行

