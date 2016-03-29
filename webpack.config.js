'use strict';

function addHash(template, hash) {
    return !debug ? template.replace(/\.[^.]+$/, `.[${hash}]$&`) : template;
}

const   debug = process.env.NODE_ENV !== 'production',
        path = require('path'),
        settings = require('./settings'),
        webpack = require('webpack'),
        rimraf = require('rimraf'),
        autoprefixer = require('autoprefixer'),
        HtmlWebpackPlugin = require('html-webpack-plugin'),
        ExtractTextPlugin = require('extract-text-webpack-plugin'),
        extractCSS = new ExtractTextPlugin(addHash('[name].css', 'chunkhash'), {
            allChunks: true,
            disable: debug
        }),
        defaultPlugins = [
            extractCSS,
            {
                apply: (compiler) => {
                    rimraf.sync(compiler.options.output.path);
                }
            },
            new webpack.DefinePlugin({
                DEBUG: JSON.stringify(debug),
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }),
            new webpack.ProvidePlugin({
                _: 'lodash',
                jQuery: 'jquery',
                $: 'jquery',
                //"window.jQuery": "jquery",
                //Wix: 'wix',
                //"window.Wix": "wix"
            }),
            new webpack.ResolverPlugin(
                new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
            ),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common'
            }),
            new HtmlWebpackPlugin({
                filename: './index.html',
                title: 'Wix Test Application',
                chunks: ['app', 'common'],
                // Required
                inject: false,
                template: './app/common/tpl/index.ejs',
                // Optional
                mobile: true,
                //appMountId: 'app',
                //baseHref: 'http://example.com/awesome',
                /*googleAnalytics: {
                    trackingId: 'UA-XXXX-XX',
                    pageViewOnLoad: true
                },*/
                /*window: {
                    env: {
                        apiHost: 'http://myapi.com/api/v1'
                    }
                }*/
            }),
            new HtmlWebpackPlugin({
                filename: './settings.html',
                title: 'Wix Settings',
                chunks: ['settings', 'common'],
                // Required
                inject: false,
                template: './settings/common/tpl/index.ejs'
            })
        ];

module.exports = {
    context: path.join(__dirname, 'frontend'),
    entry: {
        app:        ['./app/index'],
        settings:   ['./settings/index']
    },
    output: {
        path:           path.join(__dirname, 'public'),
        publicPath:     debug ? 'http://'+settings.host+':'+settings.port+'/' : '',
        filename:       addHash('[name].js', 'chunkhash'),
        chunkFilename:  addHash('[id].js', 'chunkhash')
    },
    resolve: {
        root: [
            path.join(__dirname, 'bower_components'),
            path.join(__dirname, 'vendor')
        ],
        alias: {
            'wix$': 'wix/js-sdk/Wix',
            'wix-collections$': 'wix/simple-collections-client/build/simple-collections',
            'wix-ui$': 'wix-ui-lib2/ui-lib'
        }
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: /frontend/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
                }
            },
            { test: /\.css$/ ,                      loader: extractCSS.extract('style', 'css!postcss-loader') },
            { test: /\.scss$/ ,                     loader: extractCSS.extract('style', 'css?sourceMap!postcss-loader!resolve-url!sass') },
            { test: /\.(gif|png|jpg|jpeg|svg|eot|woff2|woff|ttf)$/,
                loader: debug ? 'file?name=assets/[path][name].[hash:6].[ext]' : 'file?name=assets/[hash].[ext]' },
            { test: /simple-collections.js$/,       loader: 'exports?$cll' },
            { test: /Wix.js$/,                      loader: 'exports?Wix' },
            { test: require.resolve("jquery"),      loader: "expose?$!expose?jQuery" },
            //{ test: /wix-ui-lib2\/ui-lib.js$/,      loader: 'expose?$!expose?jQuery!imports?jQuery=jquery' },
            { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },
            { test: /\.ejs$/, loader: 'ejs' }
        ]
    },
    postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
    node: {
        fs: 'empty'
    },
    plugins: debug ? defaultPlugins : defaultPlugins.concat([
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            },
            mangle: false,
            sourcemap: false
        })
    ]),
    devtool: debug ? 'inline-source-map' : null,
    devServer: {
        host: settings.host,
        port: settings.port,
        contentBase: path.join(__dirname, 'public')
    }
};
