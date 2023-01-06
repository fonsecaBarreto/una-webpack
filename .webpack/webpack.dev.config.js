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
              /*   { from: /^\/$/, to: '/views/landingpage.html' },   */                 
                { from: "^/bem-vindo", to: "/views/landingpage.html"},   
                // { from: "^/admin", to: "/views/admin.html"},   
       /*          { from: "^/login", to: "/views/login.html"},    */               
                { from: "^/", to: "/views/main.html"},                  
            ]
        },
        host: "localhost"
    }
});