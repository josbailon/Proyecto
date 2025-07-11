<!-- src/views/secretary/PatientAssignmentView.vue -->
<template>
  <section class="patient-assignment container py-4">
    <!-- Sprint 4 – 2025-07-18 – Gestión de asignación de pacientes -->
    <h2 class="mb-4">Asignación de Pacientes</h2>
    <div class="card shadow-sm">
      <div class="card-header d-flex align-items-center">
        <ul class="nav nav-tabs card-header-tabs flex-grow-1">
          <li class="nav-item">
            <a
              href="#"
              class="nav-link"
              :class="{ active: tab === 'list' }"
              @click.prevent="tab = 'list'"
            >
              Listado
            </a>
          </li>
          <li class="nav-item">
            <a
              href="#"
              class="nav-link"
              :class="{ active: tab === 'form' }"
              @click.prevent="prepareNew()"
            >
              {{ editMode ? 'Editar' : 'Crear' }}
            </a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <div v-if="tab === 'list'">
          <DataTable
            :columns="columns"
            :rows="assignments"
            :page="page"
            :per-page="perPage"
            @edit="onEdit"
            @delete="onDelete"
            @update:page="(val: number) => (page = val)"
          />
        </div>
        <div v-else>
          <PatientAssignmentForm
            :model-value="formModel"
            :edit-mode="editMode"
            @save="onSave"
            @cancel="() => (tab = 'list')"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DataTable               from '../../components/common/DataTable.vue'
import PatientAssignmentForm   from '../../components/secretary/PatientAssignmentForm.vue'
// Import relativo al mock de patientAssignments
import type { PatientAssignment } from '../../mocks/secretary/patientAssignments'
import {
  fetchPatientAssignmentsMock,
  savePatientAssignmentMock,
  deletePatientAssignmentMock
} from '../../mocks/secretary/patientAssignments'

const assignments = ref<PatientAssignment[]>([])
const tab         = ref<'list' | 'form'>('list')
const editMode    = ref(false)
const formModel   = ref<Partial<PatientAssignment>>({})
const page        = ref(1)
const perPage     = ref(10)

const columns = [
  { key: 'studentId', label: 'ID Estudiante' },
  { key: 'patientId', label: 'ID Paciente' }
]

onMounted(async () => {
  assignments.value = await fetchPatientAssignmentsMock()
})

function prepareNew() {
  editMode.value  = false
  formModel.value = {}
  tab.value       = 'form'
}

function onEdit(row: Record<string, any>) {
  editMode.value  = true
  formModel.value = { ...(row as PatientAssignment) }
  tab.value       = 'form'
}

async function onSave(payload: PatientAssignment) {
  await savePatientAssignmentMock(payload)
  assignments.value = await fetchPatientAssignmentsMock()
  tab.value         = 'list'
}

async function onDelete(id: number) {
  await deletePatientAssignmentMock(id)
  assignments.value = await fetchPatientAssignmentsMock()
}
</script>

<style src="@/assets/css/pages/secretary/PatientAssignment.css" scoped></style>
