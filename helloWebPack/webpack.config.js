const path = require('path')

//const CleanWebpackPlugin = require('clean-webpack-plugin')    // clean-webpack-plugin老版本 
const { CleanWebpackPlugin } = require('clean-webpack-plugin')  // clean-webpack-plugin 3.0以上的版本
const HtmlWebpackPlugin = require('html-webpack-plugin')        // 自动生成html的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 将 css单独打包成文件，目前不支持热更新（需要刷新页面）。所以开发环境一般用style-loader
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩 css

const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')

// path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径
// __dirname: 当前模块的文件夹名称
console.log('__dirname: ', __dirname)
console.log('path.resolve: ', path.resolve(__dirname, 'dist'))

module.exports = {
  entry: {
    app: './src/app.js' // 需要打包的文件入口
  },
  output: {
    //publicPath: __dirname + '/dist/', // js 引用的路径或者 CDN 地址
    publicPath: './',  //绝对路径
    path: path.resolve(__dirname, 'dist'), // 打包文件的输出目录
    filename: '[name].bundle.js', // 打包后生产的 js 文件
    chunkFilename: '[name].js' // 代码分割后的文件名
  },
  optimization: {
    splitChunks: {  //代码分割
      chunks: 'async',    //'async','all'
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        lodash: {   //单独打包第三方的库，这个第三方库会单独存在一个文件，这个文件不能被删除，因为会被vendors调用
          name: 'lodash',
          test: /[\\/]node_modules[\\/]lodash[\\/]/,
          priority: -5    //优先级要大于 vendors 不然会被打包进 vendors
        },
        commons: {
          name: 'commons',
          minSize: 0,   //表示在压缩前的最小模块大小,默认值是 30kb
          minChunks: 2, // 最小公用次数
          priority: 5,  // 优先级
          reuseExistingChunk: true // 公共模块必开启，此为公共模块
        },
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,   //正则过滤，只有node_modules引入的第三方库才会被打包到vendors，除非单独打包第三方库。
                                            //所以打包的原则主页面直接渲染需要的三方库，打包到vendors中，其他间接使用的三方库单独打包
          priority: -10     //优先级高的会被先打包
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    // 默认情况下，此插件将删除 webpack output.path目录中的所有文件，以及每次成功重建后所有未使用的 webpack 资产。
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // 打包输出HTML
      title: '自动生成HTML',
      minify: {
        // 压缩 HTML 文件
        removeComments: true, // 移除 HTML 中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true // 压缩内联 css
      },
      filename: 'index.html', // 生成后的文件名
      template: 'index.html', // 根据此模版生成 HTML 文件
      chunks: ['app'] // entry中的 page 入口才会被打包
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'), //用于优化\最小化 CSS 的 CSS处理器，默认为 cssnano
      cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }, //传递给 cssProcessor 的选项，默认为{}
      canPrint: true //布尔值，指示插件是否可以将消息打印到控制台，默认为 true
    }),
    // 清除无用 css
    new PurifyCSS({
      paths: glob.sync([
        // 要做 CSS Tree Shaking 的路径文件
        path.resolve(__dirname, './*.html'), // 请注意，我们同样需要对 html 文件进行 tree shaking
        path.resolve(__dirname, './src/*.js')
      ])
    })
  ],
  module: {
    rules: [
      //module.rules.use数组的执行顺序是：从左往右，从下往上
      {
        test: /\.js$/, // 使用正则来匹配 js 文件
        exclude: /node_modules/, // 排除依赖包文件夹
        use: {
          loader: 'babel-loader' // 使用 babel-loader
        }
      },
      {
        test: /\.(sa|sc|c)ss$/, // 针对 .scss 或者 .css 后缀的文件设置 loader
        //use: ['style-loader', 'css-loader']
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'postcss-loader', // 使用 postcss 为 css 加上浏览器前缀
          'sass-loader' // 使用 sass-loader 将 scss 转为 css
        ]
      }
    ]
  }
}