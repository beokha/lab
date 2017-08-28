var config = {
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
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',

                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
}

module.exports = config;