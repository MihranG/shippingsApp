const {resolve} = require('path');
const {CheckerPlugin} = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devConfig = require('./configs/webpack.dev')
const prodConfig =require('./configs/webpack.prod')
const webpack = require('webpack')

module.exports = env => {
    var  envConfig ;
    console.log('env', env)
    if(env && env.development){
      envConfig = devConfig
    }else{
      envConfig = prodConfig
    }
    return{
      // ...envConfig,
      
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
      context: resolve(__dirname, './src'),
      module: {
        rules: [
          {
            test: /\.js$/,
            use: ['babel-loader', 'source-map-loader'],
            exclude: /node_modules/,
          },
          {
            test: /\.tsx?$/,
            use: ['babel-loader', 'awesome-typescript-loader'],
          },
          {
            test: /\.css$/,
            use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }],
          },
          {
            test: /\.(scss|sass)$/,
            loaders: [
              'style-loader',
              { loader: 'css-loader', options: { importLoaders: 1 } },
              'sass-loader',
            ],
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
              'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
              'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
            ],
          },
        ],
      },
      // plugins: [
      //   new CheckerPlugin(),
      //   new HtmlWebpackPlugin({template: 'index.html'}),
      // ],
      externals: {
        // 'react': 'React',
        // 'react-dom': 'ReactDOM',
      },
      mode: 'development',
      entry: [
      'react-hot-loader/patch', // activate HMR for React
      'webpack-dev-server/client?http://localhost:8088',// bundle the client for webpack-dev-server and connect to the provided endpoint
      'webpack/hot/only-dev-server', // bundle the client for hot reloading, only- means to only hot reload for successful updates
      './index.tsx' // the entry point of our app
      ],
      devServer: {
        hot: true, // enable HMR on the server
      },
      // devtool: 'cheap-module-eval-source-map',
      plugins: [
        new webpack.HotModuleReplacementPlugin(), // enable HMR globally
        new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
        new CheckerPlugin(),
        new HtmlWebpackPlugin({template: resolve(__dirname, './src/index.html')}),
      ],
      performance: {
        hints: false,
      },
}};