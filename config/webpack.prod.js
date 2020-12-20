const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');

module.exports = {
    mode: "production",

    entry: {
        app: [
            "@babel/polyfill",
            "./src/assets/js/app.js"
        ]
    },
    output: {
        filename: "[name]-[contenthash].js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: ''
    },

    plugins: [
        new CleanWebpackPlugin({
            verbose: true,
            dry: false
        }),
        new MiniCssExtractPlugin({
            filename: "[name]-[contenthash].css"
        }),
        new HtmlWebpackPartialsPlugin({
            path: path.join(__dirname, '../src/partials/analytics.html'),
            priority: 'high',
            location: 'head'
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new CompressionPlugin({
            filename: "[path][base].gz",
            algorithm: "gzip"
        }),
        new CompressionPlugin({
            filename: "[path][base].br",
            algorithm: "brotliCompress"
        }),
        new CopyPlugin({ patterns: [
            // Need to copy this file to prevent from hash adding to filename
            { from: "src/assets/images/myriadata/logo_carre_transparence_web.png",
                to: "images/myriadata/logo_carre_transparence_web.png" }
        ]})
    ],

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin({
                minimizerOptions : {
                    preset: [
                        'default',
                        { discardComments: { removeAll: true } }
                    ]
                }
            })
        ]
    },

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
                { loader: "html-loader", options: { attributes: { list: [
                    { tag: 'img', attribute: 'src', type: 'src' },
                    { tag: 'link', attribute: 'href', type: 'src' } ] } } }
            ]
        },{
            test: /\.(jpg|jpeg|png)$/,
            use: [
                { loader: "file-loader", options: {
                    name: "[path][name]-[hash].[ext]",
                    context: "src/assets",
                        esModule: false
                }}
            ]
        },{
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
                loader: "file-loader",
                options: {
                    name: "[name]-[hash].[ext]",
                    outputPath: "fonts/"
                }
            }]
        }]
    }
};
