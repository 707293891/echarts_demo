function install (Vue) {
  // 存储服务 leancloud
  const AV = require('leancloud-storage')
  Vue.prototype.$query = AV.Query
  AV.init({
    appId: 'dmu4IASu7e75eO4HzbgDpiWg-gzGzoHsz',
    appKey: 'CjTfmITz0cllXMNq8Qg82hzp'
  })
  /**
   * 引入echarts
   */
  const echarts = require('echarts')
  Vue.prototype.$echarts = echarts

  let reszieArray = []
  Vue.prototype.reszieArray = reszieArray
  /**
   * window重绘事件
   */
  window.onresize = function () {
    let resizePart
    for (let i = 0; i < reszieArray.length; i++) {
      resizePart = reszieArray[i]
      switch (typeof resizePart) {
        case 'object':
          return resizePart.resize ? resizePart.resize : (resizePart.trigger ? resizePart.trigger('resize') : 0)
        case 'function':
          resizePart()
          break
        default :
      }
    }
  }
}
export default install
