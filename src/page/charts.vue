<template>
  <div>
    <div class="block">
      <span class="input-label">起始时间：</span>
      <el-date-picker
        class="detail-input"
        value-format="yyyy-MM-dd"
        v-model="time"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <el-button type="primary" @click="_statistics()" style="margin-left: 15px">搜索</el-button>
    </div>
    <div class="charts">
      <div class="container-charts">
        <ve-pie :data="chartData" ></ve-pie>
      </div>
      <div class="container-table">
        <el-table
          row-class-name="row"
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="fileType"
            label="文件类型"
            >
          </el-table-column>
          <el-table-column
            prop="rollCount"
            label="总卷数"
            >
          </el-table-column>
          <el-table-column
            prop="fileCount"
            label="总文件数">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import {statistics} from 'api/charts'
  export default {
    name: 'charts',
    created () {
      this._statistics()
    },
    methods: {
      _statistics () {
        let data = {
          start: this.time[0] || '',
          end: this.time[1] || ''
        }
        statistics(data).then(res => {
          this.tableData = [...res.data.data.typeStatistics]
          console.log(res.data.data.typeStatistics)
          this.tableData.push({
            fileCount: res.data.data.fileCount,
            fileType: '汇总',
            rollCount: res.data.data.rollCount
          })
          console.log(res.data.data.typeStatistics)
          this.chartData.rows = [...res.data.data.typeStatistics]
        })
      }
    },
    data () {
      return {
        tableData: [],
        chartData: {
          columns: ['fileType', 'fileCount'], // fileCount
          rows: []
        },
        time: ['', '']
        // chartSettings: {
        //   legendName: {
        //     'profit': 'haha'
        //   }
        // }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .block
    margin 0 0 50px 6%
    .input-label
      font-size 14px
      color #666
    .el-date-editor /deep/ .el-range-separator
      width 7%
      /*line-height 25px*/
  .charts
    display flex
    .container-table
    .container-charts
      flex 1
</style>
