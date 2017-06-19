/**
 * User: David
 * Date: 1/18/16
 * Time: 16:18
 */

var pathHelper = require('path');
var dirName = __dirname;
var myConfig = require('./config.js');
var JsPath = pathHelper.resolve(dirName, myConfig.js);
var LessPath = pathHelper.join(dirName, myConfig.less);
var AppPath = pathHelper.join(JsPath, myConfig.App);
var pathes = [];
pathes = pathes.concat(myConfig.output.split('/'));

var PublicPath = pathHelper.resolve(dirName, pathHelper.join.apply(pathHelper, pathes));
var assetsPath = myConfig.output.split('/').pop();
var webpack = require('webpack');
var fs = require('fs');

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

function walk(path, callback, regex) {
    console.log("path", path);
    var dirList = fs.readdirSync(path);
    dirList.forEach(function (item) {
        var itemPath = pathHelper.join(path, item);
        if (fs.statSync(itemPath).isDirectory()) {
            walk(itemPath);
        } else {
            var fullpath = itemPath;
            if (!regex || fullpath.match(regex)) {
                //fileList.push(fullpath);
                callback(item, fullpath, regex.exec(item), regex.exec(fullpath));
            }
        }
    });
}

var apps = {};
walk(AppPath, function (fileName, fullPath, resultForFileName) {
    apps[resultForFileName[1]] = [
        pathHelper.resolve(__dirname, pathHelper.join(".", "js", "App", fileName))
    ];

    //console.log(fileName,resultForFileName) ;
}, /(.+)\.(jsx|js)$/);

console.log("apps", apps);
/**/


var config = {
    context: dirName,
    entry: apps,
    output: {
        path: PublicPath,
        filename: '[name].bundle.js',
        publicPath: '/' + assetsPath + '/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['node_modules'],
        alias: {
            '$tinymce': 'tinymce/tinymce.jquery',

        }
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        //new webpack.optimize.DedupePlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "root.jQuery": "jquery",
            "React": "react",

        }),
        commonsPlugin,
        new ExtractTextPlugin("[name].common.css")
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: [
                    JsPath
                ],
                loader: "babel",
                exclude: /(node_modules|bower_components)/,
                query: {
                    plugins: [],
                    presets: [],
                }
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
            }, {
                test: /\.less$/,
                loaders: ['style', 'css', 'less', 'autoprefixer'],
                include: [
                    LessPath
                ],
                exclude: /(node_modules|bower_components)/,
            },
            {test: /\.json$/, loader: 'json'}
            , {test: /\.woff2$/, loader: "url?limit=10000&minetype=application/font-woff"},
            , {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/octet-stream"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=image/svg+xml"},
            {test: /\.png$/, loader: "url-loader?limit=100000"},
            {test: /\.jpg$/, loader: "file-loader"},
            {test: /\.gif$/, loader: "file-loader"},

        ]
    }
};


if (process.env.NODE_ENV === 'production') {
    config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
    config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}
module.exports = config;
