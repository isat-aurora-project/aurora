import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/es5/util/colors'
import { mdiPageFirst, mdiPageLast } from '@mdi/js'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: colors.indigo.darken4,
        secondary: colors.purple,
        accent: colors.lightGreen.accent3,
        error: colors.red.accent2,
        info: colors.blue,
        success: colors.green,
        warning: colors.amber
      }
    },
    options: {
      customProperties: true
    }
  },
  icons: {
    iconfont: 'mdiSvg',
    values: {
      first: mdiPageFirst,
      last: mdiPageLast
    }
  }
})
