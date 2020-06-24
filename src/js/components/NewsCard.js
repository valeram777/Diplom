import { formatJSDate, htmlEncode } from '../utils'

export default class NewsCard {
  constructor(params) {
    this.imgSrc = params.imgSrc
    this.time = params.time
    this.header = params.header
    this.text = params.text
    this.source = params.source
    this.link = params.link
  }

  render() {
    return `
      <div class="result__card">
        <a href="${this.link}" class="card__link" target="_blank">
        ${
          this.imgSrc
            ? `<img
              class="card__image"
              src="${this.imgSrc}"
              alt="${this.header}"
            />`
            : ''
        }
        ${
          this.time
            ? `<time class="card__time" datetime="${this.time}">
              ${formatJSDate(new Date(this.time), true)}
            </time>`
            : ''
        }
        <h6 class="card__title">${this.header}</h6>
        ${
          this.text
            ? `<p class="card__subtitle">${htmlEncode(this.text)}</p>`
            : ''
        }
        <span class="card__source">${this.source}</span>
        </a>
      </div>
    `
  }
}
