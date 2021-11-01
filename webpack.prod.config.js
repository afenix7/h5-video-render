const path = require('path');
const base = require('./webpack.base.config')
const {merge} = require('webpack-merge')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = merge(base,{
    plugins:[
        new CleanWebpackPlugin()
    ]
})