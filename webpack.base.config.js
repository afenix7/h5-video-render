const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')

 module.exports={
    entry:{
        index:'./src/index.js',
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:{
                    loader:"babel-loader",
                    options:{
                        presets:[
                            ['@babel/preset-env',{
                                targets: 'last 2 versions',
                                "useBuiltIns": "usage",
                                "corejs": 3,
                                "exclude": ["@babel/plugin-transform-regenerator"]
                            }]
                        ]
                    }
                },
                exclude: /node_modules/
            },
            // {
            //     test: /\.glsl$/,
            //     loader: 'webpack-glsl'
            // }
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
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({
        test: /\.js(\?.*)?$/i,
      })],
    },
 }