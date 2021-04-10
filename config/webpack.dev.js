const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",

    entry: {
        app: [
            "@babel/polyfill",
            "@babel/runtime/regenerator",
            "./src/assets/js/app.js"
        ]
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: ''
    },

    plugins: [
        new CleanWebpackPlugin({
            verbose: false,
            dry: false
        }),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new CopyPlugin({ patterns: [
            // Need to copy this file to prevent from hash adding to filename
            // /!\ No hashes exists in development mode but i prefer have same configuration if possible for both mode
            // development and production
            { from: "src/assets/images/myriadata/logo_carre_transparence_web.png",
                to: "images/myriadata/logo_carre_transparence_web.png" }
        ]})
    ],

    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"]
                }
            }],
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
                { loader: "css-loader", options: { url: true } },
                { loader: "postcss-loader" },
                { loader: "less-loader" }
            ]
        },{
            test: /\.html$/,
            use: [
                { loader: "html-loader", options: {
                    esModule: false,
                    sources: {
                        list: [
                            { tag: 'img', attribute: 'src', type: 'src' },
                            { tag: 'link', attribute: 'href', type: 'src' } ] } } }
            ]
        },{
            test: /\.(jpg|jpeg|png)$/,
            use: [
                { loader: "file-loader", options: {
                    name: "[path][name].[ext]",
                    context: "src/assets",
                    esModule: false
                }}
            ]
        },{
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    outputPath: "fonts/"
                }
            }]
        }]
    },

    devtool: "source-map"
};
