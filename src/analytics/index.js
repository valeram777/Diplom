import '../vendor/fonts.css'
import '../vendor/normalize.css'
import '../pages/analytics.css'

import { analyticsSelectors } from '../js/constants'
import DataStorage from '../js/modules/DataStorage'
import Statistics from '../js/components/Statistics'

const dataStorage = new DataStorage()

const info = dataStorage.getItem('analytics')

info.counts = info.articles.length
info.headersCounts = info.articles.reduce(
  (sum, item) => sum + !!item.title.includes(info.search),
  0
)

const search = document.getElementsByClassName(analyticsSelectors.SEARCH)[0]
const counts = document.getElementsByClassName(analyticsSelectors.COUNTS)[0]
const headersCounts = document.getElementsByClassName(
  analyticsSelectors.HEADERS_COUNTS
)[0]
const month = document.getElementsByClassName(analyticsSelectors.MONTH)[0]
const dateRows = document.getElementsByClassName(analyticsSelectors.DATE_ROWS)
const mentionsRows = document.getElementsByClassName(
  analyticsSelectors.MENTIONS_ROWS
)

const statistics = new Statistics(info.articles, {
  dateRows,
  mentionsRows,
  month,
})

if (info.search) {
  search.textContent = info.search
  counts.textContent = info.counts === 100 ? '≥ 100' : info.counts
  headersCounts.textContent = info.headersCounts

  statistics.render()
}
