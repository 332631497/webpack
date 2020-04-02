import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    creditNum: '',
    BasicInfo: null,
    UserInfo: null,
    BuyerState: false
  },
  mutations: {
    setCreditNum (state, creditNum) {
      state.creditNum = creditNum
    },
    setBasicInfo (state, basicinfo) {
      state.BasicInfo = basicinfo
    },
    setUserInfo (state, userInfo) {
      state.UserInfo = userInfo
    }
  }
})

export default store
