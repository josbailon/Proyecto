<!-- src/views/student/ClinicalCasesView.vue -->

<template>
  <div class="clinical-cases-view">
    <div class="header">
      <h1>Casos Clínicos</h1>
      <p class="subtitle">Gestiona tus casos clínicos asignados</p>
    </div>

    <div v-if="error" class="alert alert-error">
      {{ error }}
    </div>

    <div v-if="loading" class="loading-indicator">
      <div class="spinner"></div>
      <span>Cargando casos clínicos...</span>
    </div>

    <div class="controls">
      <div class="search-box">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar casos..."
          class="search-input"
        >
        <i class="fas fa-search search-icon"></i>
      </div>
      
      <button 
        class="btn btn-primary add-case-btn"
        @click="openCreateModal"
      >
        <i class="fas fa-plus"></i> Nuevo Caso Clínico
      </button>
    </div>

    <div class="cases-container">
      <div 
        v-for="clinicalCase in filteredCases"
        :key="clinicalCase.id"
        class="case-card"
        @click="selectCase(clinicalCase)"
      >
        <div class="case-header">
          <h3>{{ clinicalCase.patientName }}</h3>
          <span class="status-badge" :class="statusClass(clinicalCase.status)">
            {{ formatStatus(clinicalCase.status) }}
          </span>
        </div>

        <div class="case-body">
          <p class="title">{{ clinicalCase.title }}</p>
          <p class="stage">Etapa: {{ formatStage(clinicalCase.stage) }}</p>
          <p class="reason">Motivo: {{ clinicalCase.reason }}</p>
          
          <div class="dates">
            <p>
              <i class="far fa-calendar-alt"></i>
              Creado: {{ formatDate(clinicalCase.createdAt) }}
            </p>
            <p v-if="clinicalCase.updatedAt !== clinicalCase.createdAt">
              <i class="fas fa-sync-alt"></i>
              Actualizado: {{ formatDate(clinicalCase.updatedAt) }}
            </p>
          </div>
        </div>
      </div>

      <div v-if="filteredCases.length === 0 && !loading" class="no-cases">
        <i class="far fa-folder-open"></i>
        <p>No hay casos clínicos registrados</p>
        <button 
          class="btn btn-outline-primary"
          @click="openCreateModal"
        >
          Crear primer caso clínico
        </button>
      </div>
    </div>

    <!-- Modal de creación/edición -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ editingCase ? 'Editar Caso Clínico' : 'Nuevo Caso Clínico' }}</h2>
          <button class="close-btn" @click="closeModal">&times;</button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="saveCase">
            <div class="form-group">
              <label>Nombre del Paciente *</label>
              <input 
                v-model="formData.patientName" 
                type="text" 
                required
                class="form-control"
                :disabled="loading"
              >
            </div>

            <div class="form-group">
              <label>Título del Caso *</label>
              <input 
                v-model="formData.title" 
                type="text" 
                required
                class="form-control"
                :disabled="loading"
              >
            </div>

            <div class="form-group">
              <label>Etapa *</label>
              <select 
                v-model="formData.stage" 
                required
                class="form-control"
                :disabled="loading"
              >
                <option value="presentacion">Presentación</option>
                <option value="diagnostico">Diagnóstico</option>
                <option value="plan">Plan de Tratamiento</option>
                <option value="procedimiento">Procedimiento</option>
                <option value="seguimiento">Seguimiento</option>
              </select>
            </div>

            <div class="form-group">
              <label>Motivo de Consulta *</label>
              <textarea 
                v-model="formData.reason" 
                required
                class="form-control"
                rows="3"
                :disabled="loading"
              ></textarea>
            </div>

            <div class="form-group">
              <label>Síntomas</label>
              <textarea 
                v-model="formData.symptoms" 
                class="form-control"
                rows="3"
                :disabled="loading"
              ></textarea>
            </div>

            <div class="form-group">
              <label>Notas Adicionales</label>
              <textarea 
                v-model="formData.notes" 
                class="form-control"
                rows="2"
                :disabled="loading"
              ></textarea>
            </div>

            <div class="form-actions">
              <button 
                type="button" 
                class="btn btn-secondary"
                @click="closeModal"
                :disabled="loading"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                class="btn btn-primary"
                :disabled="isSaveDisabled"
              >
                <span v-if="loading">
                  <i class="fas fa-spinner fa-spin"></i> Procesando...
                </span>
                <span v-else>
                  {{ editingCase ? 'Actualizar' : 'Guardar' }}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal de detalles -->
    <div v-if="selectedCase" class="modal-overlay" @click.self="selectedCase = null">
      <div class="modal-content large-modal">
        <div class="modal-header">
          <h2>Detalles del Caso Clínico</h2>
          <button class="close-btn" @click="selectedCase = null">&times;</button>
        </div>

        <div class="modal-body">
          <div class="case-details">
            <div class="patient-info">
              <h3>{{ selectedCase.patientName }}</h3>
              <p class="case-title">{{ selectedCase.title }}</p>
              <div class="status-display" :class="statusClass(selectedCase.status)">
                {{ formatStatus(selectedCase.status) }}
              </div>
            </div>
            
            <div class="detail-grid">
              <div class="detail-section">
                <h4><i class="fas fa-info-circle"></i> Información Básica</h4>
                <div class="detail-item">
                  <span class="detail-label">Etapa:</span>
                  <span class="detail-value">{{ formatStage(selectedCase.stage) }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Motivo:</span>
                  <span class="detail-value">{{ selectedCase.reason }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Síntomas:</span>
                  <span class="detail-value">{{ selectedCase.symptoms || 'No especificado' }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Notas:</span>
                  <span class="detail-value">{{ selectedCase.notes || 'No hay notas adicionales' }}</span>
                </div>
              </div>

              <div class="detail-section">
                <h4><i class="fas fa-calendar-alt"></i> Fechas</h4>
                <div class="detail-item">
                  <span class="detail-label">Creado:</span>
                  <span class="detail-value">{{ formatDate(selectedCase.createdAt) }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Actualizado:</span>
                  <span class="detail-value">{{ formatDate(selectedCase.updatedAt) }}</span>
                </div>
              </div>
            </div>

            <div class="case-actions">
              <button 
                class="btn btn-primary"
                @click="editCase(selectedCase)"
                :disabled="loading"
              >
                <i class="fas fa-edit"></i> Editar
              </button>
              <button 
                class="btn btn-danger"
                @click="deleteCase(selectedCase.id)"
                :disabled="loading"
              >
                <i class="fas fa-trash"></i> Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useStudentStore } from '@/store/student'
import type { ClinicalCase, ClinicalCaseStatus, CaseStage } from '@/mocks/student/clinicalCases'

const studentStore = useStudentStore()
const loading = ref(false)
const error = ref<string | null>(null)
const searchQuery = ref('')
const showModal = ref(false)
const editingCase = ref(false)
const selectedCase = ref<ClinicalCase | null>(null)

// Form data
const formData = ref({
  patientName: '',
  title: '',
  stage: 'presentacion' as CaseStage,
  reason: '',
  symptoms: '',
  notes: ''
})

// Computed properties
const filteredCases = computed(() => {
  if (!searchQuery.value) return studentStore.cases
  
  return studentStore.cases.filter(clinicalCase => {
    const search = searchQuery.value.toLowerCase()
    return (
      clinicalCase.patientName.toLowerCase().includes(search) ||
      clinicalCase.title.toLowerCase().includes(search) ||
      clinicalCase.reason.toLowerCase().includes(search) ||
      (clinicalCase.symptoms && clinicalCase.symptoms.toLowerCase().includes(search)) ||
      (clinicalCase.notes && clinicalCase.notes.toLowerCase().includes(search))
    )
  })
})

const isSaveDisabled = computed(() => {
  return loading.value || 
    !formData.value.patientName || 
    !formData.value.title || 
    !formData.value.reason
})

// Lifecycle hooks
onMounted(async () => {
  await loadCases()
})

// Methods
async function loadCases(): Promise<void> {
  try {
    loading.value = true
    error.value = null
    await studentStore.loadCases()
  } catch (err) {
    error.value = 'Error al cargar los casos clínicos'
    console.error(err)
  } finally {
    loading.value = false
  }
}

function formatStatus(status: ClinicalCaseStatus): string {
  const statusMap: Record<ClinicalCaseStatus, string> = {
    'pendiente_general': 'Pendiente (General)',
    'pendiente_especialidad': 'Pendiente (Especialidad)',
    'aprobado': 'Aprobado',
    'completado': 'Completado'
  }
  return statusMap[status] || status
}

function statusClass(status: ClinicalCaseStatus): string {
  return {
    'pendiente_general': 'status-pending',
    'pendiente_especialidad': 'status-pending-specialty',
    'aprobado': 'status-approved',
    'completado': 'status-completed'
  }[status]
}

function formatStage(stage: CaseStage): string {
  const stageMap: Record<CaseStage, string> = {
    'presentacion': 'Presentación',
    'diagnostico': 'Diagnóstico',
    'plan': 'Plan de Tratamiento',
    'procedimiento': 'Procedimiento',
    'seguimiento': 'Seguimiento'
  }
  return stageMap[stage] || stage
}

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  return new Date(dateString).toLocaleDateString('es-ES', options)
}

function openCreateModal(): void {
  resetForm()
  editingCase.value = false
  showModal.value = true
}

function selectCase(clinicalCase: ClinicalCase): void {
  selectedCase.value = clinicalCase
}

function editCase(clinicalCase: ClinicalCase): void {
  formData.value = {
    patientName: clinicalCase.patientName,
    title: clinicalCase.title,
    stage: clinicalCase.stage,
    reason: clinicalCase.reason,
    symptoms: clinicalCase.symptoms || '',
    notes: clinicalCase.notes || ''
  }
  editingCase.value = true
  showModal.value = true
}

function resetForm(): void {
  formData.value = {
    patientName: '',
    title: '',
    stage: 'presentacion',
    reason: '',
    symptoms: '',
    notes: ''
  }
}

function closeModal(): void {
  if (!loading.value) {
    showModal.value = false
  }
}

async function saveCase(): Promise<void> {
  try {
    loading.value = true
    error.value = null

    const caseData: ClinicalCase = editingCase.value && selectedCase.value 
      ? prepareUpdateData()
      : prepareCreateData()

    await studentStore.saveCase(caseData)
    closeModal()
    resetForm()
    selectedCase.value = null
  } catch (err) {
    error.value = 'Error al guardar el caso clínico'
    console.error(err)
  } finally {
    loading.value = false
  }
}

function prepareUpdateData(): ClinicalCase {
  if (!selectedCase.value) {
    throw new Error('No hay caso seleccionado para actualizar')
  }

  return {
    ...selectedCase.value,
    patientName: formData.value.patientName,
    title: formData.value.title,
    stage: formData.value.stage,
    reason: formData.value.reason,
    symptoms: formData.value.symptoms,
    notes: formData.value.notes,
    updatedAt: new Date().toISOString()
  }
}

function prepareCreateData(): ClinicalCase {
  const now = new Date().toISOString()
  
  return {
    id: generateNewId(),
    patientId: 0, // Se asignará al guardar
    patientName: formData.value.patientName,
    title: formData.value.title,
    stage: formData.value.stage,
    reason: formData.value.reason,
    symptoms: formData.value.symptoms,
    notes: formData.value.notes,
    status: 'pendiente_general',
    generalQuestions: [],
    specialistQuestions: [],
    procedures: [],
    prescriptions: [],
    appointments: [],
    comments: [],
    odontogram: [],
    periodontogram: [],
    createdAt: now,
    updatedAt: now
  }
}

function generateNewId(): number {
  const ids = studentStore.cases.map(c => c.id)
  return ids.length > 0 ? Math.max(...ids) + 1 : 1
}

async function deleteCase(id: number): Promise<void> {
  if (!confirm('¿Estás seguro de eliminar este caso clínico? Esta acción no se puede deshacer.')) {
    return
  }

  try {
    loading.value = true
    error.value = null
    await studentStore.deleteCase(id)
    selectedCase.value = null
  } catch (err) {
    error.value = 'Error al eliminar el caso clínico'
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<style src="@/assets/css/pages/student/ClinicalCasesView.css" scoped></style>