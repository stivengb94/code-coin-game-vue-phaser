<script setup lang="ts">
import Phaser from 'phaser';
import { onMounted, onUnmounted, ref, toRaw } from 'vue';
import PhaserGame from '@presentation/game/PhaserGame.vue';
import { useRouter, useRoute } from 'vue-router';
import type { CategoryCode, Learning, LearningRepository, LevelCode, Question, QuizzRepository } from '@domain/index';
import { AppModules, Ioc } from '@di/index';
import { EventBus } from '@presentation/game/EventBus';
import type { CoinParams } from '@presentation/game/entities/Params';
import { ArgumentsScene } from '@presentation/game/arguments/arguments-scene';
import { GameEntity } from '@presentation/game/entities/GameEntity';
const router = useRouter();
const route = useRoute();

const learningRepository = Ioc.instance.di.resolve<LearningRepository>(AppModules.Learning)
const quizzRepository = Ioc.instance.di.resolve<QuizzRepository>(AppModules.Quizz)

//  References to the PhaserGame component (game and scene are exposed)
const phaserRef = ref();
const learnings = ref<Learning[]>([]);
const quizz = ref<Question[]>([]);
// Event emitted from the PhaserGame component
const currentScene = (scene: Phaser.Scene) => {}

onMounted(async () => {
    onSuscriptions()
    load()
    const categoryCode = route.query?.categoryCode as CategoryCode;
    const levelCode = route.query?.levelCode as LevelCode;
    learnings.value = await learningRepository.listBy(categoryCode, levelCode);
    quizz.value = await quizzRepository.getBy(categoryCode, levelCode);
});

const load = () => {
    if (route.query) {
        let level = route.query.levelCode as LevelCode;
        let languaje = route.query.categoryCode as CategoryCode;
        ArgumentsScene.getInstance().setParams(new GameEntity(languaje, level))
    }
}

const onBack = async () => {
    router.back()
}

onUnmounted(() => {
    EventBus.off("scene-coin-capture");
    EventBus.off("scene-finished");
});

const onSuscriptions = async () => {
    EventBus.on('scene-coin-capture', (params: CoinParams) => {
        const findLearning = learnings.value.find(a => a.index == params.index + 1)
        if(findLearning)  alert(findLearning.description)
    });

    EventBus.on('scene-finished', (_: boolean) => {
        alert(`Modificar aqui para mostrar ${quizz.value.length} preguntas`)
    });
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
