import { getMonth, formatDateToDiagram, formatJSDate, getDate } from '../utils'

export default class Statistics {
  constructor(articles, nodes) {
    this.articles = articles
    this.dateRows = nodes.dateRows
    this.mentionsRows = nodes.mentionsRows
    this.month = nodes.month

    this.countsPerDay = Array(7)
      .fill()
      .map((item, index) => index)
      .reverse()
      .map((daysAgo) => {
        const date = formatJSDate(getDate(new Date(), daysAgo))
        return {
          date,
          counts: articles.reduce(
            (sum, item) => sum + !!(item.publishedAt.slice(0, 10) === date),
            0
          ),
        }
      })
  }

  render() {
    this.countsPerDay.forEach((item, index) => {
      this.dateRows[index].textContent = formatDateToDiagram(item.date)
      this.mentionsRows[index].textContent = item.counts
      this.mentionsRows[index].style.width = `${item.counts}%`
    })
    this.month.textContent = getMonth(this.countsPerDay[0].date.slice(5, 7))
  }
}
