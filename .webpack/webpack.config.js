const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const SRC_DIR =  path.resolve(__dirname, "..", "src")
const OUTPUT_DIR =  path.resolve(__dirname, "..", "dist")
const Dotenv = require('dotenv-webpack');
const CompressionPlugin = require("compression-webpack-plugin")
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
        filename: "js/[name][fullhash].bundle.js",
        publicPath: "/",
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        alias: { 
            '@': path.resolve(__dirname, 'src'),
            '@assets': path.resolve(__dirname, 'src',"public","assets"),
            '@main': path.resolve(__dirname, 'src',"react-apps","apps","main")
        },
    },
    plugins: [
        new Dotenv(),
        
        new MiniCssExtractPlugin({ 
            linkType: "text/css",
            filename: "css/[name].[fullhash].css",
            chunkFilename: "[id].css",
            ignoreOrder: false,
        }),

        ...Object.keys(entries).map(a=>{
            return (
                new HtmlWebpackPlugin({
                    template: "./src/public/index.html",  // Html Raiz
                    favicon: "./src/public/favicon.ico",  // Icone
                    filename: `./views/${a}.html`,        // Distribuição Final
                    chunks: [a],                          // chuck Js
            }))
        }),
        new WebpackManifestPlugin(),

        new CompressionPlugin()
    ],

    module: {
        rules: [
            {   test: /\.(js|jsx|tsx|ts)$/, 
                exclude: /node_modules/,  
                loader: 'babel-loader'
            },
            {   
                test: /\.css$/i, 
                use: [ 
                    {
                        loader: MiniCssExtractPlugin.loader, options: { publicPath: "/" }
                    },
                    'css-loader',
                        
                ] 
            },
            {   test: /\.(ttf)$/, use: "url-loader?limit=100000" },
    
            {   test: /\.(png|gif|jpg|jpeg|webp)$/,
                use: {
                    loader: 'file-loader',
                    options: { 
                        name: '[name].[ext]',
                        outputPath: 'img'
                    }
                }
            },
            {
                test: /\.svg$/,
                use: [
                  {
                    loader: 'svg-url-loader',
                    options: {
                      limit: 10000,
                    },
                  },
                ],
            },
        ]
    },    
};


   /* 
            {
                test: /\.svg$/,
                use: ['@svgr/webpack', 'url-loader'],
            }
      */
   /*  performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    } */