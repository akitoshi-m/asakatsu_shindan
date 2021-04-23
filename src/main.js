import Vue from 'vue'
import TopPage from './TopPage.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(TopPage),
}).$mount('#app')
