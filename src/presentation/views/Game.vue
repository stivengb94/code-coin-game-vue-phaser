<script setup lang="ts">
import Phaser from 'phaser';
import { onMounted, onUnmounted, ref, toRaw } from 'vue';
import PhaserGame from '@presentation/game/PhaserGame.vue';
import TipsDialog from '@presentation/components/TipsDialog.vue'
import TestDialog from '@presentation/components/TestDialog.vue'
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
const dialogTip = ref<Boolean>(false);
const dialogTest = ref<Boolean>(false);
const questionTest = ref<Array<Question>>([]);
const learningTip = ref<String>("");
const learningTitle = ref<String>("");

const learnings = ref<Learning[]>([]);
const quizz = ref<Question[]>([]);
const scene = ref<Phaser.Scene>();
const categoryCode = ref<CategoryCode>('java' as CategoryCode);
const levelCode = ref<LevelCode>('basic' as LevelCode);
// Event emitted from the PhaserGame component
const currentScene = (_scene: Phaser.Scene) => { scene.value = _scene }

onMounted(async () => {
    onSuscriptions()
    load()
    categoryCode.value = route.query?.categoryCode as CategoryCode;
    levelCode.value = route.query?.levelCode as LevelCode;
    learnings.value = await learningRepository.listBy(categoryCode.value, levelCode.value);
    quizz.value = await quizzRepository.getBy(categoryCode.value, levelCode.value);
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
        if (findLearning) {
            learningTip.value = findLearning.description;
            learningTitle.value = findLearning.title;
            dialogTip.value = true;
            if (scene.value && scene.value.scene) {
                scene.value.scene.pause(scene.value.scene.key);
            }
        }
    });

    EventBus.on('scene-finished', (_: boolean) => {
        questionTest.value = quizz.value;
        dialogTest.value = true;
        if (scene.value && scene.value.scene) {
            scene.value.scene.pause(scene.value.scene.key);
        }
    });
}

const onCloseTip = () => {
    dialogTip.value = false;
    learningTip.value = '';
    learningTitle.value = '';
    if (scene.value && scene.value.scene) {
        scene.value.scene.resume(scene.value.scene.key);
    }
}

const onCloseTest = () => {
    dialogTest.value = false;
    onBack();
}
</script>

<template>
    <TipsDialog :show-dialog="dialogTip"  :tip="learningTip" :title="learningTitle" @on-cloce="onCloseTip" />
    <TestDialog :show-dialog="dialogTest" :questions="questionTest" @on-cloce="onCloseTest" :category-code="categoryCode" :level-code="levelCode" />
    <PhaserGame ref="phaserRef" @current-active-scene="currentScene" />
    <div style="margin-left: 10px;">
        <h1>Estas Aprediendo</h1>
        <p>Nivel: {{ $route.query?.levelName }}</p>
        <p>De: {{ $route.query?.categoryName }}</p>
        <v-btn @click="onBack" color="indigo-darken-3" rounded="lg" block>Salir</v-btn>
    </div>
</template>
