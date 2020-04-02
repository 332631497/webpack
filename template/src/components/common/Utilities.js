/**
 * 全局通用方法定义
 * 在Vue的模块中这么使用：this.$utilities.本模块的方法名()
 * createBy:      xiechl
 * createTime:    2019/9/6 08:39:27
 * modifyBy:      xiechl
 * modifyTime:    2019年9月16日 11:43:55
 * modifyContent: 修改为扩展选项
 */
import CryptoJS from 'crypto-js'
import VueCookies from 'vue-cookies'
import XLSX from 'xlsx'
import Config from '@/components/common/config'

// 默认的 KEY 与 iv
const KEY = '1234123412341234'// 密钥
const IV = 'abcdabcdabcdabcd'// 偏移量
export default{
  /**
   * AES 解密: 字符串 key iv  返回base64
   */
  Decrypt (word, keyStr, ivStr) {
    let key = KEY
    let iv = IV
    if (keyStr) {
      key = keyStr
      iv = ivStr
    }
    key = CryptoJS.enc.Utf8.parse(key)
    iv = CryptoJS.enc.Utf8.parse(iv)
    const base64 = CryptoJS.enc.Base64.parse(word)
    const src = CryptoJS.enc.Base64.stringify(base64)
    const decrypt = CryptoJS.AES.decrypt(src, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    })
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    return decryptedStr.toString()
  },
  /**
   * AES加密 ：字符串 key iv  返回base64
   */
  Encrypt (word, keyStr, ivStr) {
    let key = KEY
    let iv = IV
    if (keyStr) {
      key = keyStr
      iv = ivStr
    }
    key = CryptoJS.enc.Utf8.parse(key)
    iv = CryptoJS.enc.Utf8.parse(iv)
    const srcs = CryptoJS.enc.Utf8.parse(word)
    const encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    })
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
  },
  encrypt (str) {
    const key = CryptoJS.enc.Utf8.parse(str)
    const wordArr = CryptoJS.AES.encrypt(key, key, {
      iv: key,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    return encodeURIComponent(wordArr.ciphertext)
  },
  fetchOptions (that, list, code) {
    that.axios.get(this.getBaseUrl() + 'dict/query/' + code).then(res => {
      for (let i = 0; i < res.data.data.length; ++i) { list.push(res.data.data[i].dictValue) }
    }).catch(_ => { that.$message.error('获取字典项失败, 字典编码:' + code) })
  },
  panelOptions (that, list, code) {
    that.axios.get(this.getBaseUrl() + 'dict/query/' + code).then(res => {
      for (let i = 0; i < res.data.data.length; ++i) { list.push({name: res.data.data[i].dictValue}) }
    }).catch(_ => { that.$message.error('获取字典项失败, 字典编码:' + code) })
  },
  getBaseUrl () {
    return process.env.BASE_URL
  },
  getHeaders () { return { 'Authorization': 'Bearer ' + VueCookies.get(Config.get('atKey')) } },
  logout () {
    VueCookies.remove(Config.get('atKey'), '/')
    localStorage.removeItem(Config.get('rtKey'))
    localStorage.removeItem('LT')
    window.location.href = Config.get('loginUrl')
  },
  openDownloadDialog (url, saveName) {
    if (typeof url === 'object' && url instanceof Blob) {
      url = URL.createObjectURL(url) // 创建blob地址
    }
    let aLink = document.createElement('a')
    aLink.href = url
    aLink.download = saveName || '' // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    let event = null
    if (window.MouseEvent) {
      event = new MouseEvent('click')
    } else {
      event = document.createEvent('MouseEvents')
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    }
    aLink.dispatchEvent(event)
  },
  s2ab (s) {
    let buf = new ArrayBuffer(s.length)
    let view = new Uint8Array(buf)
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF
    }
    return buf
  },
  sheet2blob (jsonData, sheetName) {
    let sheet = XLSX.utils.json_to_sheet(jsonData)
    sheetName = sheetName || 'sheet1'
    let workbook = { SheetNames: [sheetName], Sheets: {} }
    workbook.Sheets[sheetName] = sheet // 生成excel的配置项

    const wopts = {
      bookSST: false, // 是否生成Shared String Table, 官方解释是, 如果开启生成速度会下降, 但在低版本IOS设备上有更好的兼容性
      bookType: 'xlsx', // 要生成的文件类型
      type: 'binary'
    }
    // 字符串转ArrayBuffer
    return new Blob([this.s2ab(XLSX.write(workbook, wopts))], {type: 'application/octet-stream'})
  }
}
