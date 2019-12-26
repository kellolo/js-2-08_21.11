const path = require ('path')
const nodeExternals = require('webpack-node-externals')
const cop = require ('copy-webpack-plugin')

module.exports = {
    entry: {
        main: path.resolve (__dirname, 'src', 'server', 'server.js') //'./src/index.js
    },
    output: {
        path: path.join (__dirname, 'dist', 'server'),
        publicPath: '',
        filename: 'js/server.js'
    },
    target: 'node', //'node'
    node: {
        __dirname: false,
        __filename: false
    },
    externals: [nodeExternals ()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
        ]
    },
    plugins: [
        new cop ([
            {
                from: 'src/server/db',
                to: 'db/[name].[ext]',
                toType: 'template'
            }
        ])
      ]
}