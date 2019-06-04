const fs = require('fs')

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: '@import "~@/sass/main.scss"',
        implementation: require('sass'),
        fiber: require('fibers')
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') {
      config.devServer = {
        host: 'aurora.test',
        https: {
          key: fs.readFileSync('./server.key'),
          cert: fs.readFileSync('./server.crt'),
          ca: fs.readFileSync(process.env.HOME + '/.ssh/rootCA.pem')
        }
      }
    }
  }
}
