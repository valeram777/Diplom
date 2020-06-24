import './vendor/fonts.css'
import './vendor/normalize.css'
import './pages/index.css'
import SearchInput from './js/components/SearchInput'
import { indexSelectors } from './js/constants'
import { formatText, formatJSDate, getDate } from './js/utils'
import NewsApi from './js/modules/NewsApi'
import NewsCardList from './js/components/NewsCardList'
import NewsCard from './js/components/NewsCard'
import DataStorage from './js/modules/DataStorage'

const searchInputForm = document.getElementsByClassName(
  indexSelectors.SEARCH_FORM
)[0]
const searchInputNode = document.getElementsByClassName(
  indexSelectors.SEARCH_INPUT
)[0]
const searchInputButton = document.getElementsByClassName(
  indexSelectors.SEARCH_BUTTON
)[0]

const preloader = document.getElementsByClassName(indexSelectors.PRELOADER)[0]
const noResults = document.getElementsByClassName(indexSelectors.NO_RESULTS)[0]
const noResultsSubtitle = document.getElementsByClassName(
  indexSelectors.NO_RESULTS_SUBTITLE
)[0]
const result = document.getElementsByClassName(indexSelectors.RESULT)[0]
const resultList = document.getElementsByClassName(
  indexSelectors.RESULT_LIST
)[0]
const moreButton = document.getElementsByClassName(
  indexSelectors.MORE_BUTTON
)[0]
const analyticsLink = document.getElementsByClassName(
  indexSelectors.ANALYTICS_LINK
)[0]

const newsApi = new NewsApi()

const dataStorage = new DataStorage()

const newsCardList = new NewsCardList(
  [
    {
      node: moreButton,
      event: 'click',
      cb: () => {
        newsCardList.showMore()
      },
    },
    {
      node: analyticsLink,
      event: 'click',
      cb: () => {
        dataStorage.setItem(
          'analytics',
          {
            search: searchInput.activeSearch,
            counts: newsCardList.cards.length,
            headersCounts: newsCardList.cards.reduce(
              (sum, item) =>
                sum + !!item.header.includes(searchInput.activeSearch),
              0
            ),
            countsPerDay: Array(7)
              .fill()
              .map((item, index) => index)
              .reverse()
              .map((daysAgo) => {
                const date = formatJSDate(getDate(new Date(), daysAgo))
                return {
                  date,
                  counts: newsCardList.cards.reduce(
                    (sum, item) => sum + !!(item.time.slice(0, 10) === date),
                    0
                  ),
                }
              }),
          }
        )
      },
    },
  ],
  [],
  {
    list: resultList,
    moreButton: { node: moreButton, class: indexSelectors.MORE_BUTTON },
  }
)

const searchInput = new SearchInput(
  [
    {
      node: searchInputNode,
      event: 'input',
      cb: () => {
        searchInput.checkValidity()
      },
    },
    {
      node: searchInputButton,
      event: 'click',
      cb: (e) => {
        e.preventDefault()
        searchInput.checkValidity(!searchInput.invalidities.length)
      },
    },
  ],
  (value) => {
    searchInput.activeSearch = value
    newsCardList.count = 3
    noResults.classList.remove(indexSelectors.NO_RESULTS + '_active')
    result.classList.remove(indexSelectors.RESULT + '_active')
    preloader.classList.add(indexSelectors.PRELOADER + '_active')

    newsApi
      .getNews(value)
      .then((res) => {
        preloader.classList.remove(indexSelectors.PRELOADER + '_active')

        if (res.status === 'ok' && res.totalResults) {
          result.classList.add(indexSelectors.RESULT + '_active')

          newsCardList.setCards(
            res.articles.map(
              (item) =>
                new NewsCard({
                  imgSrc: item.urlToImage,
                  time: item.publishedAt,
                  header: item.title,
                  text: formatText(item.content),
                  source: item.source.name,
                  link: item.url,
                })
            )
          )
          newsCardList.render()
        } else {
          noResults.classList.add(indexSelectors.NO_RESULTS + '_active')
          noResultsSubtitle.textContent =
            res.status === 'ok'
              ? 'К сожалению по вашему запросу ничего не найдено.'
              : 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
        }
      })
      .catch((error) => {
        result.classList.remove(indexSelectors.RESULT + '_active')
        noResults.classList.add(indexSelectors.NO_RESULTS + '_active')
        noResultsSubtitle.textContent = `Ошибка: ${error.message}`
      })
  },
  {
    input: searchInputNode,
    button: { node: searchInputButton, class: indexSelectors.SEARCH_BUTTON },
    form: searchInputForm,
  }
)
