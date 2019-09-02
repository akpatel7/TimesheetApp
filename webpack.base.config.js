const path = require('path');


const config = {
    context: __dirname,

    devtool: 'eval-cheap-module-source-map',

    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.s[ac]ss$/,
                exclude: '/node_modules/',
                use: [{
                    loader: 'style-loader',
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                        includePaths: [path.resolve(__dirname)]
                    }
                }]
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                exclude: '/node_modules/',
                loader: 'file-loader'
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                exclude: '/node_modules/',

                // If an image is less than 10kb, use data-url for images, otherwise
                // falls back to file-loader.
                loaders: ['url-loader?limit=10000&name=images/[hash:12].[ext]']
            }
        ]
    },

    resolve: {
        descriptionFiles: ['package.json'],
        extensions: ['.js', '.jsx', '.scss'],
        mainFiles: ['index'],
        modules: ['node_modules', path.resolve(__dirname)],

        alias: {
            /* ---- Core app ---- */
            comps: 'frontend/assets/js/components',

            api: 'frontend/assets/js/api',
            actions: 'frontend/assets/js/actions',
            sagas: 'frontend/assets/js/sagas',
            reducers: 'frontend/assets/js/reducers',
            electron: 'frontend/assets/js/electron',
            utilities: 'frontend/assets/js/utilities',

            js: 'frontend/assets/js',
            scss: 'frontend/assets/scss',
            images: 'frontend/assets/images'
        }
    },

    externals: {
        'Promise': 'Promise',
        'account-session': 'account'
    }
};


module.exports = config;
