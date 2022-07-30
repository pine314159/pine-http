import { Adapter, Config } from './types';
import Interceptor from './Interceptor';

const defaultConfig: Config = {
  url: '',
  method: 'GET', // 默认值GET
  baseURL: '',
  headers: {},
  params: {},
  data: {},
  timeout: 0, // 默认值是 `0` (永不超时)
  withCredentials: false, // default
  responseType: 'json' // 默认值
};

export default class HttpRequest {
  public static handleError(err: any): string {
    if (typeof err === 'string') return err;
    if (err instanceof Error) return err.message;
    return '服务器繁忙，请稍后再试'
  }
  public get interceptor () {
    return {
      request: this._requestInterceptor,
      response: this._responseInterceptor
    };
  }

  _adapter!: Adapter;
  _requestInterceptor!: Interceptor;
  _responseInterceptor!: Interceptor;
  _baseURL?: string;

  constructor (adapter: Adapter) {
    this._adapter = adapter;
    this._requestInterceptor = new Interceptor();
    this._responseInterceptor = new Interceptor();
  }

  get (config: Config) {
    config.method = 'GET';
    return this.request(config);
  }

  post (config: Config) {
    config.method = 'POST';
    return this.request(config);
  }

  async request (config: Config) {
    if (!config.url) throw new Error('url is not found');
    const c = this._mergeConfig(config);
    const options = await this._requestInterceptor.exec(c);
    const response = await this._adapter.send(options);
    console.log(response);
    const res = await this._responseInterceptor.exec(response);
    return res;
  }

  setBaseUrl (baseUrl?: string) {
    if (baseUrl !== undefined) {
      this._baseURL = baseUrl;
    }
  }

  private _mergeConfig (config: Config) {
    this.setBaseUrl(config.baseURL);
    const newConfig = Object.assign(defaultConfig, config);
    newConfig.method = newConfig.method?.toUpperCase();
    newConfig.url = this._getUrl(newConfig.url);
    return newConfig;
  }

  private _getUrl (url: string): string {
    if (this._baseURL !== undefined && !url.startsWith('http')) {
      if (url.startsWith('/')) {
        url = url.substring(1);
      }
      return `${this._baseURL}/${url}`;
    }
    return url
  }
}
