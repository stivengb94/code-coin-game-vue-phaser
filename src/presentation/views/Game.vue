<script setup lang="ts">
import Phaser from 'phaser';
import { ref, toRaw } from 'vue';
import PhaserGame from '@presentation/game/PhaserGame.vue';
import { useRouter } from 'vue-router';
//  References to the PhaserGame component (game and scene are exposed)
const phaserRef = ref();
const router = useRouter();

// Event emitted from the PhaserGame component
const currentScene = (scene: Phaser.Scene) => {}

const onBack = async () => {
    router.back()
}

</script>

<template>
    <PhaserGame ref="phaserRef" @current-active-scene="currentScene" />
    <div style="margin-left: 10px;">
        <h1>Estas Aprediendo</h1>
        <p>Nivel: {{ $route.query?.levelName }}</p>
        <p>De: {{ $route.query?.categoryName }}</p>
        <v-btn @click="onBack" color="indigo-darken-3" rounded="lg" block>Salir</v-btn>
    </div>
</template>
