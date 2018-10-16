<template>
  <div id="app" class="fillcontain">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="stylus">
  @import "./common/css/reset.styl"
  @import "./common/css/mixin.styl"
  .fillcontain
    width 100%
    height 100%
</style>
