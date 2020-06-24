import '@glidejs/glide/dist/css/glide.core.min.css'
import '@glidejs/glide/dist/css/glide.theme.min.css'

import '../vendor/fonts.css'
import '../vendor/normalize.css'
import '../pages/about.css'

import Glide from '@glidejs/glide'

import GithubApi from '../js/modules/GithubApi'
import CommitCardList from '../js/components/CommitCardList'
import CommitCard from '../js/components/CommitCard'
import { aboutSelectors } from '../js/constants'

const commitsList = document.getElementsByClassName(
  aboutSelectors.COMMITS_LIST
)[0]
const sliderBulletsList = document.getElementsByClassName(
  aboutSelectors.SLIDER_BULLETS_LIST
)[0]
const error = document.getElementsByClassName(
  aboutSelectors.ERROR
)[0]

const githubApi = new GithubApi()

const commitCardList = new CommitCardList([], [], {
  list: commitsList,
  bulletsList: sliderBulletsList,
})

githubApi.getCommits().then((res) => {
  if (res.message) {
    error.textContent = `Ошибка: ${res.message}`
  }

  commitCardList.setCards(
    res
      .reverse()
      .slice(0, 20)
      .map(
        (item) =>
          new CommitCard({
            imgSrc: item.author && item.author.avatar_url,
            time: item.commit.author.date,
            text: item.commit.message,
            name: item.commit.author.name,
            email: item.commit.author.email,
          })
      )
  )
  commitCardList.render()

  new Glide(`.${aboutSelectors.GLIDE}`, {
    perView: 3,
    peek: 100,
    gap: 16,
    focusAt: 'center',
    startAt: Math.round(res.length / 2),
    breakpoints: {
      1300: {
        perView: 2,
        focusAt: 0,
      },
      800: {
        perView: 1,
      },
      600: {
        perView: 1,
        peek: 30,
      },
    },
  }).mount()
})
