const {merge} = require('webpack-merge');
const common = require('./webpack.config');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {

        compress: true, port: 3000, hot: true, open: true, 
        historyApiFallback:{
            disableDotRule: false,
            rewrites: [ 
                { from: "^/login", to: "/views/login.html"},            // React aapp
                { from: "^/teste", to: "/views/teste.html"},    // pagina teste
                { from: "^/", to: "/views/main.html"},                  // Aplicação principal
            ]
        },
        host: "localhost"
    }
});