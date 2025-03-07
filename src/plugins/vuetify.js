/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
// Composables
import { createVuetify } from 'vuetify' // Translations provided by Vuetify
import { zhHant } from 'vuetify/locale'

const myCustomDarkTheme = {
  dark: true,
  colors: {
    background: '#333333',
    surface: '#333333',
    primary: '#E94444',
    secondary: '#F44336',
    accent: '#FEC165',
    warning: '#E94444',
    grey: '#999999',
    greyhalf: '#666666',
    info: '#FFC107',
    success: '#FFC107',
    error: '#F44336',
  },
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'myCustomDarkTheme',
    themes: {
      myCustomDarkTheme,
    },
  },
  locale: {
    locale: 'zhHant',
    fallback: 'en',
    messages: { zhHant },
  },
})
