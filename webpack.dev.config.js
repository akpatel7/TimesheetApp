const webpack = require('webpack');
const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');

const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const dashboard = new Dashboard();

const config = require('./webpack.base.config.js');

const localConfig = require('./local_config.js');

config.devtool = 'eval-source-map';


config.entry = {
    main: [
        'react-hot-loader/patch',
        'babel-polyfill',
        './frontend/assets/js/index.jsx',
        'webpack/hot/only-dev-server',
        `webpack-dev-server/client?http://${ localConfig.ip }:${ localConfig.port }`
    ]
};


config.output = {
    path: path.resolve('./frontend/static/dist/'),
    publicPath: `http://${ localConfig.ip }:${ localConfig.port }/assets/bundles/`,
    filename: '[name].js'
};


config.plugins = [
    new webpack.HotModuleReplacementPlugin(),

    new webpack.NoEmitOnErrorsPlugin(),

    // Used by Django.
    new BundleTracker({ filename: './webpack-stats-dev.json' }),

    new webpack.NamedModulesPlugin(),

    new DashboardPlugin(dashboard.setData)
];


module.exports = config;
