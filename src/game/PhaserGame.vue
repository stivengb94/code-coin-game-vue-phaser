<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { EventBus } from './EventBus';
import StartGame from './main';
import Phaser from 'phaser';
import  { GameEntity } from './entities/GameEntity';
import { useRouter } from 'vue-router';
import type { Languages, Levels } from '@/utils/utils';
import { ArgumentsScene } from './arguments/arguments-scene';
import type { CoinParams } from './entities/Params';
const router = useRouter();
// Save the current scene instance
const scene = ref();
const game = ref();

const emit = defineEmits(['current-active-scene']);

onMounted(() => {
    game.value = StartGame('game-container');
    if (router.currentRoute.value.query) {
        let level = router.currentRoute.value.query.level as Levels;
        let languaje = router.currentRoute.value.query.programingCode as Languages;
        ArgumentsScene.getInstance().setParams(new GameEntity(languaje, level))
    }
   
    EventBus.on('current-scene-ready', (scene_instance: Phaser.Scene) => {
        emit('current-active-scene', scene_instance);
        scene.value = scene_instance;
    });

    EventBus.on('scene-coin-capture', (params: CoinParams) => {
        console.log("Moneda: ", params)
    });

    EventBus.on('scene-finished', (value: boolean) => {
        console.log("Scena Finalizada: ", value)
    });
});

onUnmounted(() => {
    if (game.value)
    {
        game.value.destroy(true);
        game.value = null;
    }

});

defineExpose({ scene, game });

</script>

<template>
    <div id="game-container"></div>
</template>