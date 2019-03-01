const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    mode: "production",

    entry: {
        app: [
            "babel-polyfill",
            "./src/assets/js/app.js",
            "./src/assets/js/analytics"
        ]
    },
    output: {
        filename: "[name]-[contenthash].js",
        path: path.resolve(__dirname, "../dist")
    },

    plugins: [
        new CleanWebpackPlugin([ "dist" ], {
            root: path.resolve(__dirname, ".."),
            verbose: true,
            dry: false
        }),
        new MiniCssExtractPlugin({
            filename: "[name]-[contenthash].css"
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            }
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new CompressionPlugin({
          algorithm: 'gzip'
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
                    name: '[path][name]-[hash].[ext]',
                    context: 'src/assets'
                }}
            ]
        }]
    }
};