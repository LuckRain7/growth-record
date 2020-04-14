/*
 *  Description:
 *  Author: LuckRain7
 *  Date: 2020-04-13 16:37:19
 */

const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  entry: {
    index: "./src/index.js"
  },

  output: {
    path: __dirname + "/dist",
    filename: "index.js"
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      }
    ]
  },

  plugins: [new VueLoaderPlugin()]
};
