const webpack = require('webpack')
module.exports = env =>{
    return{
        mode: 'development',
        entry: [
        'react-hot-loader/patch', // activate HMR for React
        'webpack/hot/only-dev-server', // bundle the client for hot reloading, only- means to only hot reload for successful updates
        './src/index.tsx', // the entry point of our app
        'webpack-dev-server/client?http://localhost:8081'// bundle the client for webpack-dev-server and connect to the provided endpoint

        ],
        devServer: {
            hot: true, // enable HMR on the server
            port: 8081
        },
        devtool: 'cheap-module-eval-source-map',
        plugins: [
        new webpack.HotModuleReplacementPlugin(), // enable HMR globally
        new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
        ],
}}