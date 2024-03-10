import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Game from '../views/Game.vue';

const routes = [
  {
    path: '/',
    name: 'Game',
    component: Game
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  // puedes añadir más rutas aquí
];

const router = createRouter({
  history: createWebHistory("/"),
  routes
});

export default router;
