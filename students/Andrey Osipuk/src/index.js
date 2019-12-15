import 'normalize.css';
import './sass/index.scss';

import Vue from 'vue'
import App from './components/App'

Vue.config.productionTip = false
//test
new Vue({
  el: "#app",
  render: h => h(App)
});