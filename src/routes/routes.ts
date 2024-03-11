import { createRouter, createWebHistory } from 'vue-router';
import { GAME, HOME } from '@/routes/routes-paths';
const routes = [
  {
    path: HOME,
    name: 'Home',
    component: () => import('@/views/Home.vue')

  },
  {
    path: GAME,
    name: 'Game',
    component: () => import('@/views/Game.vue')
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes
});

export default router;
