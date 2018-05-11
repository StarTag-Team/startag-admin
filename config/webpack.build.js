const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin")
const gutil = require('gutil')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const ENV = process.env.NODE_ENV || 'development'

const _root = path.resolve()
const _project = path.join(_root, '/src/')
const _entry = _project + '/launcher.js'
const _htmlTemplate = _project + '/index.html'
const _themePath = _project + '/styles/'
const _output = path.join(_root, '/build/public/', (ENV === 'production') ? '/prod/' : '/dev/')

const aliases = {
    '@project': _project,
    '@theme': _themePath,
    '@components': _project + '/components'
}

const envOptions = {
    ENV: JSON.stringify(ENV),
    outputPath: _output,
    watch: (ENV !== 'production'),
    plugins: (ENV === 'production') ? [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new UglifyJsPlugin({
            uglifyOptions: {
                'screw-ie8': true,
                beautify: false,
                comments: false,
                sourceMap: false,
                mangle: {
                    toplevel: false
                },
                compress: {
                    sequences: true,
                    booleans: true,
                    loops: true,
                    unused: true,
                    warnings: false,
                    drop_console: true,
                    unsafe: true
                },
                output: {
                    comments: false
                }
            }
        }),
        new CompressionPlugin({
            asset: '[path]',
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ] : []
}

const config = {
    entry: {
        'main': ['babel-polyfill', _entry]
    },

    output: {
        path: envOptions.outputPath,
        filename: 'bundle.js',
        publicPath: '/'
    },

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
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': envOptions.ENV
            }
        }),
        new HtmlWebpackPlugin({
            title: 'Startag',
            template: _htmlTemplate
        }),
        ...envOptions.plugins
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
        alias: Object.assign(aliases, envOptions.aliases)
    },
    watch: envOptions.watch
}


webpack(config, (err, stats) => {
    if (err) {
        throw new gutil.PluginError('webpack:build', err)
    }
    gutil.log('[webpack:build]', stats.toString({
        chunks: false,
        colors: true,
        timings: true
    }))
})

if (ENV !== 'production') {
    const staticServer = require('node-static')
    const fileServer = new staticServer.Server(_output, {gzip: true})

    require('http')
        .createServer((request, response) => {
            request.addListener('end', () => {
                fileServer.serve(request, response, (e, res) => {
                    if (e && (e.status === 404)) {
                        fileServer.serveFile('/index.html', 404, {}, request, response)
                    }
                })
            }).resume()
        }).listen(6060)
}