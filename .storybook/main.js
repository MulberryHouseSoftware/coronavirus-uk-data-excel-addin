const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  webpackFinal: config => {
    return {
      ...config,
      plugins: [
        ...config.plugins,
        new CopyWebpackPlugin([
          {
            from: "./assets",
            ignore: ["*.scss"],
            to: "assets"
          }
        ])
      ]
    };
  }
};
