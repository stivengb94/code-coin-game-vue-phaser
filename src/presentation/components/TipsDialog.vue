<template>
  <v-dialog v-model="dialog" max-width="500" persistent>
    <template v-slot:default="{ isActive }">
      <v-card :title="title">
        <v-card-text>
          {{ tip }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Cerrar" @click="onClose"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, defineProps, watch } from "vue";
const emit = defineEmits(['on-cloce']);

// Definir props
const props = defineProps<{
  showDialog: Boolean;
  tip: string;
  title: string;
}>()

const dialog = ref<Boolean>(false);


const onClose = async () => {
  emit("on-cloce");
  dialog.value = false;
}

watch(() => props.showDialog, (newValue, oldValue) => {
  dialog.value = newValue;
})

</script>