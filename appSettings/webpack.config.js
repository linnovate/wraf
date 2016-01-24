

module.exports = {
    entry: {
      app: ['webpack/hot/dev-server', "./main"]
      //,appSettings: ['webpack/hot/dev-server', "./appSettings/main"]
    },
    output: {
        path: __dirname + "./",
        filename: "bundle.js",
	publicPath: "/"
    },
	  devtool: 'sourcemap',
    module: {
	    loaders: [{
		    test: /\.css$/,
		    loader: "style!css"
		}, 
		{
		    test: /\.scss$/,
		    loaders: "sass!style!css"
		}, {
		    test: /\.js$/,
		    loader: "babel"
		}
	    ]
    },
    port:8081
};
