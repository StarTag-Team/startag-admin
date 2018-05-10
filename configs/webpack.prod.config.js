const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: './index.js',
    output: {
        path: __dirname + '/../public',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Startag',
            template: 'src/template.html'
        }),
        new UglifyJsPlugin({
            sourceMap: true
        })
    ]
}