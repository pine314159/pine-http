export interface Config {
  // `url` 是用于请求的服务器 URL 必传
  url: string;

  // `method` 是创建请求时使用的方法
  method?: string; // 默认值GET

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL?: string;

  // 自定义请求头
  headers?: {};

  // `params` 是与请求一起发送的 URL 参数
  // 必须是一个简单对象
  params?: {};

  // `data` 是作为请求体被发送的数据
  // 仅适用'POST'请求方法
  data?: {};

  // `timeout` 指定请求超时的毫秒数。
  // 如果请求时间超过 `timeout` 的值，则请求会被中断
  timeout?: number; // 默认值是 `0` (永不超时)

  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials?: boolean; // default

  // `responseType` 表示浏览器将要响应的数据类型
  // 选项包括: 'arraybuffer', 'document', 'json', 'text', 'stream'
  // 浏览器专属：'blob'
  responseType?: string; // 默认值
}

export interface Adapter {
  send: (config: Config) => Promise<any>;
}

export interface InterceptorItem {
  resolveHandler: (res: any) => any,
  rejectHandler: (err: any) => Promise<PromiseRejectedResult>
}

