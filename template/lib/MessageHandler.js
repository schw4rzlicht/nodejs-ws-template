export default class MessageHandler {

  constructor(messageName, responsible) {
    this.messageName = messageName;
    this.responsible = responsible;
  }

  handle(eventTarget, event) {
    if(this.responsible(event)) {
      eventTarget.dispatchEvent(new MessageEvent(`message.${this.messageName}`, event));
    }
  }
}
