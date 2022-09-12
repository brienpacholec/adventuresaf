import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import 'vue-search-select/dist/VueSearchSelect.css'
// import 'prismjs/themes/prism.css'

import theme from '~/constants/theme'
import Layout from '~/layouts/Layout.vue'

import '~/assets/styles/app.scss'

export default function (Vue, { router, appOptions, head, isClient }) {

  // GET material icon package
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
  })

  // GET Montserrat Font
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Montserrat'
  })

  // GET Raleway
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Raleway'
  })

  Vue.use(Vuetify)
  appOptions.vuetify = new Vuetify(theme)

  Vue.component('Layout', Layout)
}
