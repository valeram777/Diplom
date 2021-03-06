import { urls, NEWS_API_KEY, newsDaysAgo } from '../constants'
import { formatJSDate, getDate } from '../utils/'

export default class NewsApi {
  getNews(searchText) {
    return fetch(
      `${
        urls.NEWS_API
      }/everything?apiKey=${NEWS_API_KEY}&q=${searchText}&pageSize=100&language=ru&to=${formatJSDate(
        new Date()
      )}&from=${formatJSDate(getDate(new Date(), newsDaysAgo))}`
    ).then((res) => {
      if (!res.ok) {
        return res.json().then((res) => Promise.reject(res))
      }
      return res.json()
    })
  }
}
