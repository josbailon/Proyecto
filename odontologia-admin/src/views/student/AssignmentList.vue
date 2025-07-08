<!-- src/components/student/AssignmentList.vue -->
<template>
  <div class="assignment-list">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3><i class="fas fa-file-upload me-2"></i>Mis Tareas</h3>
      <button class="btn btn-sm btn-primary" @click="uploadNew()">
        <i class="fas fa-plus me-1"></i>Subir tarea
      </button>
    </div>
    <table class="table table-hover align-middle">
      <thead class="table-light">
        <tr>
          <th>Título</th>
          <th>Fecha de entrega</th>
          <th>Estado</th>
          <th class="text-end">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in assignments" :key="t.id">
          <td>{{ t.title }}</td>
          <td>{{ formatDate(t.dueDate) }}</td>
          <td>
            <span
              class="badge"
              :class="`bg-${statusClass(t.status)}`"
            >{{ t.status }}</span>
          </td>
          <td class="text-end">
            <button
              class="btn btn-outline-secondary btn-sm me-1"
              @click="viewTask(t)"
              title="Ver tarea"
            >
              <i class="fas fa-eye"></i>
            </button>
            <button
              class="btn btn-outline-success btn-sm"
              @click="uploadNew(t)"
              title="Subir nueva versión"
            >
              <i class="fas fa-upload"></i>
            </button>
          </td>
        </tr>
        <tr v-if="assignments.length === 0">
          <td colspan="4" class="text-center text-muted py-3">
            No tienes tareas asignadas.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchAssignmentsMock } from '../../mocks/api';
import type { Assignment } from '../../mocks/student/assignments';

const assignments = ref<Assignment[]>([]);

onMounted(async () => {
  assignments.value = await fetchAssignmentsMock();
});

function viewTask(task: Assignment) {
  // Aquí podrías navegar a una vista de detalle o abrir un modal
  console.log('Ver tarea', task.id);
}

function uploadNew(task?: Assignment) {
  // Aquí podrías abrir el formulario para subir la tarea
  console.log('Subir tarea para', task?.id ?? 'nueva');
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}

function statusClass(status: string) {
  switch (status) {
    case 'entregado': return 'success';
    case 'pendiente': return 'warning';
    case 'corregido': return 'info';
    default: return 'secondary';
  }
}
</script>

<style src="../../assets/css/components/AssignmentList.css" scoped></style>
