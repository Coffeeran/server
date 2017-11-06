// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    axios.post('/api/user/get_user_info.do').then(function (res) {
      if (res.data.status === 0) {
        Vue.prototype.userBranch = res.data.data.branch
        next()
      } else {
        next({
          name: 'login'
        })
      }
    })
  } else {
    next()
  }
})

Vue.prototype.message = function (msg, success) {
  this.$notify({
    title: success ? '成功' : '错误',
    message: msg,
    offset: 100,
    type: success ? 'success' : 'warning'
  })
}

Vue.prototype.by = function (name) {
  return function (o, p) {
    var a, b
    if (typeof o === 'object' && typeof p === 'object' && o && p) {
      a = o[name]
      b = p[name]
      if (a === b) {
        return 0
      }
      if (typeof a === typeof b) {
        return a < b ? -1 : 1
      }
      return typeof a < typeof b ? -1 : 1
    } else {
      return null
    }
  }
}

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  template: '<App/>',
  components: { App }
})
