import axios from 'axios'
export default {
  get (url, callBack) {
    axios.get(url).then(res => {
      callBack('success', res.data.data)
    }).catch(e => {
      callBack('error', e)
    })
  },
  getWithData (url, data, callBack) {
    axios.get(url, data).then(res => {
      callBack('success', res.data.data)
    }).catch(e => {
      callBack('error', e)
    })
  },
  post (url, callBack) {
    axios.post(url).then(res => {
      callBack('success', res.data.data)
    }).catch(e => {
      callBack('error', e)
    })
  },
  postWithData (url, data, callBack) {
    axios.post(url, data).then(res => {
      callBack('success', res.data.data)
    }).catch(e => {
      callBack('error', e)
    })
  },
  put (url, callBack) {
    axios.put(url).then(res => {
      callBack('success', res.data.data)
    }).catch(e => {
      callBack('error', e)
    })
  },
  putWithData (url, data, callBack) {
    axios.put(url, data).then(res => {
      callBack('success', res.data.data)
    }).catch(e => {
      callBack('error', e)
    })
  },
  delete (url, callBack) {
    axios.delete(url).then(res => {
      callBack('success', res.data.data)
    }).catch(e => {
      callBack('error', e)
    })
  },
  deleteWithData (url, data, callBack) {
    axios.delete(url, data).then(res => {
      callBack('success', res.data.data)
    }).catch(e => {
      callBack('error', e)
    })
  }
}
