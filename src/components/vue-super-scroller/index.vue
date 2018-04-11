<template>
  <div class="root"
       ref="vueScroll"
       @touchstart="onTouchStart($event)"
       @touchmove="onTouchMove($event)"
       @touchend="onTouchEnd($event)"
       @scroll="onScroll($event)">

    <div class="div-scroll-inner" :style="{ transform:'translate3d(0,'+top+'px,0)'}" ref="scrollInner">
      <div class="div-refresh" v-if="onRefresh && !isLoading && (moving || state!=0)"
           :style="{'height':offsetH+'px','line-height':offsetH+'px'}">
        <slot name='refresh'>
          <div :class="{'div-down':state===0,'div-up':state===1,'div-refreshing':state===2 }"></div>
          <span v-if="state===0">下拉刷新</span>
          <span v-if="state===1">释放刷新</span>
          <span v-if="state===2">正在刷新...</span>
        </slot>
      </div>
      <slot></slot>

      <!-- && isLoading -->
      <div class="div-loading" v-if="!loadDisabled && onLoad "
           :style="{'height':bottomH+'px','line-height':bottomH+'px'}">
        <img src="./imgs/ic-loading.png">
        <span>加载中...</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      // 下拉刷新函数
      onRefresh: {
        type: Function,
        default: undefined
      },
      // 下拉加载中的高度
      offsetH: {
        type: Number,
        default: 44
      },
      // 底部加载
      onLoad: {
        type: Function,
        default: undefined
      },
      loadDisabled: {
        type: Boolean,
        default: true
      },
      // 底部加载中高度
      bottomH: {
        type: Number,
        default: 40
      }
    },
    data () {
      return {
        top: 0,
        // 初始位置
        startY: 0,
        // 状态变化：
        // 0: 下拉刷新 => 初始状态
        // 1: 释放加载
        // 2: 下拉刷新中
        state: 0,
        isLoading: false,
        isLocket: false,
        // 移动进行中
        moving: false
      }
    },
    methods: {
      onTouchStart (e) {
        this.startY = e.touches[0].pageY
        this.moving = false
      },

      onTouchMove (e) {
        this.isLoading = false
        if (!this.onRefresh || this.isLocket) {
          return
        }
        let diff = e.touches[0].pageY - this.startY
        if (diff < 0 || this.$el.scrollTop > 0) {
          return
        }
        this.moving = true
        e.preventDefault()
        this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offsetH : 0)
        if (this.state === 2) {
          return
        }
        if (this.top >= this.offsetH) {
          this.state = 1
        } else {
          this.state = 0
        }
      },

      onTouchEnd (e) {
        this.moving = false
        if (this.state === 2) {
          this.top = this.offsetH
          return
        }

        // 判断下拉刷新
        if (this.top > this.offsetH) {
          this.state = 2
          this.top = this.offsetH
          this.onRefresh(() => {
            this.state = 0
            this.top = 0
          })
          return
        }

        this.state = 0
        this.top = 0
      },

      // 上拉加载
      onScroll (e) {
        if (!this.onLoad || this.loadDisabled || this.isLocket) {
          return
        }
        let outerHeight = this.$refs.vueScroll.clientHeight
        let innerHeight = this.$refs.scrollInner.clientHeight
        if (innerHeight - outerHeight - this.bottomH <= this.$el.scrollTop) {
//          this.startLock()
          this.onLoad()
          this.isLoading = true
        }
      },

      // 开启锁定状态
      startLock () {
        this.isLocket = true
        setTimeout(() => {
          this.isLocket = false
        }, 2000)
      }
    }
  }
</script>

<style scoped>
  .root {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .div-scroll-inner {
    position: absolute;
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
  }

  .div-refresh {
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    color: #a1a1a1;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .div-refresh .div-down {
    display: inline-block;
    width: 40px;
    height: 40px;
    background: url('./imgs/ic-down.png') no-repeat 50%;
    background-size: 100%;
    vertical-align: middle;
    -webkit-transition-duration: .3s;
    transition-duration: .3s;
  }

  .div-refresh .div-up {
    display: inline-block;
    width: 40px;
    height: 40px;
    background: url('./imgs/ic-down.png') no-repeat 50%;
    background-size: 100%;
    vertical-align: middle;
    transform: rotate(180deg);
    -webkit-transition-duration: .3s;
    transition-duration: .3s;
  }

  .div-refresh .div-refreshing {
    display: inline-block;
    width: 40px;
    height: 40px;
    background: url('./imgs/ic-loading.png') no-repeat 50%;
    background-size: 100%;
    vertical-align: middle;
    -webkit-animation: rotation 2s linear infinite;
  }

  .div-refresh span {
    margin-left: 10px;
  }

  .div-loading {
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    color: #a1a1a1;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .div-loading img {
    width: 40px;
    -webkit-animation: rotation 2s linear infinite;
  }

  .div-loading span {
    margin-left: 10px;
    font-size: 0.4rem;
  }

  @-webkit-keyframes rotation {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }

</style>
