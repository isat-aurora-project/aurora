const fs = require('fs')

module.exports = {
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