import { formatJSDate, htmlEncode } from '../utils'

export default class CommitCard {
  constructor(params) {
    this.imgSrc = params.imgSrc
    this.time = params.time
    this.text = params.text
    this.name = params.name
    this.email = params.email
  }

  render() {
    return `
      <li class="glide__slide commits__card">
        <time class="card__time_commits" datetime="2019-08-02">
          ${formatJSDate(new Date(this.time), true)}
        </time>
        <div class="card__author">
          ${
            this.imgSrc
              ? `<img
            src="${this.imgSrc}"
            alt="avatar"
            class="author__avatar"
          />`
              : ''
          }
          <div class="author__text">
            <span class="text__name">${htmlEncode(this.name)}</span>
            <span class="text__email">
              ${
                this.imgSrc
                  ? `${htmlEncode(this.email.split('@')[0])}<br />@${
                      htmlEncode(this.email.split('@')[1])
                    }`
                  : htmlEncode(this.email)
              }
            </span>
          </div>
        </div>
        <div class="card__text">
          ${htmlEncode(this.text)}
        </div>
      </li>
    `
  }
}
