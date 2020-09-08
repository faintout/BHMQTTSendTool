import Vue from "vue";
import VueRouter from "vue-router";
// import { resolve } from "core-js/fn/promise";
// import MqttSendTool from "../views/MqttSendTool.vue";
// import MovingInfoShow from "../views/MovingInfoShow.vue";
// import layout from "../views/layout.vue";

Vue.use(VueRouter);

//路由懒加载
const routes = [
  {
    path: "/",
    name: "layout",
    redirect:'/MqttSendTool',
    component: resolve=>require(['../views/layout.vue'],resolve),
    children: [
      {
        path: "/MqttSendTool",
        name: "MqttSendTool",
        component: resolve=>require(['../views/MqttSendTool.vue'],resolve),
      },
      {
        path: "/MovingInfoShow",
        name: "MovingInfoShow",
        component: resolve=>require(['../views/MovingInfoShow.vue'],resolve)
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
