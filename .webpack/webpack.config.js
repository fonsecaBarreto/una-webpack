const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const SRC_DIR =  path.resolve(__dirname, "..", "src")
const OUTPUT_DIR =  path.resolve(__dirname, "..", "dist")

const entries = {};
fs.readdirSync(`${SRC_DIR}/react-apps/apps`).map(async (file) => {
    if (!fs.statSync(path.resolve(`${SRC_DIR}/react-apps/apps`, file)).isDirectory()) return;
    entries[file] = `${SRC_DIR}/react-apps/apps` + `/${file}/index.js`;
})

module.exports ={ 
    target: "web",
    entry: { ...entries },
    output: {
        path: OUTPUT_DIR,
        filename: "static/[name].bundle.js",
        publicPath: "/",
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        alias: { 
            '@': path.resolve(__dirname, 'src')
        },
    },

    plugins: [
        new MiniCssExtractPlugin(),
        
        new CleanWebpackPlugin([OUTPUT_DIR]),

        ...Object.keys(entries).map(a=>{
            return (
                new HtmlWebpackPlugin({
                    template: "./src/public/index.html",  // Html Raiz
                    favicon: "./src/public/favicon.ico",  // Icone
                    filename: `./views/${a}.html`,        // Distribuição Final
                    chunks: [a],                          // chuck Js
            }))
        }),

    ],

    module: {
        rules: [

            {
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, // instead of style-loader
                    'css-loader'
                ]
            },
            {
                test: /\.(ttf)$/,
                use: "url-loader?limit=100000"
            },
            {
                test: /\.(svg|png|gif|jpg|jpeg|webp|mp3)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash].[ext]',
                        outputPath: 'static',
                    }
                }
            },   
        ]
    },
        
  
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
};