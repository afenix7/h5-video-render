const path = require('path');
const base = require('./webpack.base.config')
const {merge} = require('webpack-merge')

module.exports = merge(base,{
    devtool: 'inline-source-map',
    mode:"development",
    devServer:{
        static:'./dist',
        port:8888,
    }, 
    performance: {
        maxEntrypointSize: 1024000,
        maxAssetSize: 1024000
    },
})