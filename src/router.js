import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import VideosDiversos from './components/VideosDiversos.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/videos', component: VideosDiversos },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;