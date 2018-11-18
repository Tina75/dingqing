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
              <div v-for="item in props.row.permissions">
                <div class="body" v-if="JSON.parse(item)[1]">
                  <div class="item">自拟文件</div>
                  <div class="item">
                    <el-checkbox-group v-model="JSON.parse(item)[1]" @change="_modifyUser(props.row)">
                      <el-checkbox label="import">导入</el-checkbox>
                      <el-checkbox label="export">导出</el-checkbox>
                      <el-checkbox label="insert" >新增</el-checkbox>
                      <el-checkbox label="delete"> 删除</el-checkbox>
                      <el-checkbox label="update">修改</el-checkbox>
                      <el-checkbox label="view">查看</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
                <div class="item" v-if="JSON.parse(item)[2]">内部文件</div>
                <div class="item" v-if="JSON.parse(item)[3]">机要文件</div>
                <div class="item" v-if="JSON.parse(item)[4]">密码文件</div>
                <div class="item" v-if="JSON.parse(item)[5]">县级文件</div>
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
          label="权限">
          <template slot-scope="scope">
            <!--<span v-for="item in scope.row.permissions">{{item}}</span>-->
            <div>scope.row.permissions</div>
            <el-checkbox-group v-model="scope.row.permissions" @change="_modifyUser(scope.row)">
              <el-checkbox label="insert" >新增</el-checkbox>
              <el-checkbox label="delete"> 删除</el-checkbox>
              <el-checkbox label="update">更新</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
        width="100">
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
          <el-button type="primary" @click="_modifyUser(false)">确 定</el-button>
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
            this.tableData = res.data.data
          }
        })
      },
      _modifyUser (row) {
        console.log(row)
        if (row) {
          this.modifyDate = {
            username: row.user.username,
            password: row.user.password,
            id: row.user.id,
            permissions: row.permissions
          }
        }
        console.log(this.modifyDate.permissions)
        modifyUser(this.modifyDate).then(res => {
          if (res.data.status === config.ERR_OK) {
            this.$message({
              message: '修改成功'
            })
          } else {
            this.$alert(res.data.msg, '提示')
          }
          this.modifyShow = false
          this._search() // 刷新数据
        })
      },
      modifyClick (row) {
        this.modifyShow = true
        this.modifyDate = {
          username: row.user.username,
          password: row.user.password,
          id: row.user.id,
          permissions: row.permissions
        }
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
    .head,.body
      display flex
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
