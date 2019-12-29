const path = require ('path')
const nodeExternals = require ('webpack-node-externals')
const copyWebpackPlugin = require ('copy-webpack-plugin')

module.exports = {
    entry: {
        main: path.resolve (__dirname, 'src', 'server', 'server.js')
    }, 
    output: {
        path: path.join (__dirname, 'dist', 'server'),
        publicPath: '',
        filename: 'js/server.js'
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
            }
        ]
    },
    plugins: [
        new copyWebpackPlugin ([
            {
                from: 'src/server/data',
                to: 'data/[name].[ext]',
                toType: 'template'
            }
        ])
    ],
}