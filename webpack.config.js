const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EnvMode = "production";

module.exports = {
    mode: EnvMode,
    devtool: 'source-map',

    entry: {
        bundle: path.resolve(__dirname, 'src/index.js'),
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: (EnvMode === 'development') ? '[name][contenthash].js' : '[name].js',
        clean: true,
        assetModuleFilename: 'assets/[name][ext]',
    },

    devServer: {
        static: {
            directory: path.resolve(__dirname, 'encite-dist')
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },

    module: {
        rules: [
            {
                test: /.(scss|css)$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            }
        ]
    },

    optimization: {
        minimizer: [
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: {
                                removeAll: true
                            }
                        }
                    ]
                }
            })
        ],
        // minimize: true
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: (EnvMode === 'development') ? 'bundle[contenthash].css' : 'bundle.css'
        }),

        new HtmlWebpackPlugin({
            title: 'Encite',
            filename: 'index.html',
            template: 'src/template.html'
        }),
    ]
}
