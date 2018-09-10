function install (Vue) {
  // 存储服务 leancloud
  const AV = require('leancloud-storage')
  Vue.prototype.$query = AV.Query
  AV.init({
    appId: 'dmu4IASu7e75eO4HzbgDpiWg-gzGzoHsz',
    appKey: 'CjTfmITz0cllXMNq8Qg82hzp'
  })
  Vue.prototype.$addOption = function (option,type) {
    let eh_option = AV.Object.extend('eh_option');
    let ehOption = new eh_option();
    ehOption.set("ACL",{"*":{"read":true,"write":true}})
    ehOption.set('option',JSON.parse(option));
    ehOption.set('type',type);
    ehOption.save().then(function (todo) {
      Vue.prototype.$alert('保存成功！')
    }, function (error) {
      Vue.prototype.$alert('保存失败！')
    });
  }
  Vue.prototype.$addType = function (type,typeName) {
    let eh_type = AV.Object.extend('eh_type');
    let ehType = new eh_type();
    ehType.set("ACL",{"*":{"read":true,"write":true}})
    ehType.set('type',type);
    ehType.set('type_name',typeName);
    ehType.save().then(function (todo) {
      Vue.prototype.$alert('保存成功！')
    }, function (error) {
      Vue.prototype.$alert('保存失败！')
    });
  }
  /**
   * 引入echarts
   */
  const echarts = require('echarts')
  require('echarts-liquidfill')
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
