'use strict';

var gulp = require('gulp');
var gutil = require("gulp-util");

var path = require("path");
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');



gulp.task('default', ['webpack:livereload','webServer']);


var config = {
    entry: {
       app: ["./app/main.js"]
    },
    output: {
        path: path.resolve(__dirname, "./"),
        filename: "scripts.bundle.js"
    },
    module: {
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
    }
};


// get memory file
gulp.task('webpack:livereload', function(callback) {

    //config.entry.app.unshift("scripts.bundle.js?http://localhost:9090");
    var compiler = webpack(config);
    var server = new webpackDevServer(compiler);
    server.listen(9090,'localhost');

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
