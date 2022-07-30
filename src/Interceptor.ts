import { InterceptorItem } from './types';

export default class Interceptor {
  private handlers: InterceptorItem[] = [];

  use (item: InterceptorItem): number {
    this.handlers.push(item);
    return this.handlers.length - 1;
  }

  unUse (id: number) {
    this.handlers.splice(id, 1);
  }

  exec (options: any) {
    return this.handlers.reduce(
      (p, currentItem, currentIndex) => p.then(currentItem.resolveHandler, this.handlers[currentIndex-1]?.rejectHandler),
      Promise.resolve(options)
    ).catch(this.handlers[this.handlers.length-1].rejectHandler);
  }
}