import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import VideoComponentes from '@/components/VideoComponentes.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/videos',
      name: 'videos',
      component: VideoComponentes
    }
  ]
})

export default router

