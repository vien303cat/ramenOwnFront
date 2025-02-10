/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
// Composables
import { createVuetify } from 'vuetify'

const myCustomDarkTheme = {
  dark: true,
  colors: {
    background: '#333333',
    surface: '#333333',
    primary: '#E94444',
    secondary: '#F44336',
    accent: '#FEC165',
    warning: '#FFC107',
    grey: '#999999',
    info: '#333333',
    success: '#333333',
    error: '#333333',
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
})
