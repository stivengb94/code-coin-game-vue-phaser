<template>
  <v-dialog v-model="dialog" max-width="1000" persistent>
    <template v-slot:default="{ isActive }">
      <v-card title="Cuestionario">
        <v-card-text>
          <h1 v-if="isFinalize">{{ point }}</h1>
          <v-container>
            <v-form ref="form">
              <div v-for="item in questions" :key="item.code">
                <v-card class="mb-5">
                  <v-card-title>{{ item.name }}</v-card-title>
                  <v-card-text>
                    <v-radio-group v-model="answers[item.code]" :mandatory="false" :disabled="isFinalize">
                      <v-radio v-for="option in item.options" :key="option" :label="option" :value="option">
                        <template v-slot:label>
                          <div v-if="answers[item.code] == option" :class="{
                            'isCorrect': isFinalize && option == item.correctAnswer,
                            'isIncorrect': isFinalize && option != item.correctAnswer
                          }">{{ option }}</div>
                          <div v-else>{{ option }}</div>
                        </template>
                      </v-radio>
                    </v-radio-group>
                  </v-card-text>
                </v-card>
              </div>
              <v-btn v-if="!isFinalize" color="primary" @click="submitAnswers">Finalizar</v-btn>
              <v-btn v-else color="primary" @click="onClose">Cerrar</v-btn>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup lang="ts">
import { type Question, type QuizzRepository, type LevelCode, CategoryCode } from "@domain/index";
import { AppModules, Ioc } from "@di/index";
import { computed, onMounted, ref, defineProps, watch } from "vue";
import { useRouter, useRoute } from 'vue-router';
const emit = defineEmits(['on-cloce']);
const router = useRouter();

// Definir props
const props = defineProps<{
  showDialog: Boolean;
  questions: Array<Question>;
  levelCode: LevelCode;
  categoryCode: CategoryCode
}>()

const quizzRepository = Ioc.instance.di.resolve<QuizzRepository>(AppModules.Quizz);

const dialog = ref<Boolean>(false);
const answers = ref<Record<string, string>>({});
const isFinalize = ref<Boolean>(false);
const point = ref<String>("")

const onClose = async () => {
  emit("on-cloce");
  dialog.value = false;
}

watch(() => props.showDialog, (newValue, oldValue) => {
  dialog.value = newValue;
})

const submitAnswers = () => {
  isFinalize.value = true;
  const answersCorrect = [];
  props.questions.forEach((v, inx) => {
    console.log("respuestas", answers.value[v.code], v.correctAnswer);
    if (answers.value[v.code] == v.correctAnswer) {
      answersCorrect.push(1)
    }
  });
  point.value = `${answersCorrect.length}/${props.questions.length}`;
  quizzRepository.save({
    categoryLevelCode: props.levelCode,
    categoryCode: props.categoryCode,
    totalQuestions: props.questions.length,
    totalCorrectQuestions:answersCorrect.length
  });
};

</script>
<style lang="scss" scoped>
.isCorrect {
  color: green;
}
.isIncorrect {
  color: red;
}
</style>