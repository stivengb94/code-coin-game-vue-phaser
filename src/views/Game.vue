<script setup lang="ts">
import Phaser from 'phaser';
import { ref, toRaw } from 'vue';
import PhaserGame from '@/game/PhaserGame.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
//  References to the PhaserGame component (game and scene are exposed)
const phaserRef = ref();
// Event emitted from the PhaserGame component
const currentScene = (scene: Phaser.Scene) => {
   
}

</script>

<template>
    <PhaserGame ref="phaserRef" @current-active-scene="currentScene" />
    <div>
        <h1>Página de Juego</h1>
        <p>Nivel: {{ $route.query.level }}</p>
        <p>Código de Programación: {{ $route.query.programingCode }}</p>

    </div>
</template>
