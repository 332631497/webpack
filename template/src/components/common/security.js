import axios from 'axios'
import {JSEncrypt} from 'jsencrypt'

/**
 * 获取公钥
 * @returns {*}
 */
export const getPublicKey = () => {
  return axios.get(process.env.BASE_URL + 'security/publicKey/get')
}

/**
 * 获取私钥
 * @returns {*}
 */
export const getPrivateKey = () => {
  return axios.get(process.env.BASE_URL + 'security/privateKey/get')
}

/**
 * 根据公钥获取加密后的字符串
 * @param data
 * @param key
 * @returns {*|CipherParams|PromiseLike<ArrayBuffer>}
 */
export const getEncryptResult = (data, key) => {
  // 新建JSEncrypt对象
  let encryptor = new JSEncrypt()
  // 设置公钥
  encryptor.setPublicKey(key)
  // 加密数据
  return encryptor.encrypt(data)
}

/**
 * 根据私钥解密字符串
 * @param data
 * @param key
 */
export const getDecryptResult = (data, key) => {
  if (data === null || data === '' || data === undefined) {
    return null
  } else {
    // 新建JSEncrypt对象
    let encryptor = new JSEncrypt()
    // 设置私钥
    encryptor.setPrivateKey(key)
    // 解密数据
    return encryptor.decrypt(data)
  }
}
