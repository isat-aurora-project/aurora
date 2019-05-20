import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/es5/util/colors'
import '@/stylus/main.styl'

Vue.use(Vuetify, {
  theme: {
    primary: colors.indigo.darken4,
    secondary: colors.purple,
    accent: colors.lightGreen.accent3,
    error: colors.red.accent2,
    info: colors.blue,
    success: colors.green,
    warning: colors.amber
  },
  options: {
    customProperties: true
  },
  iconfont: 'mdi'
})
