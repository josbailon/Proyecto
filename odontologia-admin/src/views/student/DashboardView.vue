<template>
  <div class="dashboard-container">
    <!-- Título y estadísticas -->
    <header class="dashboard-header">
      <h1>Mis Pacientes</h1>
      <p>Gestiona tus pacientes asignados y sus tratamientos</p>
      <button class="btn-new" @click="onNewPatient">+ Nuevo Paciente</button>
    </header>

    <section class="stats-cards">
      <div class="card stat-card green">
        <div class="stat-number">{{ stats.patients }}</div>
        <div class="stat-label">Total Pacientes</div>
      </div>
      <div class="card stat-card blue">
        <div class="stat-number">{{ stats.appointments }}</div>
        <div class="stat-label">Citas Hoy</div>
      </div>
      <div class="card stat-card purple">
        <div class="stat-number">{{ stats.activeTreatments }}</div>
        <div class="stat-label">Tratamientos Activos</div>
      </div>
      <div class="card stat-card orange">
        <div class="stat-number">{{ stats.completedCases }}</div>
        <div class="stat-label">Casos Completados</div>
      </div>
    </section>

    <!-- Filtro -->
    <section class="filter-bar">
      <input
        v-model="filterText"
        type="text"
        placeholder="Buscar pacientes..."
        class="filter-input"
      />
      <select v-model="filterState" class="filter-select">
        <option value="">Todos los estados</option>
        <option value="Activo">Activo</option>
        <option value="Completado">Completado</option>
      </select>
      <select v-model="filterTreatment" class="filter-select">
        <option value="">Todos los tratamientos</option>
        <option v-for="t in treatments" :key="t" :value="t">{{ t }}</option>
      </select>
    </section>

    <!-- Tabla de pacientes -->
    <table class="patients-table">
      <thead>
        <tr>
          <th>Paciente</th>
          <th>Tratamiento</th>
          <th>Estado</th>
          <th>Próxima Cita</th>
          <th>Progreso</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in filteredPatients" :key="p.id">
          <td class="patient-cell">
            <div class="avatar">{{ p.initials }}</div>
            <div>
              <div class="name">{{ p.name }}</div>
              <div class="email">{{ p.email }}</div>
            </div>
          </td>
          <td>
            <div class="treatment">{{ p.treatment }}</div>
            <div class="detail">{{ p.detail }}</div>
          </td>
          <td>
            <span
              class="badge"
              :class="p.state === 'Activo' ? 'badge-active' : 'badge-completed'"
            >{{ p.state }}</span>
          </td>
          <td>{{ p.nextAppointment }}</td>
          <td>
            <div class="progress-bar">
              <div class="fill" :style="{ width: p.progress + '%' }"></div>
            </div>
            <span class="percent">{{ p.progress }}%</span>
          </td>
          <td>
            <button class="btn-link">Ver</button>
            <button class="btn-link">Editar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { fetchPatientsMock, type Patient } from '../../mocks/student/patients'

interface Stats {
  patients: number
  appointments: number
  activeTreatments: number
  completedCases: number
}

const patients = ref<Array<Patient & { initials: string }>>([])
const stats = ref<Stats>({
  patients: 0,
  appointments: 0,
  activeTreatments: 0,
  completedCases: 0
})

const filterText = ref<string>('')
const filterState = ref<string>('')
const filterTreatment = ref<string>('')

const treatments = ['Endodoncia', 'Ortodoncia', 'Limpieza', 'Periodoncia']

function todayString(): string {
  const d = new Date()
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })
}

async function load(): Promise<void> {
  const data = await fetchPatientsMock()
  // añadir initials
  patients.value = data.map(p => ({
    ...p,
    initials: p.name
      .split(' ')
      .map(w => w[0])
      .join('')
  }))
  // estadísticas
  stats.value.patients = data.length
  stats.value.appointments = data.filter(p => p.nextAppointment.includes(todayString())).length
  stats.value.activeTreatments = data.filter(p => p.state === 'Activo').length
  stats.value.completedCases = data.filter(p => p.state === 'Completado').length
}

onMounted(load)

const filteredPatients = computed(() =>
  patients.value.filter(p =>
    p.name.toLowerCase().includes(filterText.value.toLowerCase()) &&
    (!filterState.value || p.state === filterState.value) &&
    (!filterTreatment.value || p.treatment === filterTreatment.value)
  )
)

function onNewPatient() {
  // lanza modal o navega a un formulario de nuevo paciente
  alert('Aquí abrirías el formulario de Nuevo Paciente')
}
</script>

<style src="@/assets/css/pages/student/Dashboard.css" scoped></style>
