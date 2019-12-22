const path = require ('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        main: path.resolve (__dirname, 'src', 'index.js') //'./src/index.js
    },
    output: {
        path: path.join (__dirname, 'dist', 'public'),
        publicPath: '',
        filename: 'js/bundle.js'
    },
    target: 'web', //'node'
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                  'css-loader',
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: 'css/[name].css',
          chunkFilename: '[id].css',
          ignoreOrder: false,
        }),
        new HtmlWebpackPlugin({ 
            filename: 'test.html',
            template: 'src/public/index.html'
          })
      ]
}