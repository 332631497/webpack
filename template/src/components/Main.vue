<template>
  <div>
    <el-dialog :visible.sync="show" title="修改密码" v-loading="loading" width="30%">
      <el-form :model="model" :rules="rules" @keyup.enter.native="confirm" label-width="80px" ref="form">
        <el-form-item :key="key" :label="item" :prop="key" size="small" v-for="(item, key) in items">
          <el-input :placeholder="'请输入' + item" show-password v-model="model[key]"/>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align: center;">
        <el-button @click="show = false" size="small">取消</el-button>
        <el-button @click="confirm" size="small" type="primary">确定</el-button>
      </div>
    </el-dialog>
    <in-layout-manager :menuUrl="menuUrl" :title="title" :user="user" @changePassword="changePassword" @logout="logout"
                       ref="layout"/>
  </div>
</template>

<script>
import VueCookies from 'vue-cookies'
export default {
  created () { this.getUserInfo() },
  data () {
    const same = (rule, value, callback) => {
      if (value !== this.model.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      items: { password: '原密码', newPassword: '新密码', confirm: '确认密码' },
      loading: false,
      menuUrl: '',
      model: { basicId: localStorage.getItem('BASICINFOID') },
      rules: {
        confirm: [ { message: '请再次输入密码', required: true, trigger: 'blur' }, { validator: same, trigger: 'blur' } ],
        newPassword: [ { message: '请输入新密码', required: true, trigger: 'blur' } ],
        password: [ { message: '请输入原密码', required: true, trigger: 'blur' } ]
      },
      show: false,
      title: '石河子市新建商品房网签备案系统',
      user: { alias: localStorage.getItem('BASICINFONAME'), name: 'company' }
    }
  },
  methods: {
    changePassword () {
      this.model = { id: this.$store.state.UserInfo.userId }
      this.show = true
    },
    confirm () {
      this.$refs.form.validate().then(_ => {
        this.loading = true
        this.model.password = this.$utilities.encrypt(this.model.password)
        this.model.newPassword = this.$utilities.encrypt(this.model.newPassword)
        this.axios.put(process.env.BASE_URL + 'userRole/password/change', this.model).then(res => {
          if (res.data.data === true) {
            this.message('修改成功', 'success')
            this.show = false
          } else { this.message('密码错误', 'error') }
        }).catch(_ => { this.message('修改失败', 'error') }).finally(_ => { this.loading = false })
      }).catch(_ => { this.message('请填写完整') })
    },
    getUserInfo () {
      this.axios.get(process.env.LOGIN_USER_INFO).then(res => {
        this.$store.commit('setUserInfo', res.data.data.userInfo)
        if (res.data.data.userInfo.userTypeName === '房管') {
          this.user.alias = this.user.name = res.data.data.userName
        }
      })
      this.axios.get(process.env.USER_INFO_URL).then(res => {
        this.$store.commit('setBasicInfo', res.data.data)
        this.$store.commit('setCreditNum', res.data.data.creditNum)
      })
    },
    logout () {
      // if (process.env.NODE_ENV !== 'production') {
      //   return
      // }
      let accessToken = VueCookies.get(this.$config.get('atKey'))
      if (accessToken) {
        this.axios.request({
          baseURL: '', method: 'DELETE', url: this.$config.get('logoutUrl') + '?access_token=' + accessToken
        }).then(_ => { this.$utilities.logout() }).catch(err => {
          console.log(err)
          this.$message({ message: '请求错误!', showClose: true, type: 'error' })
        })
      } else { this.$utilities.logout() }
    },
    message (msg, type) { this.$message({ message: msg, showClose: true, type: type }) }
  },
  mounted () {
    this.menuUrl = process.env.MENU_URL + '/' + this.$config.get('appId')
    this.$refs.layout.loadMenu(this.menuUrl)
    VueCookies.set('menu_url', this.menuUrl)
  },
  name: 'Main'
}
</script>

<style scoped>

</style>
