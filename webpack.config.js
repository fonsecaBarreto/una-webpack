const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const { APPS_DIR, REACT_APPS } = require("./apps_manifest");

const OUTPUT_DIR = "dist";
const entry = {};

REACT_APPS.forEach((a) => {
  entry[a.name] = path.resolve(APPS_DIR, a.name, "index.js");
});

module.exports = {

  entry: { ...entry },
  output: {
    path: path.join(__dirname, OUTPUT_DIR),
    filename: "static/js/[name].bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
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
        test: /\.(svg|png|gif|jpg|webp|icon)$/,
        use: {
            loader: 'file-loader',
            options: {
                name: '[name].[hash].[ext]',
                outputPath: 'static/imgs',
            }
        }
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },

  plugins: [

    new CleanWebpackPlugin([OUTPUT_DIR]),

    ...REACT_APPS.map((a)=>{
        return (
            new HtmlWebpackPlugin({
                template: "./src/public/index.html",  //Html Raiz
                favicon: "./src/public/favicon.ico",  //Icone
                filename: `./views/${a.name}.html`,   //Distribuição Final
                chunks: [a.name],                     //
            })
        )
    })
    
  ],


  /*   devServer: {
    open:true,
    port: 3000,
    disableHostCheck: true,
    useLocalIp: true,
    inline: true,
    host: "0.0.0.0",
    historyApiFallback:{
      disableDotRule: false,
      rewrites: [
        { from: "^/provider", to: "/provider" },
        { from: "^/admin", to: "/admin" },
        { from: "^/", to :"/client"},
      ]
    }
  }, */

};


       /*  { from: /^\/$/, to :"/client"},
        { from: /^\/outro\/.*$/, to: "/admin" },
        { from: /^\/$/, to: "/views/landing.html" },
        { from: /^\/subpage/, to: "/views/subpage.html" },
        { from: /./, to: "/views/404.html" }, */