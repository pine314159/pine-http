import HttpRequest from '../core/HttpRequest';
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
    return JSON.stringify(res)
  },
  rejectHandler: (err) => {
    return Promise.reject(err)
  }
})
httpRequest.get({url: `/posts`, withCredentials: true}).then(res => {
  showInHtml(res)
}).catch(err => {
  console.log(err);
})


function showInHtml (res: string) {
  document.body.innerHTML = res
}