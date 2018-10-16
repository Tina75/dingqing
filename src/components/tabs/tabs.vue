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
      <el-menu-item index="/fileDetail/0">全部文件</el-menu-item>
      <el-menu-item index="/fileDetail/1">自拟文件</el-menu-item>
      <el-menu-item index="/fileDetail/2">内部传真</el-menu-item>
      <el-menu-item index="/fileDetail/3">机要文件</el-menu-item>
      <el-menu-item index="/fileDetail/4">密码电报</el-menu-item>
      <el-menu-item index="/fileDetail/5">县级文件</el-menu-item>
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
  import {logout} from 'api/user'
  export default {
    name: 'tabs',
    data () {
      return {
        superShow: localStorage.getItem('super') || false
      }
    },
    methods: {
      _logout () {
        logout().then(res => {
          console.log(res)
        })
      }
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
