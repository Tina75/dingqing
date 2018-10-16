<template>
    <div>
      <el-dropdown
        class="select-input__dropdown"
        :trigger = 'trigger'
        :placement = 'placement'
        @command="handleCommand"
      >
        <el-input
            min="1"
            type="number"
            ref="input"
            v-model="currentValue"
            :placeholder="placeholder"
            >
          </el-input>
        <el-dropdown-menu slot="dropdown" style="text-align: center">
          <el-dropdown-item
            v-for="(option, index) in options"
            :command="option.value"
            :key="index"
            >{{option.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
</template>

<script>
  export default {
    name: 'SelectInput',
    props: {
      value: String,
      trigger: {
        type: String,
        default: 'click'
      },
      placement: {
        type: String,
        default: 'bottom-start'
      },
      options: {
        type: Array,
        default: () => []
      },
      placeholder: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        composing: false, // 中文输入法不希望在写拼音的时候触发input，搜索；是在完成中文后再搜索,IME问题
        currentValue: this.value
      }
    },
    methods: {
      handleCommand (command) {
        console.log(command)
        this.currentValue = command
      }
    }
  }
</script>

<style lang="stylus">
  .select-input
    &__dropdown
      width 100%
    &__input
      &-visible
      .select-input__input-icon
        transform rotate(180deg)
        -moz-transform rotate(180deg)
        -webkit-transform rotate(180deg)
    &__clear-icon
      cursor pointer
    &__input-icon
      display none
      transition transform 0.2s ease-in-out
      -webkit-transition -webkit-transform 0.2s ease-in-out
      -moz-transition  -moz-transform 0.2s ease-in-out
</style>
