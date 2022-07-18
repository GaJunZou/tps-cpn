const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: './',
  assetsDir: 'static',
  devServer: {
    disableHostCheck: true,
    // https://cli.vuejs.org/zh/config/#devserver-proxy
    proxy: {
      '/api': {
        target: 'http://172.16.5.214:8021/spalllisterapp',
        pathRewrite: (path) => path.replace('/api', ''),
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        '@utils': '@/utils',
      },
    },
  },
};
