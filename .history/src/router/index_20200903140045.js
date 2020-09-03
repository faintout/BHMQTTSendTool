import Vue from 'vue'
import VueRouter from 'vue-router'
import MqttSendTool from '../views/MqttSendTool.vue'
import layout from '../layout.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/MqttSendTool',
    name: 'MqttSendTool',
    component: MqttSendTool
  },
  {
    path: '/',
    name: 'layout',
    component: layout
  },
  {
    path: '/',
    name: 'MovingInfoShow',
    component: MovingInfoShow
  },
]

const router = new VueRouter({
  routes
})

export default router
