# vue-super-scroller

[![npm](https://img.shields.io/npm/v/vue-super-scroller.svg) ![npm](https://img.shields.io/npm/dm/vue-super-scroller.svg)](https://www.npmjs.com/package/vue-super-scroller)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Example](#example)

# Installation

```
npm install vue-scroller-dm --save
```

## Global Install

Install all the components:

```javascript
import Vue from 'vue'
import VueSuperScroller from 'vue-scroller-dm'

Vue.use(VueSuperScroller)
```

# Usage

:load-disabled="!hasNext"

:on-refresh="refresh"

:on-load='loadMore'

# Example

```
<template>
  <div id="app">
    <vue-scroller :load-disabled="!hasNext" :on-refresh="refresh" :on-load='loadMore'>
      <li v-for="(item,index) in lists">{{item}}</li>
    </vue-scroller>
  </div>
</template>

<script>
  export default {
    name: 'app',
    components: {},
    data () {
      return {
        lists: [1, 2, 3],
        hasNext: true
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.loadMore()
      })
    },
    methods: {
      getRandArr (num = 20) {
        let arr = []
        for (let i = num - 1; i >= 0; i--) {
          arr.push(Math.round(Math.random() * 100))
        }
        return arr
      },

      refresh (call) {
        setTimeout(() => {
          this.lists = [1, 2, 3]
          call(true)
        }, 1000)
      },

      loadMore () {
        setTimeout(() => {
          this.lists = this.lists.concat(this.getRandArr(20))
          if (this.lists.length > 50) {
            this.hasNext = false
          }
        }, 1000)
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  li {
    height: 150px;
    text-align: center;
    line-height: 150px;
    font-size: 30px;
  }

  li:nth-child(odd) {
    background-color: #eee
  }
</style>
```

---

## License

[MIT](http://opensource.org/licenses/MIT)
