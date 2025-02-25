/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
// import Particles from 'vue3-particles'

const app = createApp(App)

registerPlugins(app)

// app.use(Particles) // 註冊 vue3-particles
app.mount('#app')
