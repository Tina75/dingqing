import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('page/login')), 'login')
const register = r => require.ensure([], () => r(require('page/register')), 'register')
const index = r => require.ensure([], () => r(require('page/index')), 'index')
const charts = r => require.ensure([], () => r(require('page/charts')), 'charts')
const fileDetail = r => require.ensure([], () => r(require('page/fileDetail')), 'fileDetail')
const userList = r => require.ensure([], () => r(require('page/userList')), 'userList')
const resetAndreply = r => require.ensure([], () => r(require('page/resetAndreply')), 'resetAndreply')

export default new Router({
  routes: [
    {
      path: '*', redirect: '/'
    },
    {
      path: '/',
      name: 'user',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [
        {
          path: '',
          name: 'charts',
          component: charts
        },
        {
          path: '/fileDetail/:fileType',
          name: 'fileDetail',
          component: fileDetail
        },
        {
          path: '/user',
          name: 'user',
          component: userList
        },
        {
          path: '/resetAndreply',
          name: 'resetAndreply',
          component: resetAndreply
        }
      ]
    }
  ]
})
