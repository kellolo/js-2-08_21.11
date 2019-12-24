const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'src','server', 'server.js')
    },
    output: {
        path: path.join(__dirname, 'dist', 'server'),
        publicPath: '',
        filename: 'server.js'
    },
    target: 'node',
    node: {
        __dirname: false,
        __filename: false
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
        ]
    },
    plugins:[
        new CopyPlugin([{
            from: 'src/server/db',
            to: 'db/[name].[ext]',
            toType: 'template'
        }])
    ]
}