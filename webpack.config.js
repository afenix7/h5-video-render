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
    performance: {
        maxEntrypointSize: 1024000,
        maxAssetSize: 1024000
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:{
                    loader:"babel-loader",
                    options:{
                        presets:['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.glsl$/,
                loader: 'webpack-glsl'
            }
        ]
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