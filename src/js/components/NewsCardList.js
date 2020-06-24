import ListComponent from './ListComponent'

export default class NewsCardList extends ListComponent {
  constructor(handlers, cards, nodes) {
    super(handlers, cards, nodes)

    this.moreButton = nodes.moreButton.node
    this.moreButtonClass = nodes.moreButton.class
    this.count = 3

    this.render = this.render.bind(this)
  }

  showMore() {
    this.count += 3
    this.render()
  }

  render() {
    this.removeChildren(this.list)
    
    this.cards &&
      this.cards.slice(0, this.count).forEach((card) => {
        this.list.insertAdjacentHTML('beforeend', card.render())
      })
    
    if (this.count >= this.cards.length)
      this.moreButton.classList.remove(this.moreButtonClass + '_active')
    else this.moreButton.classList.add(this.moreButtonClass + '_active')
  }
}
