/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '@/stores'
import router from '@/router'
import VuetifyUseDialog from 'vuetify-use-dialog'
import VueFileAgentNext from '@boindil/vue-file-agent-next'
import '@boindil/vue-file-agent-next/dist/vue-file-agent-next.css'
import '@/styles/index.css'
import Particles from '@tsparticles/vue3'
import { loadFull } from 'tsparticles'
export function registerPlugins(app) {
  app
    .use(vuetify)
    .use(VuetifyUseDialog, {
      snackbar: {
        showCloseButton: false,
        snackbarPoprs: { time: 2000 },
      },
    })
    .use(router)
    .use(pinia)
    .use(VueFileAgentNext)
    .use(Particles, {
      init: async (engine) => {
        try {
          await loadFull(engine)
          console.log('Particles engine loaded successfully')
        } catch (error) {
          console.error('Error loading particles engine:', error)
        }
      },
    })
}
