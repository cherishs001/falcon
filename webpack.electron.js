const path = require('path')

const rootPath = path.resolve(__dirname, './')

module.exports = {
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    devtool: 'source-map',
    entry: path.resolve(rootPath, 'electron', 'main.ts'),
    target: 'electron-main',
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                exclude: /node_modules/,
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
                }
            }
        ]
    },
    node: {
        __dirname: false
    },
    output: {
        path: path.resolve(rootPath, 'dist'),
        filename: '[name].js'
    },
    externals: {
        'sqlite3':'commonjs sqlite3'
    }
}
