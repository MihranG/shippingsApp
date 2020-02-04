const {resolve} = require('path');

module.exports =  {
    mode: 'production',
    entry: './src/index.tsx',
    output: {
      filename: 'js/bundle.[hash].min.js',
      path: resolve(__dirname, '../dist'),
      publicPath: '/',
    },
    devtool: 'source-map',
    plugins: [],
  };