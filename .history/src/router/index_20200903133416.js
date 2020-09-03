import Vue from 'vue'
import VueRouter from 'vue-router'
import MqttSendTool from '../views/MqttSendTool.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'MqttSendTool',
    component: Home
  },
]

const router = new VueRouter({
  routes
})

export default router
