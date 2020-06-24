import BaseComponent from './BaseComponent'

export default class ListComponent extends BaseComponent {
  constructor(handlers, cards, nodes) {
    super(handlers)

    this.cards = cards
    this.list = nodes.list
  }

  setCards(cards) {
    this.cards = cards
  }

  removeChildren(node) {
    [...node.children].forEach((item) => {
      item.remove()
    })
  }
}
