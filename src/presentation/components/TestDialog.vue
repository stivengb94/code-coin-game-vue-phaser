<template>
  <v-dialog v-model="dialog" max-width="1000" persistent>
    <template v-slot:default="{ isActive }">
      <v-card title="Cuestionario">
        <v-card-text>
          <v-container>
            <v-form ref="form">
              <div v-for="item in questions" :key="item.code">
                <v-card class="mb-5">
                  <v-card-title>{{ item.name }}</v-card-title>
                  <v-card-text>
                    <v-radio-group v-model="answers[item.code]" :mandatory="false">
                      <v-radio v-for="option in item.options" :key="option" :label="option" :value="option"></v-radio>
                    </v-radio-group>
                  </v-card-text>
                </v-card>
              </div>
              <v-btn color="primary" @click="submitAnswers">Submit</v-btn>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup lang="ts">
import type { Question } from "@domain/index";
import { computed, onMounted, ref, defineProps, watch } from "vue";
const emit = defineEmits(['on-cloce']);

// Definir props
const props = defineProps<{
  showDialog: Boolean;
  questions: Array<Question>
}>()

const dialog = ref<Boolean>(false);
const answers = ref({});


const onClose = async () => {
  emit("on-cloce");
  dialog.value = false;
}

watch(() => props.showDialog, (newValue, oldValue) => {
  dialog.value = newValue;
})

const submitAnswers = () => {
  console.log(answers.value);
};

</script>