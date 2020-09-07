const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        main: "./src/index.js"
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: './dist',
        clientLogLevel: 'info',
        port: 8080
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Development",
            template: "./template.html"
        })
    ],
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
}