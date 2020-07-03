const stylelintPlugin = require("stylelint-webpack-plugin");

module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    plugins: [new stylelintPlugin({ files: ["src/**/*.{vue,scss}"] })],
  },
};
