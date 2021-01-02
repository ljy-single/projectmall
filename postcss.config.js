module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,  //视口的宽度，对应设计稿的宽度
      viewportHeight: 667,  //视口的高度
      unitPrecision: 5, //指定px转换为视口单位的小数位数（很多时候无法整除）
      viewportUnit: 'vw', //指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['ignore'],//指定不要转换的类
      minPixelValue: 1, //小于或等于1px不转换成视口单位
      mediaQuery: false, //允许使用媒体查询中转换px
      // exclude: [/TabBar/]//指定不要转换的文件
    }
  }
}
