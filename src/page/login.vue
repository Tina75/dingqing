<template>
  <div class="login_page">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <div class="manage_tip">
          <p>丁青县公安局档案管理系统</p>
          <!--<img src="../../static/bg.png" alt="" class="logo">-->
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm" >
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 10px">
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
          </el-form-item>
          <div class="tips" type="error">{{msg}}</div>
          <div class="register">
            若没有账号，请先<router-link class="span" to="/register">注册</router-link>
          </div>
        </el-form>
      </section>
    </transition>
    <p class="copyright">CopyRight ©All Rights Reserved 丁青县公安局 版权所有</p>
  </div>
</template>

<script>
  import {login} from 'api/user'
  import * as config from 'api/config'
  export default {
    name: 'user',
    data () {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        msg: '',
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        showLogin: false
      }
    },
    mounted () {
      this.showLogin = true
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate(param => {
          if (param) {
            // this.$router.push({ path: '/index' })
            login(this.loginForm.username, this.loginForm.password).then((res) => {
              if (res.data.status === config.ERR_OK) {
                this.msg = ''
                this.$router.push({ path: '/index' })
                localStorage.setItem('username', this.loginForm.username)
                if (res.data.super) {
                  localStorage.setItem('super', true)
                } else {
                  localStorage.setItem('super', false)
                }
              } else {
                this.msg = res.data[config.MSG]
              }
            })
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
 @import "../common/css/logAndreg.styl"
</style>
