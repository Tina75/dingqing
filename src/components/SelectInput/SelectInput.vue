<template>
    <div>
      <el-dropdown
        class="select-input__dropdown"
        :trigger = 'trigger'
        :placement = 'placement'
        @command="handleCommand"
      >
        <el-input
            ref="input"
            type="number"
            min="-1"
            v-model="currentValue"
            @change="handleChange"
            :placeholder="placeholder"
            >
          </el-input>
        <el-dropdown-menu slot="dropdown" style="text-align: center">
          <el-dropdown-item
            v-for="(option, index) in filterOptions"
            :command="option.name"
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
      localOptions: {
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
        currentValue: '',
        composing: false, // 中文输入法不希望在写拼音的时候触发input，搜索；是在完成中文后再搜索,IME问题
        options: this.localOptions.slice()
      }
    },
    computed: {
      filterOptions () {
        if (!this.currentValue) {
          return this.options
        } else {
          return this.options.filter(opt => opt.name.indexOf(this.currentValue) !== -1)
        }
      }
    },
    watch: {
      value () {
        this.currentValue = this.value
        console.log('子组件的值改变了')
      }
    },
    methods: {
      handleCommand (name) {
        const item = this.options.find((opt) => {
          if (opt.name) {
            return opt.name === name
          }
          return opt.value === name
        })
        // this.currentValue = item.name
        // 选中某一项
        this.$emit('on-select', item.value, item)
        this.$emit('input', item.value)
      },
      handleChange (e) {
        console.log('change事件')
        console.log('this.currentValue:' + this.currentValue)
        console.log('this.value:' + this.value)
        this.$emit('input', this.currentValue)
        // this.$emit('on-select', this.currentValue, this.currentValue)
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
