"use strict";
var webpack = require("webpack");

var plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
];

module.exports = {
    entry: {
        build: ['./src/index.jsx'],
        examples: './examples/entry.jsx'
    },
    output: {
        filename: "./[name]/bundle.js",
        library: "reach",
        libraryTarget: "umd"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.md$/,
                exclude: /node_modules/,
                loaders:  ["html", "remarkable"]
            },
        ]
    },
    remarkable: {
        breaks: true,
        html: true,
        xhtmlOut: true
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }

};
