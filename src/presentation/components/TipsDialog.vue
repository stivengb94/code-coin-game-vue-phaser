<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:default="{ isActive }">
      <v-card title="Dialog">
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close Dialog" @click="isActive.value = false"></v-btn>
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
}>()

const dialog = ref<Boolean>();

watch(() => dialog, (newValue, oldValue) => {
  emit("on-cloce");
})
watch(() => props.showDialog, (newValue, oldValue) => {
  dialog.value = newValue;
})

</script>