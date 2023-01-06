const nodeExternals = require('webpack-node-externals')
const path = require('path')

module.exports = {
  name: 'server',
  target: 'node',
  mode: 'production',
  entry: {
    server: path.resolve(__dirname, 'server','server.ts'),
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
        test: /\.(png|gif|jpg|jpeg|webp)$/,
        use: [ 'ignore-loader'] 
      },

      {   
        test: /\.css$/i, 
        use: [
            'css-loader',
        ] 
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