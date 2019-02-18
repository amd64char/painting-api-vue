// src/main.js

import Vue from 'vue'
import App from './components/App'

import './scss/app.scss';

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})