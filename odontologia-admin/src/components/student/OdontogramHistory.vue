<!-- src/components/student/OdontogramHistory.vue -->

<template>
  <div class="odontogram-history">
    <h5 class="mb-3">Historial Odontograma</h5>
    <ul class="list-group">
      <li
        v-for="entry in entries"
        :key="entry.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div>
          <strong>{{ entry.tooth }}</strong> — {{ entry.status }}
        </div>
        <small class="text-muted">{{ formatDate(entry.updatedAt) }}</small>
      </li>
      <li
        v-if="!entries.length"
        class="list-group-item text-center text-muted"
      >
        Sin entradas previas.
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { OdontogramEntry } from '../../mocks/student/odontogram';

const { entries } = defineProps<{ entries: OdontogramEntry[] }>();

function formatDate(iso: string) {
  return new Date(iso).toLocaleString();
}
</script>

<style scoped>
.odontogram-history .list-group-item {
  border-radius: var(--radius);
  margin-bottom: var(--spacer-sm);
}
</style>
