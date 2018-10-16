<template>
    <div class="container">
      <div class="head">
        <p class="title">丁青县公安局档案管理系统</p>
        <div class="tabs">
          <tabs></tabs>
        </div>
      </div>
      <div class="main">
        <div class="textScroll" v-if="isSlideShow">
          <textScroll :dataString = 'slideString'></textScroll>
          <i class="el-icon-close" @click="isSlideShow = false"></i>
        </div>
        <div class="container">
          <router-view/>
        </div>
      </div>
    </div>
</template>

<script>
  import textScroll from 'components/textScroll/textScroll'
  import tabs from 'components/tabs/tabs'
  import {slide} from 'api/slide'
  import * as config from 'api/config'
  export default {
    name: 'index',
    components: {
      textScroll,
      tabs
    },
    mounted () {
      this._slide()
    },
    data () {
      return {
        slideString: '',
        isSlideShow: true
      }
    },
    methods: {
      _slide () {
        slide().then(res => {
          if (res.data.status === config.ERR_OK) {
            this.slideString = res.data.data
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../common/css/mixin.styl"
  .container
    width 100%
    height 100%
    display flex
    flex-direction column
    .head
      flex 0 0 70px
      padding:0 10%
      display flex
      background $background-color_all
      justify-content center
      overflow hidden
      .title
        flex 0 0 500px
        line-height 70px
        color $font-color-title
        font-size $font-size-l
        font-weight bold
      .tabs
        flex 1
    .main
      display flex
      flex-direction column
      flex 1
      .textScroll
        position relative
        flex 0 0 30px
        line-height 30px
        background-color:#ddd
        font-size 14px
        color #F56C6C
        .el-icon-close
          position absolute
          right 2%
          top 30%
      .container
        flex 1
        width 80%
        margin 30px auto
</style>
