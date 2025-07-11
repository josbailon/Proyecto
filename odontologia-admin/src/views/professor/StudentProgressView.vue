<!-- src/views/professor/StudentProgressView.vue -->
<template>
  <section class="student-progress container py-4">
    <!-- Sprint 3 – 2025-07-20 – Vista de Progreso de Estudiantes -->
    <h2 class="mb-4">Progreso de Mis Estudiantes</h2>

    <!-- Filtros rápidos -->
    <div class="row mb-3">
      <div class="col-md-4">
        <label for="filter-course" class="form-label">Curso</label>
        <select id="filter-course" v-model="selectedCourse" class="form-select">
          <option value="">Todos</option>
          <option v-for="c in courses" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>
      <div class="col-md-4">
        <label for="filter-status" class="form-label">Estado</label>
        <select id="filter-status" v-model="selectedStatus" class="form-select">
          <option value="">Todos</option>
          <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
        </select>
      </div>
    </div>

    <!-- Tabla de progreso -->
    <div class="table-responsive">
      <table class="table table-hover align-middle">
        <thead class="table-light">
          <tr>
            <th>Estudiante</th>
            <th>Curso</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="entry in filteredProgress"
            :key="entry.id"
          >
            <td>{{ entry.studentName }}</td>
            <td>{{ entry.course }}</td>
            <td>{{ formatDate(entry.date) }}</td>
            <td>
              <span :class="statusBadge(entry.status)">{{ entry.status }}</span>
            </td>
            <td>
              <button
                class="btn btn-sm btn-outline-primary me-2"
                @click="viewDetails(entry.id)"
              >
                ✏️
              </button>
              <button
                class="btn btn-sm btn-outline-danger"
                @click="removeEntry(entry.id)"
              >
                🗑️
              </button>
            </td>
          </tr>
          <tr v-if="!filteredProgress.length">
            <td colspan="5" class="text-center text-muted">
              No hay registros que coincidan.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { StudentProgress } from '../../mocks/professor/progress';
import { fetchStudentProgressMock, deleteStudentProgressMock } from '../../mocks/professor/progress';

// Estado y filtros
const progress = ref<StudentProgress[]>([]);
const selectedCourse = ref<string>('');
const selectedStatus = ref<string>('');

// Carga inicial
onMounted(async () => {
  progress.value = await fetchStudentProgressMock();
});

// Derivados para filtros
const courses = computed(() =>
  Array.from(new Set(progress.value.map(p => p.course)))
);
const statuses = computed(() =>
  Array.from(new Set(progress.value.map(p => p.status)))
);

const filteredProgress = computed(() =>
  progress.value.filter(p =>
    (!selectedCourse.value || p.course === selectedCourse.value) &&
    (!selectedStatus.value || p.status === selectedStatus.value)
  )
);

// Acciones
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString();
}

function statusBadge(status: StudentProgress['status']): string {
  switch (status) {
    case 'completado': return 'badge bg-success';
    case 'en progreso': return 'badge bg-warning text-dark';
    case 'pendiente': return 'badge bg-secondary';
    default: return 'badge bg-light text-dark';
  }
}

function viewDetails(id: number) {
  // lógica para mostrar detalle (modal, redirección, etc.)
  console.log('Ver detalles de progreso ID', id);
}

async function removeEntry(id: number) {
  await deleteStudentProgressMock(id);
  progress.value = await fetchStudentProgressMock();
}
</script>

<style scoped src="@/assets/css/pages/professor/ProfessorProgress.css"></style>
