const Ajv = require('ajv');

module.exports = class MessageHandler {

  constructor(messageName, schema) {
    this.validate = new Ajv().compile(schema);
    this.messageName = messageName;
  }

  handle(client, event) {
    let data = client.parseData(event.data);
    if(this.validate(data)) {
      client.emit(`message.${this.messageName}`, data);
    }
  }
}
