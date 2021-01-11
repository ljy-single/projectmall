import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 解决移动端300ms的延迟
import FastClick from 'fastclick'
// 图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 2
})

// 引入封装的toast插件
import toast from 'components/common/toast'
// 安装toast插件，会调用toast中的install方法
Vue.use(toast)
Vue.config.productionTip = false
FastClick.attach(document.body);
// 添加事件总线
Vue.prototype.$bus = new Vue()
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
