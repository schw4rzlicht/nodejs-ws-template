const Events = require('events');
const WebSocket = require('isomorphic-ws');

module.exports = class Client extends Events.EventEmitter {

  connect(server, service, queryString = '') {

    this.messageHandlers = service.handlers;

    const url = new URL(service.path + queryString, `ws://${server}`).toString();
    this.websocket = new WebSocket(url);

    this.websocket.onerror = error => this.emit('error', error);
    this.websocket.onopen = () => this.emit('open');
    this.websocket.onclose = () => this.emit('close');
    this.websocket.onmessage = event => this.handleMessage(event);
  }

  send(message) {

    if(!this.websocket) {
      this.emit('error', new Error('WS client not connected!'));
      return;
    }

    if(typeof message === 'object') {
      this.websocket.send(JSON.stringify(message));
    } else {
      this.websocket.send(message);
    }
  }

  parseData(data) {
    try {
      return JSON.parse(data);
    } catch(ignored) {
      return data;
    }
  }

  handleMessage(event) {
    this.emit('message', this.parseData(event.data));
    for (const messageHandler of this.messageHandlers) {
      messageHandler.handle(this, event);
    }
  }
}
