module.exports = {
    devServer: {
        hot: true,
        publicPath: '/',
        proxy: {
            '/api': {
                target: 'http://localhost:3030/',
                pathRewrite: { '^/api': '' },
                secure: false,
                changeOrigin: true,
            }
        },
    }
}