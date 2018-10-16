<template>
  <div>
    <div class="reset">
      <h3 style="margin-bottom: 20px">备份：</h3>
      <el-button type="primary" @click="_backup">备份</el-button>
    </div>
    <div class="reply" style="margin-top: 30px">
      <h3 style="margin-bottom: 20px">恢复：</h3>
      <el-date-picker
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd"
        v-model="time">
      </el-date-picker>
      <el-button type="primary" @click="_restore">恢复</el-button>
    </div>
  </div>
</template>

<script>
  import {backup, restore} from 'api/resetAndreply'
  import * as config from 'api/config'
  export default {
    name: 'resetAndreply',
    data () {
      return {
        time: ''
      }
    },
    methods: {
      _backup () {
        backup().then(res => {
          if (res.data.status === config.ERR_OK) {
            this.$message({
              message: res.data.msg
            })
          } else {
            this.$alert(res.data.msg, '提示')
          }
        })
      },
      _restore () {
        restore(this.time).then(res => {
          if (res.data.status === config.ERR_OK) {
            this.$message({
              message: res.data.msg
            })
          } else {
            this.$alert(res.data.msg, '提示')
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
