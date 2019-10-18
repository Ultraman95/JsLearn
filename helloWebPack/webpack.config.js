const path = require('path')

//const CleanWebpackPlugin = require('clean-webpack-plugin')    //clean-webpack-plugin老版本 
const { CleanWebpackPlugin } = require('clean-webpack-plugin')  // clean-webpack-plugin 3.0以上的版本

// path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径
// __dirname: 当前模块的文件夹名称
console.log('__dirname: ', __dirname)
console.log('path.resolve: ', path.resolve(__dirname, 'dist'))

module.exports = {
  entry: {
    app: './src/app.js' // 需要打包的文件入口
  },
  output: {
    publicPath: __dirname + '/dist/', // js 引用的路径或者 CDN 地址
    path: path.resolve(__dirname, 'dist'), // 打包文件的输出目录
    filename: 'bundle.js' // 打包后生产的 js 文件
  },
  plugins: [
    // 默认情况下，此插件将删除 webpack output.path目录中的所有文件，以及每次成功重建后所有未使用的 webpack 资产。
    new CleanWebpackPlugin() 
  ],
  module: {
    rules: [
      {
        test: /\.js$/, // 使用正则来匹配 js 文件
        exclude: /node_modules/, // 排除依赖包文件夹
        use: {
          loader: 'babel-loader' // 使用 babel-loader
        }
      }
    ]
  }
}