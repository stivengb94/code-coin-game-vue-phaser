<template>

  
    <div>
      <router-link to="/">Inicio</router-link>
      <router-link to="/about">Acerca de</router-link>
      <a href="#" @click="navigateToGame">Ir a la página de juego</a>



    </div>
</template>
<script setup lang="ts">
import { GAME } from '@/routes/routes-paths';
import { useRouter } from 'vue-router'; // Importa el hook useRouter
const router = useRouter();


const navigateToGame = () => {
  // Navega a la página de juego con parámetros de consulta
  router.push({ path: GAME, query: { level: 'basic', programingCode: 'sql' } });
}

</script>