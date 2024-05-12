export class AsyncCall {
  private static _calls = [];

  private static readonly _MESSAGE_NAME = 'async-call-message';

  static initialize() {
    window.addEventListener('message', event => {
      if(event.source !== window || event.data !== AsyncCall._MESSAGE_NAME) return;

      event.stopPropagation();
      if(AsyncCall._calls.length > 0) {
        (AsyncCall._calls.shift())();
      }
    }, true);
  }

  static asyncCall(callback: () => void) {
    AsyncCall._calls.push(callback);
    window.postMessage(AsyncCall._MESSAGE_NAME, '*');
  }
}
