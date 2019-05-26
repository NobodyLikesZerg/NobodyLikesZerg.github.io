var HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");

module.exports = {
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      const [options] = args;
      return [{ ...options, inlineSource: ".(js|css)$" }];
    });

    config.plugin("inline-html").use(HtmlWebpackInlineSourcePlugin);
  }
};
