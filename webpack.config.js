const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const SRC_DIR =  path.resolve(__dirname, "src")
const OUTPUT_DIR =  path.resolve(__dirname, "dist")
const entries = {};
fs.readdirSync(`${SRC_DIR}/apps`).map(async (file) => {
    if (!fs.statSync(path.resolve(`${SRC_DIR}/apps`, file)).isDirectory()) return;
    entries[file] = `${SRC_DIR}/apps` + `/${file}/index.tsx`;
})

module.exports = (env) => {
    //devtool: "eval-source-map",
    return ({
        devtool: env === "production" ? "source-map" : "inline-source-map",
        entry: { ...entries },
        output: {
            path: OUTPUT_DIR,
            filename: "static/js/[name].bundle.js",
            publicPath: "/",
        },
        resolve: {
            extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/, 
                    include: [ SRC_DIR ],
                    use:  "babel-loader"
                },
                {
                    test: /\.(ts|tsx)?$/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: { transpileOnly: true }
                        }],
                        include: [ SRC_DIR ],
                }, 
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"]
                },
                {
                    test: /\.(woff|woff2|eot|ttf)$/,
                    /*loader: "url-loader?limit=100000", */
                    use: {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[hash].[ext]',
                            outputPath: '',
                            limit: 100000,
                            outputPath: 'static/fonts'
                        }
                    }
                },
                {
                    test: /\.(svg|png|gif|jpg|jpeg|webp|mp3)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash].[ext]',
                            outputPath: 'static/imgs',
                        }
                    }
                }
            ]},
            
            plugins: [
                
                new CleanWebpackPlugin([OUTPUT_DIR]),
                
                ...Object.keys(entries).map(a=>{
                    return (
                        new HtmlWebpackPlugin({
                            template: "./src/public/index.html",  // Html Raiz
                            favicon: "./src/public/favicon.ico",  // Icone
                            filename: `./views/${a}.html`,   // Distribuição Final
                            chunks: [a],                     // chuck Js
                    }))
                }),
     
            ],
            target: "web",
                
            devServer: {
                
                contentBase: "./dist",
                watchContentBase: true,
                inline: true,
                publicPath: "/", 
                hot: true,
                open: true,
                compress: true,
                port: 3000,
                disableHostCheck: true,
                useLocalIp: true,
                host: "0.0.0.0",
                historyApiFallback:{
                    disableDotRule: false,
                    rewrites: [ 
                        { from: "^/login", to: "/views/login.html"},
                        { from: "^/", to: "/views/unacompras.html"},
                    ]
                },
            }
    })
};