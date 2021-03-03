//提示发生errno 126权限问题时，清除缓存并重装webpack环境
rm -rf node_modules
rm package-lock.json
npm cache clear --force
npm install

//webpack环境安装配置
npm install webpack@4 webpack-cli@3 -D
npm i -s -d html-webpack-plugin
npm install webpack-dev-server -D
npm install file-loader -D
npm install webpack-merge -D

//devlopment vs production 区分模式打包
    "scripts": {
        "bundle": "webpack --config ./build/webpack.dev.js",
        "build": "webpack --config ./build/webpack.prod.js",
        "server": "webpack-dev-server --config ./build/webpack.dev.js"
    },

//生成 package.json指令： npm init -y  生成 package.json
//源代码与打包后的代码的映射关系:source-Map
//cheap-module-eval-source-map 开发环境配置推荐*
//cheap-module-source-map 线上环境配置推荐
//source-map 方便寻找错误，可以快速定位到错误发生位置
