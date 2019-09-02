const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = require('./webpack.base.config.js');
const path = require('path');


config.entry = {
    main: [
        'babel-polyfill',
        './frontend/assets/js/index'
    ]
};

config.module.loaders.push({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: ['css-loader', 'sass-loader']
    }),
    exclude: '/node_modules/'
});

config.output = {
    path: path.resolve('./frontend/static/dist/'),
    publicPath: '/static/dist/',
    filename: '[name].js'
};


config.plugins = [
    // Webpack --> Django templates.
    new BundleTracker({ filename: './webpack-stats-prod.json' }),

    // Removes a lot of debugging code in React.
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),

    new UglifyJSPlugin(),

    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.NoErrorsPlugin(),

    new ExtractTextPlugin({
        filename: '[name].[id].style.css',
        allChunks: true
    })
];


module.exports = config;
