<!-- src/views/student/AssignmentsView.vue -->
<template>
  <div class="assignments-view">
    <div class="header">
      <h1>Tareas Académicas</h1>
      <p class="subtitle">Gestiona tus asignaciones y entregas</p>
    </div>

    <div v-if="error" class="alert alert-error">
      {{ error }}
    </div>

    <div v-if="loading" class="loading-indicator">
      <div class="spinner"></div>
      <span>Cargando tareas...</span>
    </div>

    <div class="filters">
      <select v-model="statusFilter" class="filter-select">
        <option value="">Todas las tareas</option>
        <option value="Pendiente">Pendientes</option>
        <option value="En progreso">En progreso</option>
        <option value="Completada">Completadas</option>
      </select>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Buscar tareas..."
        class="search-input"
      />
    </div>

    <div class="assignments-container">
      <div
        v-for="assignment in filteredAssignments"
        :key="assignment.id"
        class="assignment-card"
        :class="{
          'pending': assignment.status === 'Pendiente',
          'in-progress': assignment.status === 'En progreso',
          'completed': assignment.status === 'Completada'
        }"
      >
        <div class="assignment-header">
          <h3>{{ assignment.title }}</h3>
          <span class="status-badge">{{ assignment.status }}</span>
        </div>

        <div class="assignment-body">
          <p class="subject">{{ assignment.subject }}</p>
          <p class="professor">Profesor: {{ assignment.professor }}</p>
          <p class="deadline">
            <i class="far fa-calendar-alt"></i>
            Fecha límite: {{ formatDate(assignment.deadline) }}
          </p>
          <p class="description">{{ assignment.description }}</p>

          <div class="progress-container">
            <div class="progress-bar">
              <div
                class="progress-fill"
                :style="{ width: `${assignment.progress}%` }"
              ></div>
            </div>
            <span class="progress-text">{{ assignment.progress }}% completado</span>
          </div>

          <div v-if="assignment.files.length > 0" class="files-section">
            <h4>Archivos entregados:</h4>
            <ul class="files-list">
              <li v-for="(file, index) in assignment.files" :key="index">
                <a :href="file" target="_blank" class="file-link">
                  <i class="far fa-file"></i> {{ getFileName(file) }}
                </a>
              </li>
            </ul>
          </div>

          <div class="assignment-actions">
            <div class="file-upload">
              <input
                type="file"
                :id="'file-input-' + assignment.id"
                class="file-input"
                @change="handleFileUpload($event, assignment.id)"
              />
              <label :for="'file-input-' + assignment.id" class="upload-btn">
                <i class="fas fa-upload"></i> Subir archivo
              </label>
            </div>

            <div class="status-actions">
              <button
                v-if="assignment.status === 'Pendiente'"
                class="action-btn start-btn"
                @click="updateAssignmentStatus(assignment.id, 'En progreso')"
              >
                <i class="fas fa-play"></i> Iniciar
              </button>
              <button
                v-if="assignment.status === 'En progreso'"
                class="action-btn complete-btn"
                @click="updateAssignmentStatus(assignment.id, 'Completada')"
              >
                <i class="fas fa-check"></i> Completar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredAssignments.length === 0" class="no-assignments">
        <i class="far fa-folder-open"></i>
        <p>No hay tareas que coincidan con los filtros</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useStudentStore } from '@/store/student'
import type { AssignmentStatus } from '@/mocks/student/assignments'

const studentStore = useStudentStore()
const loading = ref(false)
const error = ref<string | null>(null)
const searchQuery = ref('')
const statusFilter = ref<AssignmentStatus | ''>('')

onMounted(async () => {
  await loadAssignments()
})

async function loadAssignments() {
  try {
    loading.value = true
    error.value = null
    await studentStore.loadAssignments()
  } catch (err) {
    error.value = 'Error al cargar las tareas'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const filteredAssignments = computed(() => {
  return studentStore.assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      assignment.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStatus = !statusFilter.value || assignment.status === statusFilter.value
    
    return matchesSearch && matchesStatus
  })
})

function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }
  return new Date(dateString).toLocaleDateString('es-ES', options)
}

function getFileName(filePath: string) {
  return filePath.split('/').pop() || filePath
}

async function handleFileUpload(event: Event, assignmentId: number) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  
  if (file) {
    try {
      loading.value = true
      error.value = null
      // Usamos saveAssignmentMock para actualizar la tarea con el nuevo archivo
      const assignment = studentStore.assignments.find(a => a.id === assignmentId)
      if (assignment) {
        const updatedAssignment = {
          ...assignment,
          files: [...assignment.files, `uploads/${file.name}`],
          status: assignment.status === 'Pendiente' ? 'En progreso' : assignment.status,
          progress: Math.min(assignment.progress + 25, 100)
        }
        await studentStore.saveAssignment(updatedAssignment)
      }
      input.value = '' // Reset input
    } catch (err) {
      error.value = 'Error al subir el archivo'
      console.error(err)
    } finally {
      loading.value = false
    }
  }
}

async function updateAssignmentStatus(assignmentId: number, status: AssignmentStatus) {
  try {
    loading.value = true
    error.value = null
    // Buscamos la tarea y la actualizamos
    const assignment = studentStore.assignments.find(a => a.id === assignmentId)
    if (assignment) {
      let progress = assignment.progress
      if (status === 'Pendiente') progress = 0
      else if (status === 'En progreso') progress = Math.max(50, progress)
      else if (status === 'Completada') progress = 100

      const updatedAssignment = {
        ...assignment,
        status,
        progress
      }
      await studentStore.saveAssignment(updatedAssignment)
    }
  } catch (err) {
    error.value = 'Error al actualizar el estado de la tarea'
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<style src="@/assets/css/pages/student/AssignmentsView.css" scoped></style>