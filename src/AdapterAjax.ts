import { Adapter, Config } from '../core/types';

export default class AdapterAjax implements Adapter {

  send (config: Config): Promise<any> {
    return new Promise((resolve, reject) => {
      $.ajax({
        ...config,
        url: config.url,
        type: config.method,
        xhrFields: {
          withCredentials: config.withCredentials
        },
        crossDomain: true,
        success: function (res: any) {
          resolve(res);
        },
        error (xhr: any) {
          console.log(xhr);
          reject(xhr.statusText);
        },
      });
    });
  }
}