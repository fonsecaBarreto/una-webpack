const {merge} = require('webpack-merge');
const common = require('./webpack.config');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
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
        host: "localhost",
        historyApiFallback:{
            disableDotRule: false,
            rewrites: [ 
                { from: "^/login", to: "/views/login.html"},
                { from: "^/saudacoes", to: "/views/greetings.html"},
                { from: "^/", to: "/views/main.html"},
            ]
        },
    },
});