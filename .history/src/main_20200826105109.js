import Vue from 'vue'
import App from './App.vue'
import router from './router'
import $ from 'jquery'
import element-ui from 'element-ui'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')