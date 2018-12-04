<template>
  <div class="detail-container">
    <div class="search">
      <div class="concatField">
        <el-input
          placeholder="请输入关键字"
          v-model="id"
          clearable>
        </el-input>
        <el-button type="primary" @click="_search">搜索</el-button>
      </div>
    </div>
    <div class="table">
      <el-table
        border
        :data="tableData"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="table-inner">
              <div class="head">
                <div class="item">文件类型</div>
                <div class="item">权限</div>
              </div>
              <div v-for="(item, index) in props.row.permissions" :key="index">
                <div class="body" v-if="item[1]">
                  <div class="item">自拟文件</div>
                  <div class="item">
                    <el-checkbox-group v-model="props.row.permissions[index][1]">
                      <el-checkbox label="import">导入</el-checkbox>
                      <el-checkbox label="export">导出</el-checkbox>
                      <el-checkbox label="insert" >新增</el-checkbox>
                      <el-checkbox label="delete"> 删除</el-checkbox>
                      <el-checkbox label="update">修改</el-checkbox>
                      <el-checkbox label="view">查看</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
                <div class="body" v-if="item[2]">
                  <div class="item">内部传真</div>
                  <div class="item">
                    <el-checkbox-group v-model="props.row.permissions[index][2]" >
                      <el-checkbox label="import">导入</el-checkbox>
                      <el-checkbox label="export">导出</el-checkbox>
                      <el-checkbox label="insert" >新增</el-checkbox>
                      <el-checkbox label="delete"> 删除</el-checkbox>
                      <el-checkbox label="update">修改</el-checkbox>
                      <el-checkbox label="view">查看</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
                <div class="body" v-if="item[3]">
                  <div class="item">机要文件</div>
                  <div class="item">
                    <el-checkbox-group v-model="props.row.permissions[index][3]">
                      <el-checkbox label="import">导入</el-checkbox>
                      <el-checkbox label="export">导出</el-checkbox>
                      <el-checkbox label="insert" >新增</el-checkbox>
                      <el-checkbox label="delete"> 删除</el-checkbox>
                      <el-checkbox label="update">修改</el-checkbox>
                      <el-checkbox label="view">查看</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
                <div class="body" v-if="item[4]">
                  <div class="item">密码电报</div>
                  <div class="item">
                    <el-checkbox-group v-model="props.row.permissions[index][4]" >
                      <el-checkbox label="import">导入</el-checkbox>
                      <el-checkbox label="export">导出</el-checkbox>
                      <el-checkbox label="insert" >新增</el-checkbox>
                      <el-checkbox label="delete"> 删除</el-checkbox>
                      <el-checkbox label="update">修改</el-checkbox>
                      <el-checkbox label="view">查看</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
                <div class="body" v-if="item[5]">
                  <div class="item">县级文件</div>
                  <div class="item">
                    <el-checkbox-group v-model="props.row.permissions[index][5]" >
                      <el-checkbox label="import">导入</el-checkbox>
                      <el-checkbox label="export">导出</el-checkbox>
                      <el-checkbox label="insert" >新增</el-checkbox>
                      <el-checkbox label="delete"> 删除</el-checkbox>
                      <el-checkbox label="update">修改</el-checkbox>
                      <el-checkbox label="view">查看</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </div>
              <div class="btn" v-if="props.row.permissions.length>0">
                <el-button type="primary" size="small" @click="modifyUserBtn(props.row)">确认修改</el-button>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="user.id"
          label="ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="user.username"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="user.password"
          label="密码">
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button @click="modifyClick(scope.row)" type="warning" size="small">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <el-dialog :visible.sync="modifyShow"  title="修改">
          <div class="detail">
            <div class="detail-item">
              <span class="input-label">用户名：</span>
              <el-input class="detail-input" v-model="modifyDate.username"></el-input>
            </div>
            <div class="detail-item">
              <span class="input-label">密码：</span>
              <el-input class="detail-input" v-model="modifyDate.password"></el-input>
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="modifyShow = false">取 消</el-button>
          <el-button type="primary" @click="_modifyUser()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {search, modifyUser} from 'api/user'
  import * as config from 'api/config'
  export default {
    name: 'userList',
    data () {
      return {
        tableData: [],
        id: '',
        modifyShow: false,
        modifyDate: {
          username: '',
          password: '',
          id: '',
          permissions: []
        }
      }
    },
    mounted () {
      this._search()
    },
    methods: {
      _search () {
        search(this.id).then(res => {
          if (res.data.status === config.ERR_OK) {
            let data = res.data.data
            for (let i = 0; i < data.length; i++) {
              data[i].permissions = data[i].permissions.map(item => {
                return JSON.parse(item)
              })
            }
            console.log(data)
            this.tableData = data
          }
        })
      },
      modifyUserBtn (row) {
        this.modifyData(row)
        this._modifyUser()
      },
      _modifyUser () {
        modifyUser(this.modifyDate).then(res => {
          if (res.data.status === config.ERR_OK) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          } else {
            this.$alert(res.data.msg, '提示')
          }
          this.modifyShow = false
          this._search() // 刷新数据
        })
      },
      modifyData (row) { // 修改时数据处理
        let data = []
        data = row.permissions.map(item => {
          return JSON.stringify(item)
        })
        this.modifyDate = {
          username: row.user.username,
          password: row.user.password,
          id: row.user.id,
          permissions: data
        }
      },
      modifyClick (row) {
        this.modifyShow = true
        this.modifyData(row)
      }
    }
  }
</script>
<style>
  .el-table th, .el-table thead tr{
    background: #f5f7fa!important;
    font-weight: bold;
    color: #000;
  }
</style>
<style scoped lang="stylus">
  .table-inner
    .btn
      text-align right
      margin-right: 8%
      margin-top: 20px
    .head,.body
      display flex
      /*border-bottom 1px solid #ddd*/
      .item
        flex 1
        padding: 12px 0
  .detail-container
    .search
      .concatField
        overflow hidden
        .el-input
          width 400px
    .table
      margin 30px 0
</style>
