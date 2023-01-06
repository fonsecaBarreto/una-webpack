const nodeExternals = require('webpack-node-externals')
const path = require('path')

module.exports = {
  name: 'server',
  entry: {
    server: path.resolve(__dirname, 'server','server.ts'),
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname,'server','dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx'],
    alias: { 
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src',"public","assets"),
      '@main': path.resolve(__dirname, 'src',"react-apps","apps","main")
    },
  },
  externals: [nodeExternals()],
  target: 'node',
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
        test: /\.(png|gif|jpg|jpeg|webp|svg|css)$/,
        use: [ 'ignore-loader'] 
      },
    ],
  },
}