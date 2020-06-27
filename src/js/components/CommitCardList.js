import ListComponent from './ListComponent'

export default class CommitsCardList extends ListComponent {
  constructor(handlers, cards, nodes) {
    super(handlers, cards, nodes)

    this.bulletsList = nodes.bulletsList

    this.render = this.render.bind(this)
  }

  _renderBullet(index) {
    return `<button class="glide__bullet" data-glide-dir="=${index}"></button>`
  }

  render() {
    this.removeChildren(this.list)
    this.removeChildren(this.bulletsList)

    this.cards &&
      this.cards.forEach((card, index) => {
        this.list.insertAdjacentHTML('beforeend', card.render())
        this.bulletsList.insertAdjacentHTML(
          'beforeend',
          this._renderBullet(index)
        )
      })
  }
}
