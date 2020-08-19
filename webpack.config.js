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
            // The title of the html file
            title: "Development",
            // template for the html
            template: "./html.template"
        })
    ],
    output: {
        // the file name we bundle into
        filename: "[name].bundle.js",
        // the directory we bundle into
        path: path.resolve(__dirname, "dist")
    },
}