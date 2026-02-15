import { createRouter, createWebHistory } from 'vue-router'
import { ticketsRoutes } from '@modules/tickets/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...ticketsRoutes,
  ],
})

export default router
