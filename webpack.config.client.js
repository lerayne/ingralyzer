/**
 * Created by lerayne on 07.01.17.
 */

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HTMLPlugin = require('html-webpack-plugin')

// const cssName            = PROD ? 'styles-[hash].css' : 'styles.css';
// const jsName             = PROD ? 'bundle-[hash].js' : 'bundle.js';
const cssName = 'styles.css';
const jsName = 'bundle.js';

module.exports = function (env) {

    const PROD = env.mode === 'production'
    const DEV = env.mode === 'development'

    // const publicPath = DEV ? 'http://localhost:8050/public' : '/';
    const publicPath = 'http://localhost:3002/public'

    const plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                BROWSER: JSON.stringify(true),
                NODE_ENV: JSON.stringify(env.mode || 'development')
            }
        }),

        new ExtractTextPlugin(cssName),

        new webpack.LoaderOptionsPlugin({
            debug: DEV,
            minimize: PROD
        }),

        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb|ru/)
    ]

    const babelOptions = {
        babelrc: false,
        presets: [
            [ "env", { modules: false } ],
            "react",
            "stage-0"
        ],
        plugins:[]
        // plugins:[
        //     "transform-runtime",
        //     ["import", {
        //         libraryName: "antd",
        //         style: "css"
        //     }]
        // ]
    }

    if (DEV) {
        babelOptions.plugins.push('react-hot-loader/babel')

        /*plugins.push(new HTMLPlugin({
            template:'./index.html',
            inject:false
        }))*/
    }

    if (PROD) {
        /*plugins.push(
         new CleanWebpackPlugin(['public/assets/'], {
         root: __dirname,
         verbose: true,
         dry: false
         })
         )*/

        plugins.push(new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            comments: false
        }))

        plugins.push(new BundleAnalyzer({
            analyzerMode:'static',
            reportFilename: 'webpack-analysis.html',
            openAnalyzer: false
        }))

        babelOptions.presets.push('react-optimize')
    }

    return {
        entry: './src/client.jsx',

        resolve: {
            extensions: ['.js', '.jsx']
        },

        plugins,

        output: {
            path: `${__dirname}/public/`,
            filename: jsName,
            publicPath
        },

        module: {
            rules: [
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: {
                            loader: 'css-loader',
                            options: {
                                localIdentName: '[name]-[local]--[hash:base64:5]'
                            }
                        }
                    })
                },
                {
                    test: /\.gif$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'image/gif'
                        }
                    }
                },
                {
                    test: /\.(jpeg|jpg)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'image/jpeg'
                        }
                    }
                },
                {
                    test: /\.png$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'image/png'
                        }
                    }
                },
                {
                    test: /\.svg$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'image/svg+xml'
                        }
                    }
                },
                {
                    test: /\.(woff|woff2|ttf|eot)$/,
                    use: {
                        loader: 'url-loader',
                        options: {limit: 1}
                    }
                },
                {
                    test: /\.(js|jsx)$/,
                    use: {loader:'babel-loader', options: babelOptions},
                    exclude: [/node_modules/, /public/]
                }
            ]
        },

        devtool: DEV ? 'inline-source-map' : false,

        devServer: {
            headers: {'Access-Control-Allow-Origin': '*'}
        }
    }
}