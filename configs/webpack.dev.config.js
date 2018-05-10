const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './index.js',

    output: {
        path: __dirname + '/../public',
        filename: 'bundle.js'
    },

    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }, {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    }, {
                        loader: 'css-loader',
                    }
                ],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Startag',
            template: 'src/template.html'
        })
    ],
    devServer: {
        host: 'localhost',
        port: 3030
    }
}