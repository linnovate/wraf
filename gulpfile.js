'use strict';

var gulp = require('gulp');
var gutil = require("gulp-util");

var path = require("path");
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');



gulp.task('default', ['webpack:livereload','webServer']);


var module = {
	loaders: [{
	    test: /\.css$/,
	    loader: "style!css"
	},{
	    test: /\.scss$/,
	    loaders: "sass!style!css"
	},{
	    test: /\.js$/,
	    loader: "babel"
	}]
};

var config_app = {
    entry: {
       app: ["./app/main"]
    },
    output: {
        path: path.resolve(__dirname, "./"),
        filename: "scripts.bundle.js"
    },
    module: module
};

var config_appSettings = {
    entry: {
       app: ["./app-settings/main"]
    },
    output: {
        path: path.resolve(__dirname, "./"),
        filename: "scripts.bundle.js"
    },
    module: module
};


// get memory file
gulp.task('webpack:livereload', function(callback) {

    var compiler = webpack(config_app);
    var server = new webpackDevServer(compiler);
    server.listen(9090,'localhost');

    var compiler = webpack(config_appSettings);
    var server = new webpackDevServer(compiler);
    server.listen(9091,'localhost');

});

// get static file
gulp.task('webpack:static-file', function(callback) {

    webpack(config , function(err, stats) {
        if (err)
            throw new gutil.PluginError("webpack",err);
        gutil.log("[webpack]", stats.toString({
        // output options
        }));
        callback();
    });

});



gulp.task('webServer', function() {
    var connect = require('gulp-connect');
    connect.server({
        port:'3000'
    });
});

module.exports = gulp;
