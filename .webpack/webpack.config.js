const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const SRC_DIR =  path.resolve(__dirname, "..", "src")
const OUTPUT_DIR =  path.resolve(__dirname, "..", "dist")

const entries = {};
fs.readdirSync(`${SRC_DIR}/ReactApps/apps`).map(async (file) => {
    if (!fs.statSync(path.resolve(`${SRC_DIR}/ReactApps/apps`, file)).isDirectory()) return;
    entries[file] = `${SRC_DIR}/ReactApps/apps` + `/${file}/index.js`;
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
        alias: { '@': path.resolve(__dirname, 'src') },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, 
                include: [ SRC_DIR ],
                use:  "babel-loader",
            },
            {
                test: /\.(ts|tsx)?$/,
                use: [{
                        loader: 'ts-loader',
                        options: { transpileOnly: true }
                    }],
                include: [ SRC_DIR ],
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ],
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
        
    plugins: [
        
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

    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
};