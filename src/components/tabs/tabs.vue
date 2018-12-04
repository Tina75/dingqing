<template>
  <el-menu
    :default-active="$route.path"
    :router="true"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#324057"
    text-color="#fff"
    active-text-color="#E6A23C">
    <el-menu-item index="/index">
      文件总揽
    </el-menu-item>
    <el-submenu index="/fileDetail">
      <template slot="title" >文件详情</template>
      <el-menu-item :key="item" v-for="item in getExposedPageList" :index="getExposedPageMap[item].split(',')[0]">{{getExposedPageMap[item].split(',')[1]}}</el-menu-item>
      <!--<el-menu-item index="/fileDetail/0">全部文件</el-menu-item>-->
      <!--<el-menu-item index="/fileDetail/1">自拟文件</el-menu-item>-->
      <!--<el-menu-item index="/fileDetail/2">内部传真</el-menu-item>-->
      <!--<el-menu-item index="/fileDetail/3">机要文件</el-menu-item>-->
      <!--<el-menu-item index="/fileDetail/4">密码电报</el-menu-item>-->
      <!--<el-menu-item index="/fileDetail/5">县级文件</el-menu-item>-->
    </el-submenu>
    <el-menu-item v-if="superShow=='true'" index="/resetAndreply">
      备份恢复
    </el-menu-item>
    <el-submenu index="3">
      <template slot="title">用户管理</template>
      <el-menu-item index="/user" v-if="superShow=='true'">用户列表</el-menu-item>
      <el-menu-item  index="/login" @click.native="_logout">退出登陆</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  import {logout, getExposedPage} from 'api/user'
  export default {
    name: 'tabs',
    data () {
      return {
        superShow: localStorage.getItem('super') || false,
        /* 0=全部文件 1= 自拟文件 2= 内部传真 3= 机要文件 4= 密码电报 5= 县级文件 */
        getExposedPageList: [],
        getExposedPageMap: {
          '0': '/fileDetail/0,全部文件',
          '1': '/fileDetail/1,自拟文件',
          '2': '/fileDetail/2,内部传真',
          '3': '/fileDetail/3,机要文件',
          '4': '/fileDetail/4,密码电报',
          '5': '/fileDetail/5,县级文件'
        }
      }
    },
    methods: {
      _logout () {
        logout().then(res => {
          console.log(res)
        })
      },
      _getExposedPage () {
        getExposedPage().then(res => {
          console.log(res.data.data)
          if (res.data.status === 'false') {
            this.$message.error(res.data.msg)
            this.$router.push({ path: '/login' })
          } else {
            this.getExposedPageList = res.data.data || []
          }
        })
      }
    },
    mounted () {
      this._getExposedPage()
    }
  }
</script>

<style scoped lang="stylus">
  .el-menu-demo
    font-size 16px
  .el-menu-demo /deep/ .el-submenu__title i
    color #fff
  .el-menu--horizontal>.el-menu-item
    font-size 16px
    height 70px
    line-height 70px
  .el-menu-demo /deep/ .el-submenu__title
    height 70px
    line-height 70px
    font-size 16px
  /*.el-menu-demo /deep/ .el-menu--horizontal>.el-menu-item*/
    /*font-weight bold*/
  /*.el-menu-demo /deep/ .el-menu--horizontal>.el-menu-item.is-active*/
    /*font-weight bold*/
</style>
