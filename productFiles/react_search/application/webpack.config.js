/**
 * Created by Administrator on 2016/3/23.
 */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        "xiaohuanTest": "./js/App/xiaohuanTest.js",
        //"search":"./js/App/search.js",
        search: [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            './js/App/search.js'
        ]
    },
    dev: 'eval',
    output: {
        path: path.join(__dirname, 'assets'),
        filename: '[name].bundle.js',
        publicPath : 'http://localhost:3000/assets'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['node_modules'],
        alias: {
            '$tinymce': 'tinymce/tinymce.jquery',
//require('$tinymce'); 其实就等价于 require('tinymce/tinymce.jquery');
        }
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "root.jQuery": "jquery",
            "React": "react",
        }),
        new ExtractTextPlugin('[name].common.css'),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.less$/,
                loaders: ['style', 'css', 'less', 'autoprefixer'],
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader",
                //exclude: /(node_modules|bower_comonents)/
            },
            {test: /\.json$/, loader: 'json'}
            , {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff"},
            , {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/octet-stream"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=image/svg+xml"},
            {test: /\.png$/, loader: "url-loader?limit=100000"},
            {test: /\.jpg$/, loader: "file-loader"},
            {test: /\.gif$/, loader: "file-loader"},
        ]
    }
}