import '@shared/styles/main.css'
import '@shared/styles/global.scss'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

import { createApp } from 'vue'
import VueVirtualScroller from 'vue-virtual-scroller'
import { createPinia } from 'pinia'
import { watch } from 'vue'

import App from './App.vue'
import router from '@router'
import { i18n, LOCALE_STORAGE_KEY } from '@/plugins/i18n'

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(router)
app.use(VueVirtualScroller)

watch(
  () => i18n.global.locale.value,
  (locale) => {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  },
  { immediate: false }
)

app.mount('#app')
