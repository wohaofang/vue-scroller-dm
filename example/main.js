/**
 * @author walid
 * @date 2016/11/30
 * @description 程序入口
 */

import Vue from 'Vue'
import App from './App.vue'
import VueSuperScroller from 'vue-super-scroller'

Vue.use(VueSuperScroller)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  ...App
})
