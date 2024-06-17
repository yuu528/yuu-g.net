/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

import { light } from './themes/light'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light
    }
  },
  icons: {
    iconfont: 'mdi',
    aliases,
    sets: {
      mdi
    }
  }
})
