<!-- src/views/student/DashboardView.vue -->
<template>
  <div class="dashboard-container">
    <!-- Encabezado compacto -->
    <div class="header-container">
      <div class="header-text">
        <h1>Mis Pacientes</h1>
        <p>Gestiona tus pacientes asignados y sus tratamientos</p>
      </div>
      <div class="stats-cards">
        <div class="stat-card green">
          <div class="stat-number">{{ stats.patients }}</div>
          <div class="stat-label">Pacientes</div>
        </div>
        <div class="stat-card blue">
          <div class="stat-number">{{ stats.appointments }}</div>
          <div class="stat-label">Citas Hoy</div>
        </div>
        <div class="stat-card purple">
          <div class="stat-number">{{ stats.activeTreatments }}</div>
          <div class="stat-label">Trat. Activos</div>
        </div>
        <div class="stat-card orange">
          <div class="stat-number">{{ stats.completedCases }}</div>
          <div class="stat-label">Casos Comp.</div>
        </div>
      </div>
    </div>

    <!-- Filtros compactos -->
    <div class="filter-bar">
      <input
        v-model="filterText"
        type="text"
        placeholder="Buscar pacientes..."
        class="filter-input"
      />
      <select v-model="filterState" class="filter-select">
        <option value="">Todos los estados</option>
        <option value="Activo">Activo</option>
        <option value="Pendiente">Pendiente</option>
        <option value="Completado">Completado</option>
      </select>
      <select v-model="filterTreatment" class="filter-select">
        <option value="">Todos los tratamientos</option>
        <option v-for="t in treatments" :key="t" :value="t">{{ t }}</option>
      </select>
    </div>

    <!-- Tabla compacta de pacientes -->
    <div class="table-container">
      <table class="patients-table">
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Tratamiento</th>
            <th>Estado</th>
            <th>Próxima Cita</th>
            <th>Progreso</th>
            <th class="actions-col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in filteredPatients" :key="p.id">
            <td class="patient-cell">
              <div class="avatar">{{ p.initials }}</div>
              <div class="patient-info">
                <div class="name">{{ p.name }}</div>
                <div class="email">{{ p.email }}</div>
              </div>
            </td>
            <td class="treatment-cell">
              <div class="treatment">{{ p.treatment }}</div>
              <div class="detail">{{ truncate(p.detail, 25) }}</div>
            </td>
            <td class="state-cell">
              <span
                class="badge"
                :class="{
                  'badge-active': p.state === 'Activo',
                  'badge-pending': p.state === 'Pendiente',
                  'badge-completed': p.state === 'Completado'
                }"
              >
                {{ p.state }}
              </span>
            </td>
            <td class="date-cell">{{ p.nextAppointment }}</td>
            <td class="progress-cell">
              <div class="progress-container">
                <div class="progress-bar">
                  <div class="fill" :style="{ width: p.progress + '%' }"></div>
                </div>
                <span class="percent">{{ p.progress }}%</span>
              </div>
            </td>
            <td class="actions-cell">
              <button class="btn-view" @click="openHistory(p)">
                <i class="fas fa-eye"></i>
              </button>
            </td>
          </tr>
          <tr v-if="filteredPatients.length === 0">
            <td colspan="6" class="text-center py-2 text-muted">
              No se encontraron pacientes.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal compacto -->
    <div
      class="modal-backdrop"
      v-if="selected"
      @click.self="closeModal"
    ></div>
    <div
      class="modal"
      v-if="selected"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <i class="fas fa-user me-1 text-primary"></i>
            {{ selected.name }}
          </h5>
          <button type="button" class="btn-close" @click="closeModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="info-section">
            <!-- Info personal -->
            <div class="info-block">
              <h6>Información Personal</h6>
              <div class="info-row">
                <span class="info-label">Nombre:</span>
                <span class="info-value">{{ selected.name }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Edad:</span>
                <span class="info-value">{{ selected.age }} años</span>
              </div>
              <div class="info-row">
                <span class="info-label">Cédula:</span>
                <span class="info-value">{{ selected.cedula }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Teléfono:</span>
                <span class="info-value">{{ selected.phone }}</span>
              </div>
            </div>
            
            <!-- Info médica -->
            <div class="info-block">
              <h6>Información Médica</h6>
              <div class="info-row">
                <span class="info-label">Alergias:</span>
                <span class="info-value">{{ selected.allergies.join(', ') }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Medicamentos:</span>
                <span class="info-value">{{ selected.medications.join(', ') }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Condiciones:</span>
                <span class="info-value">{{ selected.conditions }}</span>
              </div>
            </div>
          </div>

          <div class="history-section">
            <h6>Historial de Tratamientos</h6>
            <ul class="history-list">
              <li
                v-for="t in selected.history"
                :key="t.id"
                class="history-item"
              >
                <div class="history-content">
                  <div class="history-title">{{ t.title }}</div>
                  <div class="history-description">{{ t.description }}</div>
                  <div class="history-supervisor">Supervisor: {{ t.supervisor }}</div>
                </div>
                <span class="history-date">
                  {{ t.date }}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-start" @click="startTreatment">
            <i class="fas fa-stethoscope me-1"></i> Iniciar caso
          </button>
          <button class="btn btn-close-modal" @click="closeModal">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { fetchPatientsMock, type Patient } from '@/mocks/student/patients'
import type { Treatment } from '@/mocks/student/clinicalHistories'

interface DashboardPatient extends Patient {
  initials: string
  state: string
  treatment: string
  detail: string
  progress: number
  cedula: string
  conditions: string
  history: Treatment[]
}

interface Stats {
  patients: number
  appointments: number
  activeTreatments: number
  completedCases: number
}

const patients = ref<DashboardPatient[]>([])
const stats = ref<Stats>({
  patients: 0,
  appointments: 0,
  activeTreatments: 0,
  completedCases: 0
})

const filterText = ref('')
const filterState = ref('')
const filterTreatment = ref('')

const treatments = ['Endodoncia', 'Ortodoncia', 'Limpieza', 'Periodoncia']

function todayString(): string {
  const d = new Date()
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })
}

async function load(): Promise<void> {
  const data = await fetchPatientsMock()
  const today = todayString()
  const mapped: DashboardPatient[] = data.map(p => {
    const initials = p.name.split(' ').map(w => w[0]).join('')
    const nextAppt = p.nextAppointment ?? ''
    const state = nextAppt.includes(today) ? 'Activo' : (nextAppt ? 'Pendiente' : 'Completado')
    const firstTreat = p.treatments[0] ?? { id: 0, title: '-', description: '', date: '', supervisor: '', observations: '' }
    const totalTreatments = p.treatments.length
    const progress = totalTreatments ? Math.min(100, Math.round((1 / totalTreatments) * 100)) : 0
    return {
      ...p,
      initials,
      state,
      treatment: firstTreat.title,
      detail: firstTreat.description,
      progress,
      cedula: p.identification,
      conditions: p.medicalConditions.join(', '),
      history: p.treatments
    }
  })
  patients.value = mapped
  stats.value.patients = mapped.length
  stats.value.appointments = mapped.filter(p => p.nextAppointment?.includes(today)).length
  stats.value.activeTreatments = mapped.filter(p => p.state === 'Activo').length
  stats.value.completedCases = mapped.filter(p => p.state === 'Completado').length
}

onMounted(load)

const filteredPatients = computed(() =>
  patients.value.filter(p =>
    p.name.toLowerCase().includes(filterText.value.toLowerCase()) &&
    (!filterState.value || p.state === filterState.value) &&
    (!filterTreatment.value || p.treatment === filterTreatment.value)
  )
)

const selected = ref<DashboardPatient | null>(null)

function openHistory(p: DashboardPatient) {
  selected.value = p
}

function closeModal() {
  selected.value = null
}

function startTreatment() {
  if (!selected.value) return
  alert(`Iniciando tratamiento para ${selected.value.name}`)
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}
</script>

<style src="@/assets/css/pages/student/Dashboard.css" scoped></style>