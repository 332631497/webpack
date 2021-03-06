'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  BASE_URL: '"/NewlyBuiltNetSign/"',
  USER_INFO_URL: '"/shz-manager/public/getUserInfo"',
  LOGIN_USER_INFO: '"/shz-manager/public/getLoginUser"',
  MENU_URL: '"/shz-manager/public/getApplicationMenu"', // 获取当前用户菜单URL
  TREE_MENU: '"/shz-manager/public/getUserMenuTree"' // 获取当前用户菜单树
})
