# NodeJs 笔记

**npm命令安装**

- **本地安装路径** ：C:\Users\shilf\work\node_modules  
- **全局安装路径 -g** ： C:\Users\shilf\AppData\Roaming\npm\node_modules
- **npm install / npm i简介** ：  
**npm install X –save / npm install X -S**：   
>&emsp;&emsp;把X包安装到node_modules目录中，同时会在package.json的dependencies属性下添加X，之后运行npm install命令时，会自动安装X到node_modules目录中   

**npm install X –save-dev / npm install X -D**：  
>&emsp;&emsp;把X包安装到node_modules目录中，同时会在package.json的devDependencies属性下添加X之后运行npm install命令时，会自动安装X到node_modules目录中  

**总结**：  
>&emsp;&emsp;dependencies是运行时依赖，devDendencies是开发时依赖。正常使用npm install时，会下载dependencies和devDependencies中的模块，当使用npm install –production或者注明NODE_ENV变量值为production时，只会下载dependencies中的模块  
&emsp;&emsp;全局安装和本地安装的区别https://www.cnblogs.com/PeunZhang/p/5629329.html
- **nrm工具** ：npm i nrm -g， nrm是npm的镜像源管理工具，可以快速地在 npm 源间切换

**yarn命令安装**

- **本地安装路径** ：**C:\Users\shilf\node_modules**  
- **全局安装路 global** ：**C:\Users\shilf\AppData\Local\Yarn\Data\global\node_modules**

-------------------
**自动化构建工具** ：Gulp (grunt已经不用了）

gulp是基于Nodejs的自动任务运行器， 她能自动化地完成javascript/coffee/sass/less/html/image/css 等文件的的测试、检查、合并、压缩、格式化、浏览器自动刷新、部署文件生成，并监听文件在改动后重复指定的这些步骤。在实现上，她借鉴了Unix操作系统的管道（pipe）思想，前一级的输出，直接变成后一级的输入，使得在操作上非常简单。

-------------------
**打包工具**：

**webpack** 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

**babel** 是代码转换的（比如ES6 , .jsx , .vue , TypeScript转换为javascript）以及（Scss ， Less 转换为css）

**eslint** 是代码检查工具基本上目前也需要

目前 **webpack + babel** 就可以了


-------------------

**nvm**：nodeJs版本管理工具,管理nodejs版本和npm版本

**npm**：随同nodeJs一起安装的包管理工具，npm管理对应nodeJs的第三方插件

**yarn**：与**npm**类似，目前在后端两者都被普遍使用，不过好像更偏向于yarn

**bower**：与**npm** , **yarn**类似，更偏向前端包管理，目前好像很多人不偏向使用

**Yeoman**：脚手架工具（各种generator可以安装）

-------------------

**开发工具**:

**WebStorm** (首选编码工具) , **Vscode** (本人更喜欢)

调试使用npm或者webpack-dev-server启动本地服务，然后用**chrome**自带的调试工具调试，足矣


-------------------
从前端开发了解，一般是npm+webpack就可以搞定了