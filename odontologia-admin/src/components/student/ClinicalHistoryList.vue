<!-- src/components/student/ClinicalHistoryList.vue -->
<template>
  <DataTable
    :columns="cols"
    :rows="histories"
    :page="page"
    :per-page="perPage"
    @edit="onEdit"
    @delete="$emit('delete', $event)"
    @update:page="page = $event"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DataTable from '../common/DataTable.vue';
import type { ClinicalHistory } from '../../mocks/student/clinicalHistories';

const props = defineProps<{ histories: ClinicalHistory[] }>();
const emit = defineEmits<{ (e: 'edit', h: ClinicalHistory): void; (e: 'delete', id: number): void }>();

const page = ref(1);
const perPage = ref(10);

const cols = [
  { key: 'id',        label: 'ID' },
  { key: 'patientId', label: 'Paciente' },
  { key: 'createdAt', label: 'Creado' },
  { key: 'updatedAt', label: 'Actualizado' }
];

function onEdit(row: Record<string, any>) {
  emit('edit', row as ClinicalHistory);
}
</script>

<style scoped>
</style>
