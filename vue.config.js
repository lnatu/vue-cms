module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: 'http://localhost:8080/api',
        pathRewrite: { "^/api": "" },
        ws: true,
        secure: false,
        changeOrigin: true,
        logLevel: 'debug'
      }
    }
  }
};
