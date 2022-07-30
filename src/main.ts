import HttpRequest from './HttpRequest';
import AdapterAjax from './AdapterAjax';
const  API_HOST = 'http://localhost:3000'
const adapter = new AdapterAjax()
const httpRequest = new HttpRequest(adapter)
httpRequest.setBaseUrl(API_HOST)

httpRequest.interceptor.request.use({
  resolveHandler: (res) => {
    return res
  },
  rejectHandler: (err) => {
    return Promise.reject(err)
  }
})
httpRequest.interceptor.response.use({
  resolveHandler: (res) => {
    // throw new Error('error 333')
    return JSON.stringify(res)
  },
  rejectHandler: (err) => {
    window.alert(err)
    return Promise.reject(err)
  }
})
httpRequest.get({url: `/post`, withCredentials: true}).then(res => {
  console.log(res);
  showInHtml(res)
})


function showInHtml (res: string) {
  document.body.innerHTML = res
}