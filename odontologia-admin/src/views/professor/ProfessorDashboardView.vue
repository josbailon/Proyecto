<!-- src/views/professor/ProfessorDashboardView.vue -->
<template>
  <section class="professor-dashboard container py-4">
    <!-- Sprint 2 – 2025-07-16 – Dashboard del Profesor -->
    <h2 class="mb-4 text-primary">Panel de Control - Profesor</h2>

    <!-- Estadísticas rápidas -->
    <div class="row mb-4">
      <div class="col-md-4 mb-3">
        <div class="card text-center h-100 shadow-sm">
          <div class="card-body">
            <div class="mb-2">
              <i class="bi bi-file-earmark-text display-4 text-info"></i>
            </div>
            <h5 class="card-title">Tareas Creadas</h5>
            <p class="display-6">{{ assignmentsCount }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="card text-center h-100 shadow-sm">
          <div class="card-body">
            <div class="mb-2">
              <i class="bi bi-people display-4 text-success"></i>
            </div>
            <h5 class="card-title">Estudiantes a Cargo</h5>
            <p class="display-6">{{ studentsCount }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="card text-center h-100 shadow-sm">
          <div class="card-body">
            <div class="mb-2">
              <i class="bi bi-clock-history display-4 text-warning"></i>
            </div>
            <h5 class="card-title">Entregas Próximas</h5>
            <p class="display-6">{{ upcomingDue.length }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Lista de próximas entregas -->
    <div class="card shadow-sm">
      <div class="card-header bg-light">
        <i class="bi bi-calendar-event me-2"></i>Próximas Entregas (7 días)
      </div>
      <ul class="list-group list-group-flush">
        <li
          class="list-group-item d-flex justify-content-between align-items-center"
          v-for="a in upcomingDue"
          :key="a.id"
        >
          <div>
            <strong>{{ a.title }}</strong>  
            <small class="text-muted">({{ a.course }})</small>
          </div>
          <span class="badge bg-primary rounded-pill">
            {{ formatDate(a.dueDate) }}
          </span>
        </li>
        <li v-if="upcomingDue.length === 0" class="list-group-item text-center text-muted">
          No hay entregas próximas en los siguientes 7 días.
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { ProfessorAssignment } from '../../mocks/professor/assignments'
import { fetchProfessorAssignmentsMock } from '../../mocks/professor/assignments'
import type { StudentInfo } from '../../mocks/professor/studentsByCourse'
import { fetchStudentsByCourseMock } from '../../mocks/professor/studentsByCourse'

// Datos reactivos
const assignments = ref<ProfessorAssignment[]>([])
const students    = ref<StudentInfo[]>([])

// Carga inicial de datos
onMounted(async () => {
  assignments.value = await fetchProfessorAssignmentsMock()
  // Para estudiantes, tomamos la materia del primer assignment (si existe)
  if (assignments.value.length > 0) {
    const course = assignments.value[0].course
    students.value = await fetchStudentsByCourseMock(course)
  }
})

// Cálculos para la UI
const assignmentsCount = computed(() => assignments.value.length)
const studentsCount    = computed(() => students.value.length)

// Próximas entregas en los próximos 7 días
const upcomingDue = computed(() => {
  const now = new Date()
  const sevenDays = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
  return assignments.value
    .filter(a => {
      const due = new Date(a.dueDate)
      return due >= now && due <= sevenDays
    })
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
})

// Formatea fechas a DD/MM/AAAA
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString()
}
</script>

<style scoped src="../../assets/css/pages/professor/ProfessorDashboard.css"></style>
