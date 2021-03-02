const commonConfig = require("./webpack.common")
const merge = require("webpack-merge");

const devConfig = {
    mode: "development",
    devtool: "cheap-module-eval-source-map",
    devServer: {
        contentBase: "./dist",
        open: true,
        port: 8089
    }
}

module.exports = merge(commonConfig, devConfig)