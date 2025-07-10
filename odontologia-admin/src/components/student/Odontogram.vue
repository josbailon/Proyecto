<template>
  <div class="odontogram-view">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5>Odontograma</h5>
      <button class="btn btn-sm btn-outline-primary" @click="mode = mode === 'view' ? 'history' : 'view'">
        {{ mode === 'view' ? 'Ver Historial' : 'Ver Actual' }}
      </button>
    </div>
    <div v-if="mode === 'view'">
      <OdontogramForm
        :entries="entries"
        @save-entry="e => emit('save-entry', e)"
        @delete-entry="id => emit('delete-entry', id)"
        @save-full="list => emit('save-full', list)"
      />
    </div>
    <div v-else>
      <OdontogramHistory :entries="entries" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { OdontogramEntry } from '../../mocks/student/odontogram';
import OdontogramForm    from './OdontogramForm.vue';
import OdontogramHistory from './OdontogramHistory.vue';

const { entries } = defineProps<{ entries: OdontogramEntry[] }>();
const emit = defineEmits<{
  (e: 'save-entry', entry: { tooth: string; status: string; id?: string }): void;
  (e: 'delete-entry', id: string): void;
  (e: 'save-full', entries: Array<{ tooth: string; status: string }>): void;
}>();

const mode = ref<'view' | 'history'>('view');
</script>

<style scoped>
.odontogram-view {
  padding: var(--spacer);
}
</style>
