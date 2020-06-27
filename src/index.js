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

    searchInput.block()
    newsApi
      .getNews(value)
      .then((res) => {
        searchInput.unblock()
        preloader.classList.remove(indexSelectors.PRELOADER + '_active')

        if (res.totalResults) {
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
            'К сожалению по вашему запросу ничего не найдено.'
        }

        dataStorage.setItem('analytics', {
          search: searchInput.activeSearch,
          articles: res.articles,
        })
      })
      .catch((res) => {
        preloader.classList.remove(indexSelectors.PRELOADER + '_active')
        result.classList.remove(indexSelectors.RESULT + '_active')
        noResults.classList.add(indexSelectors.NO_RESULTS + '_active')
        noResultsSubtitle.textContent =
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
      })
  },
  {
    input: searchInputNode,
    button: { node: searchInputButton, class: indexSelectors.SEARCH_BUTTON },
    form: searchInputForm,
  }
)

const storage = dataStorage.getItem('analytics')
if (storage.search) {
  searchInput.setValue(storage.search)
}
if (storage.articles) {
  result.classList.add(indexSelectors.RESULT + '_active')

  newsCardList.setCards(
    storage.articles.map(
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
}
