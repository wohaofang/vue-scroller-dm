/**
 * @author walid
 * @date 2017/1/7
 * @description 入口文件
 */

import _VueSuperScroller from './components/vue-super-scroller/index.vue'

export function install (Vue) {
  Vue.component('vue-super-scroller', _VueSuperScroller)
}

export const VueSuperScroller = _VueSuperScroller

export default {
  install
}
