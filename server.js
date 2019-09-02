const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.dev.config');
const localConfig = require('./local_config.js');


new WebpackDevServer(webpack(config), {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-id, Content-Length, X-Requested-With',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    },

    historyApiFallback: true,
    hot: true,
    publicPath: config.output.publicPath,
    quiet: true,    // Shows WebpackDashboard instead.
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    }
}).listen(localConfig.port, localConfig.ip, function(error) {
    if (error) console.log(error);
    console.log(`Listening at ${ localConfig.ip }:${ localConfig.port }`);
});
