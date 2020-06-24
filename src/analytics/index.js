import '../vendor/fonts.css'
import '../vendor/normalize.css'
import '../pages/analytics.css'

import { analyticsSelectors } from '../js/constants'
import { getMonth, formatDateToDiagram } from '../js/utils'
import DataStorage from '../js/modules/DataStorage'

const dataStorage = new DataStorage()

const info = dataStorage.getItem('analytics')

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

if (info.search) {
  search.textContent = info.search
  counts.textContent = info.counts === 100 ? '≥ 100' : info.counts
  headersCounts.textContent = info.headersCounts
  month.textContent = getMonth(info.countsPerDay[0].date.slice(5, 7))

  info.countsPerDay.forEach((item, index) => {
    dateRows[index].textContent = formatDateToDiagram(item.date)
    mentionsRows[index].textContent = item.counts
    mentionsRows[index].style.width = `${item.counts}%`
  })
}
