/*
 *  Description:
 *  Author: LuckRain7
 *  Date: 2020-04-13 16:37:19
 */

const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  entry: {
    index: "./src/index.ts",
  },

  output: {
    path: __dirname + "/dist",
    filename: "index.js",
  },

  resolve: {
    extensions: [".js", ".json", ".ts"],
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.tsx?/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
    ],
  },

  plugins: [new VueLoaderPlugin()],
};
