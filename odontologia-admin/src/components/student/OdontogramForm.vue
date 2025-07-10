<!-- src/components/student/OdontogramForm.vue -->
<template>
  <div class="odontogram-form">
    <div class="d-flex flex-wrap gap-2 mb-3">
      <div
        v-for="entry in entries"
        :key="entry.id"
        class="odontogram-tooth card p-2 text-center"
        :class="statusClass(entry.status)"
      >
        <div>{{ entry.tooth }}</div>
        <small>{{ entry.status }}</small>
        <div class="mt-1">
          <button
            class="btn btn-sm btn-outline-danger"
            @click="deleteEntry(entry.id)"
          >
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="row g-2 mb-3">
      <div class="col-4">
        <input
          v-model="newEntry.tooth"
          type="text"
          class="form-control"
          placeholder="Diente"
        />
      </div>
      <div class="col-4">
        <select v-model="newEntry.status" class="form-select">
          <option disabled value="">Estado</option>
          <option value="sano">Sano</option>
          <option value="caries">Caries</option>
          <option value="restaurado">Restaurado</option>
          <option value="extraido">Extraído</option>
        </select>
      </div>
      <div class="col-4 d-flex">
        <button class="btn btn-primary me-2" @click="addEntry">
          Agregar
        </button>
        <button class="btn btn-success" @click="saveAll">
          Guardar Todo
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { OdontogramEntry, ToothStatus } from '../../mocks/student/odontogram';

const props = defineProps<{
  entries: OdontogramEntry[];
}>();

const emit = defineEmits<{
  (e: 'save-entry', entry: { tooth: string; status: ToothStatus; id?: string }): void;
  (e: 'delete-entry', id: string): void;
  (e: 'save-full', entries: Array<{ tooth: string; status: ToothStatus }>): void;
}>();

const newEntry = reactive<{ tooth: string; status: ToothStatus | '' }>({
  tooth: '',
  status: ''
});

function addEntry() {
  if (newEntry.tooth && newEntry.status) {
    emit('save-entry', { tooth: newEntry.tooth, status: newEntry.status });
    newEntry.tooth = '';
    newEntry.status = '';
  }
}

function saveAll() {
  const payload = props.entries.map(e => ({ tooth: e.tooth, status: e.status }));
  emit('save-full', payload);
}

function deleteEntry(id: string) {
  emit('delete-entry', id);
}

function statusClass(status: ToothStatus) {
  return {
    'border-success': status === 'sano',
    'border-danger': status === 'caries',
    'border-warning': status === 'restaurado',
    'border-secondary': status === 'extraido'
  };
}
</script>

<style scoped>
.odontogram-tooth {
  width: 60px;
  border: 2px solid var(--color-gray-300);
  border-radius: 4px;
}
.border-success   { border-color: var(--color-success)   !important; }
.border-danger    { border-color: var(--color-danger)    !important; }
.border-warning   { border-color: var(--color-warning)   !important; }
.border-secondary { border-color: var(--color-secondary) !important; }
</style>
