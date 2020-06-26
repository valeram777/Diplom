export default class BaseComponent {
  constructor(handlers) {
    this._setHandlers(handlers)
  }

  _setHandlers(handlers) {
    handlers.forEach(item => {
      item.node.addEventListener(item.event, item.cb)
    })
  }
}