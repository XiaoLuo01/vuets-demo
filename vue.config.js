module.exports = {
  // 反向代理
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      // 配置跨域
      '/api': {
        target: 'https://vuets-api.herokuapp.com/api/', // 你请求的第三方接口
        ws: true,
        changOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: { // 路径重写
          '^/api': ''
        }
      }
    },
    before: app => {}
  }
}