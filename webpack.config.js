import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  entry: path.resolve("src", "index.js"),
  output: {
    filename: "build.[contenthash:8].js",
    path: path.resolve("docs"),
    assetModuleFilename: path.join("images", "[name].[contenthash][ext]"),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve("src", "index.html"),
      minify: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|webp|avif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        type: "asset/resource",
        generator: {
          filename: path.resolve("icons", "[name].[contenthash:8][ext]"),
        },
      },
    ],
  },
  devServer: {
    watchFiles: path.resolve("src"),
    port: 9000,
    open: true,
  },
};
