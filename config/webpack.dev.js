const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");


module.exports = {
    mode: "development",

    entry: {
        app: [
            "babel-polyfill",
            "./src/assets/js/app.js"
        ]
    },
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, "../dist")
    },

    plugins: [new CleanWebpackPlugin(
        [ "dist" ],
        {
            root: path.resolve(__dirname, ".."),
            verbose: true,
            dry: false
        }
    )],

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
                { loader: "style-loader" },
                { loader: "css-loader" },
                { loader: "postcss-loader" }
            ]
        },{
            test: /\.(sass|scss)$/,
            use: [
                { loader: "style-loader" },
                { loader: "css-loader" },
                { loader: "postcss-loader" },
                { loader: "sass-loader" }
            ]
        },{
            test: /\.less$/,
            use: [
                { loader: "style-loader" },
                { loader: "css-loader" },
                { loader: "postcss-loader" },
                { loader: "less-loader" }
            ]
        },{
            test: /\.html$/,
            use: [
                { loader: "file-loader", options: { name: "[name].html" } },
                { loader: "extract-loader" },
                { loader: "html-loader", options: { attrs: ["img:src"] } }
            ]
        },{
            test: /\.(jpg|jpeg|png)$/,
            use: [
                { loader: "file-loader", options: { name: "images/[name].[ext]", } }
            ]
        }]
    },

    devServer: {
        contentBase: "dist",
        overlay: true
    },
    devtool: "source-map"
};