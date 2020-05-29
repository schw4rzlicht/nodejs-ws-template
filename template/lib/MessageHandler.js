{%- if not params.bundleDependencies -%}
import Ajv from 'ajv';

{% endif -%}
export default class MessageHandler {

  constructor(messageName, schema, responsible) {
    this.validate = new Ajv().compile(schema);
    this.messageName = messageName;
  }

  handle(client, event) {
    let data = client.parseData(event.data);
    if(this.validate(data)) {
      client.dispatchMessageEvent(`message.${this.messageName}`, data);
    }
  }
}
