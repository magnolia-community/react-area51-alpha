var path = require('path');

//mode: 'production',

module.exports = {
    watch: true,
    
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve('lib'),
        filename: 'MagnoliaReactArea51.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            }
        ]
    }
}
