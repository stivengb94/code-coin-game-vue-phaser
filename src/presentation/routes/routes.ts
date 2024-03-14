import { createRouter, createWebHistory } from 'vue-router';
import { GAME, HOME, LOUNGE } from '@presentation/routes/routes-paths';
const routes = [
  {
    path: HOME,
    name: 'Home',
    component: () => import('@presentation/views/Home.vue')

  },
  {
    path: GAME,
    name: 'Game',
    component: () => import('@presentation/views/Game.vue')
  },
  {
    path: LOUNGE,
    name: 'Lounge',
    component: () => import('@presentation/views/Lounge.vue')
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes
});

export default router;
