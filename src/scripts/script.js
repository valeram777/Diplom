import '../../node_modules/@glidejs/glide/dist/css/glide.core.min.css'
import '../../node_modules/@glidejs/glide/dist/css/glide.theme.min.css'
import '../vendor/fonts.css'
import '../vendor/normalize.css'
import '../pages/index.css'
import '../pages/about.css'
import '../pages/analytics.css'

import Glide from '@glidejs/glide'
new Glide('.glide', {
  perView: 3,
  peek: 100,
  gap: 16,
  focusAt: 'center',
  startAt: 2,
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
