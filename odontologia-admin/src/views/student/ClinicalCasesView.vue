<!-- src/views/student/ClinicalCasesView.vue -->
<template>
  <div class="ccv">
    <!-- Header -->
    <div class="ccv-header">
      <div class="ccv-header__title">
        <i class="fas fa-file-medical-alt"></i>
        <h1>Casos Clínicos</h1>
      </div>
      <button class="btn ccv-btn ccv-btn--add" @click="openCreateModal">
        <i class="fas fa-plus"></i> Nuevo Caso
      </button>
    </div>

    <!-- Lista de casos -->
    <div v-if="clinicalCases.length" class="ccv-grid">
      <div v-for="c in clinicalCases" :key="c.id" class="ccv-card">
        <div class="ccv-card__body">
          <div class="ccv-card__header">
            <h2>#{{ c.id }} - {{ c.patientName }}</h2>
            <span class="ccv-badge" :class="badgeColor(c.status)">
              {{ c.status }}
            </span>
          </div>
          <p><strong>Motivo:</strong> {{ c.reason }}</p>
          <p><strong>Creado:</strong> {{ c.createdAt }}</p>

          <div class="ccv-card__actions">
            <button class="ccv-btn ccv-btn--small" @click="openCase(c, 'desc')">
              <i class="fas fa-eye"></i> Ver Descripción
            </button>
            <button class="ccv-btn ccv-btn--small" @click="openCase(c, 'treat')">
              <i class="fas fa-tooth"></i> Tratamiento
            </button>
            <button class="ccv-btn ccv-btn--small" @click="openCase(c, 'rx')">
              <i class="fas fa-pills"></i> Prescripción
            </button>
            <button class="ccv-btn ccv-btn--small" @click="openCase(c, 'appts')">
              <i class="fas fa-calendar-plus"></i> Agendar Cita
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="ccv-empty">
      <p>No hay casos clínicos registrados.</p>
    </div>

    <!-- MODAL DE DETALLE -->
    <CaseDetail
      v-if="selectedCase"
      :case-data="selectedCase"
      :active-tab="activeTab"
      @close="closeModal"
    />

    <!-- MODAL DE CREACIÓN -->
    <div class="ccv-modal-backdrop" v-if="showCreateModal" @click.self="closeCreateModal"></div>
    <div class="ccv-modal" v-if="showCreateModal">
      <div class="ccv-modal__header">
        <h3>Nuevo Caso Clínico</h3>
        <button class="ccv-modal__close" @click="closeCreateModal">&times;</button>
      </div>
      <div class="ccv-modal__body">
        <form @submit.prevent="saveNewCase">
          <div class="form-group">
            <label>Título</label>
            <input v-model="newCase.title" type="text" class="form-control" required />
          </div>
          <div class="form-group">
            <label>Etapa</label>
            <select v-model="newCase.stage" class="form-control" required>
              <option disabled value="">Selecciona...</option>
              <option value="presentacion">Presentación</option>
              <option value="diagnostico">Diagnóstico</option>
              <option value="plan">Plan de Tratamiento</option>
              <option value="procedimiento">Procedimiento</option>
              <option value="seguimiento">Seguimiento</option>
            </select>
          </div>
          <div class="form-group">
            <label>Nombre del Paciente</label>
            <input v-model="newCase.patientName" type="text" class="form-control" required />
          </div>
          <div class="form-group">
            <label>Motivo de Consulta</label>
            <input v-model="newCase.reason" type="text" class="form-control" required />
          </div>
          <div class="form-group">
            <label>Síntomas</label>
            <textarea v-model="newCase.symptoms" class="form-control"></textarea>
          </div>
          <div class="form-group">
            <label>Descripción</label>
            <textarea v-model="newCase.description" class="form-control" rows="2"></textarea>
          </div>
          <div class="form-group">
            <label>Notas</label>
            <textarea v-model="newCase.notes" class="form-control"></textarea>
          </div>

          <!-- Procedimientos -->
          <div class="form-group">
            <label>Procedimientos</label>
            <button type="button" @click="addProcedure" class="btn btn-sm btn-success mb-2">
              + Añadir Procedimiento
            </button>
            <div v-for="(proc, index) in newCase.procedures" :key="index" class="mb-2">
              <input v-model="proc.code" placeholder="Código" class="form-control mb-1" />
              <input v-model="proc.teeth" placeholder="Dientes" class="form-control mb-1" />
              <input v-model="proc.description" placeholder="Descripción" class="form-control mb-1" />
            </div>
          </div>

          <!-- Prescripciones -->
          <div class="form-group">
            <label>Prescripciones</label>
            <button type="button" @click="addPrescription" class="btn btn-sm btn-success mb-2">
              + Añadir Prescripción
            </button>
            <div v-for="(rx, index) in newCase.prescriptions" :key="index" class="mb-2">
              <input v-model="rx.drug" placeholder="Medicamento" class="form-control mb-1" />
              <input v-model="rx.dose" placeholder="Dosis" class="form-control mb-1" />
            </div>
          </div>

          <!-- Citas -->
          <div class="form-group">
            <label>Citas</label>
            <button type="button" @click="addAppointment" class="btn btn-sm btn-success mb-2">
              + Añadir Cita
            </button>
            <div v-for="(appt, index) in newCase.appointments" :key="index" class="mb-2">
              <input v-model="appt.date" placeholder="Fecha y hora" class="form-control mb-1" />
              <input v-model="appt.status" placeholder="Estado" class="form-control mb-1" />
            </div>
          </div>

          <!-- Botón guardar -->
          <div class="text-end">
            <button type="submit" class="btn btn-primary">Guardar Caso</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CaseDetail from '@/components/student/CaseDetail.vue'
import { clinicalCases as initialCases, type ClinicalCase, type Status } from '../../mocks/student/clinicalCases'

const clinicalCases = ref<ClinicalCase[]>([...initialCases])
const selectedCase = ref<ClinicalCase | null>(null)
const activeTab = ref('desc')
const showCreateModal = ref(false)

function openCase(c: ClinicalCase, tab: string) {
  selectedCase.value = c
  activeTab.value = tab
}
function closeModal() {
  selectedCase.value = null
}
function openCreateModal() {
  showCreateModal.value = true
}
function closeCreateModal() {
  showCreateModal.value = false
}

const newCase = ref<ClinicalCase>({
  id: 0,
  title: '',
  stage: '',
  patientName: '',
  reason: '',
  symptoms: '',
  description: '',
  notes: '',
  createdAt: new Date().toISOString().split('T')[0],
  status: 'Pendiente',
  procedures: [],
  prescriptions: [],
  appointments: [],
  comments: [],
})

function addProcedure() {
  newCase.value.procedures.push({
    code: '',
    teeth: '',
    description: '',
    status: 'Pendiente'
  })
}
function addPrescription() {
  newCase.value.prescriptions.push({
    id: Date.now(),
    drug: '',
    dose: ''
  })
}
function addAppointment() {
  newCase.value.appointments.push({
    id: Date.now(),
    date: '',
    status: ''
  })
}
function saveNewCase() {
  const nextId = Math.max(...clinicalCases.value.map(c => c.id), 0) + 1
  newCase.value.id = nextId
  clinicalCases.value.push(JSON.parse(JSON.stringify(newCase.value)))
  closeCreateModal()
  newCase.value = {
    id: 0,
    title: '',
    stage: '',
    patientName: '',
    reason: '',
    symptoms: '',
    description: '',
    notes: '',
    createdAt: new Date().toISOString().split('T')[0],
    status: 'Pendiente',
    procedures: [],
    prescriptions: [],
    appointments: [],
    comments: [],
  }
}
function badgeColor(status: Status) {
  return {
    Pendiente: 'ccv-badge--yellow',
    Aprobado: 'ccv-badge--blue',
    Completado: 'ccv-badge--green',
  }[status]
}
</script>

<style src="@/assets/css/pages/student/ClinicalCases.css" scoped></style>
