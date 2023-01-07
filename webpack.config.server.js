const nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require('path')

module.exports = {
  name: 'server',
  target: 'node',
  mode: 'production',
  entry: {
    server: path.resolve(__dirname, 'server','server.tsx'),
  },
  output: {
    path: path.resolve(__dirname,'server','dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx'],
    alias: { 
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src',"public","assets"),
      '@main': path.resolve(__dirname, 'src',"react-apps","apps","main"),
      '@pages': path.resolve(__dirname, 'src',"react-apps","pages")
    },
  },
  externals: [nodeExternals()],

  node: {
    __dirname: false,
  },

  plugins: [
    new MiniCssExtractPlugin(),
  ],
  
  module: {

    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/, 
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.server.json',
        },
      },

      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    
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
    ],
  },
}