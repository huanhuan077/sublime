/**
 * Created by Administrator on 2016/1/20.
 */
var webpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var path = require('path');


var config = require('./webpack.config.js');
var myConfig = require('./config.js');
var output = myConfig.output.split('/');
var assetsPath = output.pop();
var base = path.join.apply(path,output);
config.devtool = 'eval';
var url = "http://" + myConfig.host + ":" + myConfig.port;
config.debug = true;
for(var key in config.entry){
    var files = config.entry[key];
    files.unshift('webpack/hot/only-dev-server');
    files.unshift('webpack-dev-server/client?' + url);
    config.entry[key] = files;
}
config.output.publicPath = url +"/" + assetsPath + "/";
config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
config.plugins.unshift(new webpack.NoErrorsPlugin());
config.module.loaders[0].query.presets.push('react-hmre');

var compiler = webpack(config);
var devConfig = {
    hot: true,
    inline :true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    publicPath : '/' + assetsPath + '/',

    "contentBase" : base,
};
console.log(devConfig);
var server = new webpackDevServer(compiler,devConfig);
console.log(devConfig);
console.log('请在浏览器里面打开  http://' + myConfig.host + ":" + myConfig.port);
server.listen(myConfig.port,myConfig.host);