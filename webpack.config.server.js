/**
 * Created by lerayne on 26.03.17.
 */

const webpack = require('webpack')
const path = require('path')
const getExternals = require('webpack-node-externals')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = function (env) {

    const DEV = env.mode === 'development'
    const PROD = env.mode === 'production'

    const babelOptions = {
        babelrc: false,
        presets: [
            ["env", {
                targets: {node: DEV ? "current" : 6}
            }],
            "react",
            "stage-0",
            "flow"
        ]
    }

    const plugins = [
        new webpack.LoaderOptionsPlugin({
            debug: DEV,
            minimize: PROD
        }),

        new webpack.DefinePlugin({
            'process.env': {
                BROWSER: JSON.stringify(false),
                NODE_ENV: JSON.stringify(env.mode || 'development')
            }
        })
    ]

    if (PROD) {
        plugins.push(new UglifyJsPlugin({
            mangle: true,
            comments: false
        }))
    }

    return {
        target: 'node',

        node: {
            __dirname: false,
            __filename: false,
        },

        entry: path.join(__dirname, 'src', 'server.js'),

        output: {
            path: path.join(__dirname),
            filename: 'ingralyzer.js'
        },

        resolve: {
            extensions: ['.js', '.jsx']
        },

        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: [{
                        loader: 'babel-loader',
                        options: babelOptions
                    }]
                },
                {
                    test: /\.css$/,
                    use: [{
                        loader: 'css-loader/locals',
                        options: {
                            localIdentName: '[name]-[local]--[hash:base64:5]'
                        }
                    }]
                }
            ]
        },

        externals: [
            {
                config: 'require("./config.js")'
            },
            getExternals({
                whitelist: [
                    /\.css$/i //CSS files whitelisted so we can omit them by loader
                ]
            })
        ],

        plugins,

        devtool: DEV ? 'inline-source-map' : false
    }
}
