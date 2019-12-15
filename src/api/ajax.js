/*
一个能发送ajax请求的函数
1. 统一处理请求异常
2. 异步请求成功的数据不是response, 而是response.data
3. 对post请求参数进行ulencode处理, 而不使用默认的json方式(后台接口不支持)
4. 配置请求超时的时间
5. 通过请求头携带token数据
*/

//暴露一个接口
import axios from 'axios'

export default function ajax(url, data = {}, type = "GET") {
  //高阶函数
  return new Promise(function (resolve, reject) {
    //执行异步请求
    let promise
    if (type == 'GET') {
      //准备url query参数
      let dataStr = ''
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr != '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      promise = axios.get(url)
    } else {
      promise = axios.post(url, data)
    }

    promise.then(function (response) {
      //成功resolve
      resolve(response.data)
    }).catch(function (error) {
      //失败reject
      reject(error)
    })

  })
}
