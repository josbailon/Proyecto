<!-- src/components/student/ClinicalHistoryForm.vue -->
<template>
  <HistoryForm
    :model-value="modelValue"
    :edit-mode="editMode"
    @save="$emit('save', $event)"
    @cancel="$emit('cancel')"
  />
</template>

<script setup lang="ts">
import HistoryForm from './HistoryForm.vue';
import type { ClinicalHistory } from '../../mocks/student/clinicalHistories';

const props = defineProps<{ modelValue: Partial<ClinicalHistory>; editMode: boolean }>();

defineEmits<{ (e: 'save', data: ClinicalHistory): void; (e: 'cancel'): void }>();
</script>

<style scoped>
</style>
