import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  entry: path.resolve("src", "index.js"),
  output: {
    filename: "build.[contenthash:8].js",
    path: path.resolve("docs"),
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
        test: /\.html$/i,
        loader: "html-loader",
      },
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
        generator: {
          filename: "images/[name].[contenthash][ext]",
        },
      },
      {
        test: /\.svg$/,
        type: "asset/resource",
        generator: {
          filename: "icons/[name].[contenthash][ext]",
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
