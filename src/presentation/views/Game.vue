<script setup lang="ts">
import Phaser from 'phaser';
import { ref, toRaw } from 'vue';
import PhaserGame from '@presentation/game/PhaserGame.vue';
import { useRouter } from 'vue-router';

import TipsDialog from '@presentation/components/TipsDialog.vue'

//  References to the PhaserGame component (game and scene are exposed)
const phaserRef = ref();
const router = useRouter();

const dialogTip = ref<Boolean>(false);

const sceneCoinCapture = (val: Boolean) => {
    dialogTip.value = val;
}

// Event emitted from the PhaserGame component
const currentScene = (scene: Phaser.Scene) => {}

const onBack = async () => {
    router.back()
}

</script>

<template>
    <TipsDialog :show-dialog="dialogTip" @on-cloce="()=> dialogTip = false"></TipsDialog>
    <PhaserGame ref="phaserRef" @current-active-scene="currentScene" @scene-coin-capture="sceneCoinCapture" />
    <div style="margin-left: 10px;">
        <h1>Estas Aprediendo</h1>
        <p>Nivel: {{ $route.query?.levelName }}</p>
        <p>De: {{ $route.query?.categoryName }}</p>
        <v-btn @click="onBack" color="indigo-darken-3" rounded="lg" block>Salir</v-btn>
    </div>
</template>
