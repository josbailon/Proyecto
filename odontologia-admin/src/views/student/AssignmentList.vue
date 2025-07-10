<!-- src/components/student/AssignmentList.vue -->
<template>
  <div class="assignment-list">
    <h5 class="mb-3">Mis Tareas Académicas</h5>

    <div v-if="!assignments.length" class="text-center text-muted py-4">
      No hay tareas para mostrar.
    </div>

    <div v-else>
      <div
        v-for="a in assignments"
        :key="a.id"
        class="card mb-3 shadow-sm"
      >
        <div class="card-body d-flex justify-content-between align-items-center">
          <div>
            <h6 class="card-title mb-1">{{ a.title }}</h6>
            <small class="text-muted">
              Fecha límite: {{ formatDate(a.dueDate) }}
            </small>
          </div>
          <div class="text-end">
            <span :class="statusClass(a.status)" class="me-3">
              {{ capitalize(a.status) }}
            </span>
            <button
              class="btn btn-sm btn-outline-primary me-1"
              @click="$emit('edit', a)"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              class="btn btn-sm btn-outline-danger"
              @click="$emit('delete', a.id)"
            >
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { Assignment } from '../../mocks/student/assignments';

// 1) Desestructuramos directamente el prop 'assignments'
const { assignments } = defineProps<{ assignments: Assignment[] }>();

// 2) Declaramos los eventos permitidos (no es necesario asignar a una variable)
defineEmits<{
  (e: 'edit', id: Assignment): void;
  (e: 'delete', id: number): void;
}>();

// Helpers para formatear y colorear
function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function statusClass(status: Assignment['status']) {
  switch (status) {
    case 'pendiente': return 'text-warning';
    case 'entregado': return 'text-info';
    case 'corregido': return 'text-success';
    default: return 'text-secondary';
  }
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
</script>

<style scoped>
.assignment-list .card {
  border-radius: var(--radius);
}
.assignment-list .card-body h6 {
  font-weight: 500;
}
.assignment-list .text-warning { color: var(--color-warning) !important; }
.assignment-list .text-info    { color: var(--color-info)    !important; }
.assignment-list .text-success { color: var(--color-success) !important; }
</style>
