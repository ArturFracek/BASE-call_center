import type { RouteRecordRaw } from 'vue-router'

export const ticketsRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'tickets',
    component: () => import('../views/TicketListView.vue'),
  },
  {
    path: '/ticket/:id',
    name: 'ticket-detail',
    component: () => import('../views/TicketDetailView.vue'),
    props: true,
  },
]