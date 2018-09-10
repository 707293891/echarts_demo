import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'index'
      },
      params: {
        type: 'line'
      }
    },
    {
      path: '/:type',
      name: 'index',
      component: () => import('@/components/Index')
    }
  ]
})
