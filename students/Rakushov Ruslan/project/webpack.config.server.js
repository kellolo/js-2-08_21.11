const path = require("path");
const nodeExternals = require("webpack-node-externals");
const copyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "src", "server", "server.js"),
  },
  output: {
    path: path.join(__dirname, "dist", "server"),
    publicPath: "",
    filename: "js/server.js",
  },
  target: "node", // important in order not to bundle built-in modules like path, fs, etc.
  externals: [nodeExternals()],
  plugins: [
    new copyWebpackPlugin([
      {
        from: "src/server/responses",
        to: "responses/[name].[ext]",
        toType: "template",
      },
    ]),
  ],
};
