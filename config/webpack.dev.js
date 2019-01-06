const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    mode: "development",

    entry: {
        app: [
            "babel-polyfill",
            "./src/assets/js/app.js"
        ]
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "../dist")
    },

    plugins: [
        new CleanWebpackPlugin([ "dist" ], {
            root: path.resolve(__dirname, ".."),
            verbose: true,
            dry: false
        }),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],

    module: {
        rules: [{
            test: /\.js$/,
            use: [
                { loader: "babel-loader" }
            ],
            exclude: /node_modules/
        },{
            test: /\.css$/,
            use: [
                { loader: MiniCssExtractPlugin.loader },
                { loader: "css-loader" },
                { loader: "postcss-loader" }
            ]
        },{
            test: /\.(sass|scss)$/,
            use: [
                { loader: MiniCssExtractPlugin.loader },
                { loader: "css-loader" },
                { loader: "postcss-loader" },
                { loader: "sass-loader" }
            ]
        },{
            test: /\.less$/,
            use: [
                { loader: MiniCssExtractPlugin.loader },
                { loader: "css-loader" },
                { loader: "postcss-loader" },
                { loader: "less-loader" }
            ]
        },{
            test: /\.html$/,
            use: [
                { loader: "html-loader", options: { attrs: ["img:src"] } }
            ]
        },{
            test: /\.(jpg|jpeg|png)$/,
            use: [
                { loader: "file-loader", options: {
                    outputPath: (url, resourcePath) => {
                        var tabPath = resourcePath.split('/');
                        var assetsIndex = tabPath.indexOf('assets');
                        var outputPathTab = tabPath.slice(assetsIndex + 1, tabPath.length);
                        return outputPathTab.join('/');
                    }}
                }
            ]
        }]
    },

    devServer: {
        contentBase: "dist",
        overlay: true
    },
    devtool: "source-map"
};