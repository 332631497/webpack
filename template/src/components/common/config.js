/**
 * 全局配置
 * createBy:      lc
 * createTime:    2019/9/24 11:52:27
 */
export default{
  data: {
    appId: '2d35ccdf3e844ade8fdb92e3ab8c1286', // 系统ID
    atKey: 'access_token', // 存储access_token用的key
    loginType: 'OA_MGR_N',
    loginUrl: '/login', // 个人受理系统
    logoutUrl: '/shz-o2a/oauthCustomize/logout', // 刷新token
    refreshTokenUrl: '/shz-manager/public/refreshToken', // 刷新token
    rtKey: 'refresh_token', // 存储refresh_token用的key
    userUrl: '/shz-manager/public/getUserInfo'
  },
  get (str) { return this.data[str] }
}
