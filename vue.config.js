const fs = require('fs')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

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
    config.plugins.push(new MonacoWebpackPlugin({
      languages: [
        'javascript',
        'python'
      ]
    }))
  }
}
