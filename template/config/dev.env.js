'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: '"/NewlyBuiltNetSign/"',
  USER_INFO_URL: '"/manager/public/getUserInfo"',
  LOGIN_USER_INFO: '"/manager/public/getLoginUser"',
  MENU_URL: '"/manager/public/getApplicationMenu"', // 获取当前用户菜单URL
  TREE_MENU: '"/manager/public/getUserMenuTree"' // 获取当前用户菜单树
  test: '"22"'
})
