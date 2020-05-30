module.exports = class Client extends EventTarget {

  connect(server, service, queryString = '') {

    this.messageHandlers = service.handlers;

    const url = new URL(service.path + queryString, `ws://${server}`).toString();
    this.websocket = new WebSocket(url);

    this.websocket.onerror = error => this.dispatchEvent(new ErrorEvent('error', {error: error}));
    this.websocket.onopen = () => this.dispatchEvent(new Event('open'));
    this.websocket.onclose = () => this.dispatchEvent(new Event('close'));
    this.websocket.onmessage = event => this.handleMessage(event);
  }

  send(message) {

    if(!this.websocket) {
      this.dispatchEvent(new ErrorEvent('error', {error: new Error('WS client not connected!')}));
      return;
    }

    if(typeof message === 'object') {
      this.websocket.send(JSON.stringify(message));
    } else {
      this.websocket.send(message);
    }
  }

  dispatchMessageEvent(type, data) {
    this.dispatchEvent(new MessageEvent(type, {data: data}));
  }

  parseData(data) {
    try {
      return JSON.parse(data);
    } catch(ignored) {
      return data;
    }
  }

  handleMessage(event) {
    this.dispatchMessageEvent('message', this.parseData(event.data));
    for (const messageHandler of this.messageHandlers) {
      messageHandler.handle(this, event);
    }
  }
}
