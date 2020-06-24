import { urls, NEWS_API_KEY } from '../constants'
import { formatJSDate, getDate } from '../utils/'

export default class NewsApi {
  getNews(searchText) {
    return fetch(
      `${urls.CORS_PROXY}/${urls.NEWS_API}/everything?apiKey=${NEWS_API_KEY}&q=${searchText}&pageSize=100&language=ru&to=${formatJSDate(
        new Date()
      )}&from=${formatJSDate(getDate(new Date(), 7))}`
    ).then((res) => res.json())
  }
}
