import Vue from 'vue'
import VueCookies from 'vue-cookies'
import Router from 'vue-router'
import inui from 'inui'
import Main from '@/components/Main'
import TokenManage from '@/components/common/tokenManage'
import Utilities from '@/components/common/Utilities'
import Config from '@/components/common/config'
import HttpRequset from '@/components/common/HttpRequest'

Vue.use(inui)
Vue.use(VueCookies)
Vue.use(Router)
Vue.prototype.$config = Config
Vue.prototype.$request = HttpRequset
Vue.prototype.$utilities = Utilities

Vue.filter('nullText', function (value) {
  if (value === 'null' || value === '' || value === null) {
    return ' × '
  } else {
    return value
  }
})

// 解决 NavigationDuplicated 报错
const originalPush = Router.prototype.push
Router.prototype.push = function (location) { return originalPush.call(this, location).catch(err => err) }

const router = new Router({
  routes: [
    {
      component: Main,
      path: '/business'
    } ]
})
// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登录
if (process.env.NODE_ENV === 'production') {
  router.beforeEach((to, from, next) => {
    let token = localStorage.getItem(Config.get('rtKey'))
    // 后续不能通过token判断用户是否登录不准确
    if (!token || token === 'null') {
      window.location.href = Config.get('loginUrl')
    } else if (localStorage.getItem('LT') !== Config.get('loginType')) {
      Utilities.logout()
    } else { next() }
  })
} else {
  // 本地测试用token
  localStorage.setItem('BASICINFOID', '0450f49f70fc4ba6a4cfeffd5d68b829')
  localStorage.setItem('BASICINFONAME', 'XXXXXX')
  localStorage.setItem(Config.get('rtKey'), '48zEDjfV6TGp0eIl4nLD8v/pHaLlTKL5KgNqHVv+L0MB71sKaW7FXrrRTwtTo2u1')
  VueCookies.set(Config.get('atKey'), '48e6cacd-c2de-41ed-b6b3-418c0902633a', -1, '/')
}
export default router

// --------------------------------token处理---------------------------------------
TokenManage.init({ 'loginUrl': Config.get('loginUrl'), 'refreshTokenUrl': Config.get('refreshTokenUrl') })
