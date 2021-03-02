const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//devlopment vs Production 区分模式打包 npm install webpack-merge -D
module.exports = {
    mode: "development", //production
    entry: "./index.js",
    output: {
        //path:path.resolve("F:\ThreeJs\threejspro\build")
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    devtool: "cheap-module-eval-source-map",
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html'
        }),
    ],
    module: {
        rules: [{
            test: /\.(png|jpe?g|gif)$/,
            use: {
                loader: "file-loader",
                options: {
                    outputPath: 'img/'
                }
            }
        }]
    },
    devServer: {
        contentBase: "./dist",
        open: true,
        port: 8089
    }
}