const {merge} = require('webpack-merge');
const common = require('./webpack.config');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        allowedHosts: 'all',
        host: '0.0.0.0',//your ip address
        compress: true, port: 3000, hot: true, open: true, 
        historyApiFallback:{
            disableDotRule: false,
            rewrites: [ 
                { from: "^/home", to: "/views/landing-page.html"},                  // Aplicação principal
                { from: "^/", to: "/views/main.html"},                  // Aplicação principal
            ]
        },
        /* proxy: {
            '/api': 'http://localhost:8080'
        }, */
        host: "localhost"
    }
});