import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: '/home',
      name: 'home',
      //@ts-ignore
      component: () => import('../views/HomeView.vue'),
    },
   
  ],
})

export default router
