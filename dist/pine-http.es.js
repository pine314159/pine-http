var u = Object.defineProperty;
var c = (r, e, t) => e in r ? u(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var n = (r, e, t) => (c(r, typeof e != "symbol" ? e + "" : e, t), t);
class h {
  constructor() {
    n(this, "handlers", []);
  }
  use(e) {
    return this.handlers.push(e), this.handlers.length - 1;
  }
  unUse(e) {
    this.handlers.splice(e, 1);
  }
  exec(e) {
    return this.handlers.reduce(
      (t, s, a) => {
        var o;
        return t.then(s.resolveHandler, (o = this.handlers[a - 1]) == null ? void 0 : o.rejectHandler);
      },
      Promise.resolve(e)
    ).catch(this.handlers[this.handlers.length - 1].rejectHandler);
  }
}
const d = {
  url: "",
  method: "GET",
  baseURL: "",
  headers: {},
  params: {},
  data: {},
  timeout: 0,
  withCredentials: !1,
  responseType: "json"
};
class i {
  constructor(e) {
    n(this, "_adapter");
    n(this, "_requestInterceptor");
    n(this, "_responseInterceptor");
    n(this, "_baseURL");
    this._adapter = e, this._requestInterceptor = new h(), this._responseInterceptor = new h();
  }
  static handleError(e) {
    return typeof e == "string" ? e : e instanceof Error ? e.message : "\u670D\u52A1\u5668\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5";
  }
  get interceptor() {
    return {
      request: this._requestInterceptor,
      response: this._responseInterceptor
    };
  }
  get(e) {
    return e.method = "GET", this.request(e);
  }
  post(e) {
    return e.method = "POST", this.request(e);
  }
  async request(e) {
    try {
      if (!e.url)
        throw new Error("url is not found");
      const t = this._mergeConfig(e), s = await this._requestInterceptor.exec(t), a = await this._adapter.send(s);
      return await this._responseInterceptor.exec(a);
    } catch (t) {
      return Promise.reject(i.handleError(t));
    }
  }
  setBaseUrl(e) {
    e !== void 0 && (this._baseURL = e);
  }
  _mergeConfig(e) {
    var s;
    this.setBaseUrl(e.baseURL);
    const t = Object.assign(d, e);
    return t.method = (s = t.method) == null ? void 0 : s.toUpperCase(), t.url = this._getUrl(t.url), t;
  }
  _getUrl(e) {
    return this._baseURL !== void 0 && !e.startsWith("http") ? (e.startsWith("/") && (e = e.substring(1)), `${this._baseURL}/${e}`) : e;
  }
}
export {
  i as default
};
