const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports={
    entry:{
        index:'./src/index.js',
    },
    devtool: 'inline-source-map',
    devServer:{
        static:'./dist',
        port:8888,
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: 'h5-video-render',
            template:'index.html'
        }),
    ],
    output:{
        filename:'[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean:true
    }
 }