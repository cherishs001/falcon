//webpack.config.js
const {resolve, join} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ModuleConcatPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
const CompressionPlugin = require('compression-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const paths = {
    src: resolve(__dirname, 'source'),
    dist: resolve(__dirname, 'dist'),
    public: resolve(__dirname, 'template')
};
module.exports = {
    devServer: {
        port: 3030,
        host: '127.0.0.1',
        historyApiFallback: true,
    },
    target: 'electron-renderer',
    entry: [
        join(paths.public, 'index.html'),
        "@babel/polyfill",
        join(paths.src, 'app.tsx'),

    ],
    output: {
        path: paths.dist,
        filename: 'index.[name].js',
        chunkFilename: '[name].bundle.js',
        publicPath: './',
        // publicPath: 'https://rms.kaishens.cn/',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            '@': resolve(__dirname, 'source'),
        }
    },
    module: {
        noParse: /node_modules\/(moment\.js)/,
        rules: [
            {
                //处理jsx,js
                test: /\.(tsx|js|ts?)$/,
                // exclude: /node_modules/,
                // include: [resolve(__dirname, 'source')],
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        // getCustomTransformers: () => ({
                        //     before: [tsImportPluginFactory({
                        //         libraryName: 'antd',
                        //         libraryDirectory: 'lib',
                        //         style: true,
                        //     })]
                        // }),
                        compilerOptions: {
                            module: 'ESNext'
                        }
                    },
                },
            },
            {
                ///处理html
                test: /\.html?/,
                exclude: /node_modules/,
                include: resolve(__dirname, 'template'),
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: true  //压缩html代码
                    }
                }
            },
            {
                //处理css/scss/sass
                test: /\.(css|scss|sass)$/,
                exclude: /node_modules/,
                include: resolve(__dirname, 'source'),
                loaders: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,  //资源映射
                            modules: true,    //是否允许模块
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                //处理css/scss/sass
                test: /\.(css|scss|sass)$/,
                exclude: /source/,
                loaders: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS
                }, {
                    loader: 'less-loader', // compiles Less to CSS
                    options: {
                        lessOptions: { // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
                            javascriptEnabled: true,
                        },
                    },
                }],
            },
            {
                test: /\.(png|svg)$/,
                loader: 'file-loader'
            },
            {//处理图片文件
                test: /\.(bmp|gif|jpe?g|png|woff2|woff|eot|ttf)$/,
                exclude: /node_modules/,
                include: resolve(__dirname, 'source'),
                loader: require.resolve('url-loader'),
                options: {
                    limit: 2048,//图片在这个范围内，会将图片变成base64减少http请求
                    fallback: 'responsive-loader' //回退的loader
                }
            },
            {//处理图片文件
                test: /\.(bmp|gif|jpe?g|png|woff2|woff|eot|ttf)$/,
                exclude: /source/,
                loader: require.resolve('url-loader'),
            },
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        new ModuleConcatPlugin(),
        new LodashModuleReplacementPlugin,
        new CleanWebpackPlugin.CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: join(paths.public, 'index.html'),
            filename: 'index.html',
            title: 'Caching',
            favicon: resolve('favicon.png'),
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new CompressionPlugin({
            filename: '[path].gz[query]', //目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
            algorithm: 'gzip',//算法
            test: /\.(js|css)$/,    //压缩 js 与 css
            threshold: 1024,//只处理比这个值大的资源。按字节计算
            minRatio: 1//只有压缩率比这个值小的资源才会被处理
        })
    ]
};
