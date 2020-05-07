module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: 'http://localhost:8888/api',
        pathRewrite: { "^/api": "" },
        ws: true,
        secure: false,
        changeOrigin: true,
        logLevel: 'debug'
      }
    }
  }
};
