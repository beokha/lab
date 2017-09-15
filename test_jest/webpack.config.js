const config = {

    entry: {
        'index': './src/dev/index.js'
    },

    output: {
        path: __dirname + "/src/build/",
        filename: '[name].js',
    },

    devServer: {
        inline: true,
        port: 8080
    },

    module: {
        rules: [
            {
                test: /\.js*/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'react']
                        }
                    }
                ]
            }
        ]
    },
}

module.exports = config;