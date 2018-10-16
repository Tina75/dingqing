<template>
  <div class="TextScroll">
    <div class="text">{{dataString}}</div>
  </div>

</template>

<script>
  export default {
    name: 'textScroll',
    props: {
      dataString: {
        type: String,
        default: function () {
          return '暂时没有信息'
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  @keyframes move
    0%
      transform:translateX(0)
    100%
      transform:translateX(100%)
  .TextScroll
    width 96%
    overflow hidden
    .text
      width 100%
      animation:move 10s linear infinite
</style>
