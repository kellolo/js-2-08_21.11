import Vue from 'vue'
import App from './App.vue'

require('./assets/style/normalize.css')
require('./assets/style/style.css')

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
