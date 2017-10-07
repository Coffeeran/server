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
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  template: '<App/>',
  components: { App }
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    axios.post('/api/user/get_user_info.do').then(function (res) {
      if (res.data.status === 0) {
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
