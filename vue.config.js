const path = require('path')
const argv = require('yargs').argv
let env = argv.env// 环境

function resolve (dir) {
  return path.join(__dirname, dir)
}
let config = {
//   publicPath: '/dist/',
//   outputDir: 'dist',
  configureWebpack: {
    externals: {
      'vue': 'Vue',
      'vuex': 'Vuex',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT'
    },
    plugins: []
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@config', resolve('src/config'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/views/components'))
      .set('@views', resolve('src/views'))
      .set('@models', resolve('src/models'))
  },
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  productionSourceMap: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        resolve('src/assets/css/var.less')
      ]
    }
  },

  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: argv.api ? argv.api : 'http://dev.oa.innotechx.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/static/ueditor-1.4.3.3': {
        target: 'https://oa.innotechx.com',
        changeOrigin: true
      }
    }

  }
}
console.log('env:', env)

module.exports = config
