<template>
  <section class="patient-assignment container py-4">
    <h2>Asignación de Pacientes</h2>

    <div class="tabs-container">
      <button :class="{ active: tab === 'list' }" @click="tab = 'list'">Listado</button>
      <button :class="{ active: tab === 'form' }" @click="prepareNew">Nueva/Editar</button>
    </div>

    <div v-if="tab === 'list'" class="list-section">
      <div class="filters">
        <label>
          Estado:
          <select v-model="filterEstado">
            <option value="Todas">Todas</option>
            <option value="asignado">Asignado</option>
            <option value="cancelado">Cancelado</option>
            <option value="finalizado">Finalizado</option>
          </select>
        </label>
        <label>
          Estudiante ID:
          <select v-model="filterEstudianteId">
            <option :value="null">Todos</option>
            <option v-for="id in estudianteIds" :key="id" :value="id">
              {{ id }}
            </option>
          </select>
        </label>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Estudiante</th>
            <th>Paciente</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="a in filteredAssignments" :key="a.id">
            <td>{{ a.id }}</td>
            <td>{{ a.estudianteId }}</td>
            <td>{{ a.pacienteId }}</td>
            <td>{{ a.fechaAsignacion }}</td>
            <td>{{ a.estado }}</td>
            <td>
              <button @click="onEdit(a)">✏️</button>
              <button class="btn-danger" @click="onDelete(a.id)">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="form-section">
      <form @submit.prevent="onSave">
        <label>
          Estudiante ID:
          <input type="number" v-model="form.estudianteId" required />
        </label>
        <label>
          Paciente ID:
          <input type="number" v-model="form.pacienteId" required />
        </label>
        <label>
          Fecha:
          <input type="date" v-model="form.fechaAsignacion" required />
        </label>
        <label>
          Estado:
          <select v-model="form.estado" required>
            <option value="asignado">asignado</option>
            <option value="cancelado">cancelado</option>
            <option value="finalizado">finalizado</option>
          </select>
        </label>
        <label>
          Notas:
          <textarea v-model="form.notas"></textarea>
        </label>
        <div class="form-actions">
          <button type="submit">{{ editMode ? 'Actualizar' : 'Guardar' }}</button>
          <button type="button" @click="tab = 'list'">Cancelar</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  fetchPatientAssignmentsMock,
  addPatientAssignmentMock,
  updatePatientAssignmentMock,
  deletePatientAssignmentMock
} from '@/mocks/secretary/patientAssignments'

// local state
const tab = ref('list')
const assignments = ref([])
const form = ref({})
const editMode = ref(false)

const filterEstado = ref('Todas')
const filterEstudianteId = ref(null)

const estudianteIds = computed(() => {
  const ids = assignments.value.map(a => a.estudianteId)
  return Array.from(new Set(ids))
})

// load data
async function load() {
  assignments.value = await fetchPatientAssignmentsMock()
}
onMounted(load)

// list filtering
const filteredAssignments = computed(() =>
  assignments.value.filter(a =>
    (filterEstado.value === 'Todas' || a.estado === filterEstado.value) &&
    (filterEstudianteId.value === null || a.estudianteId === filterEstudianteId.value)
  )
)

// actions
function prepareNew() {
  form.value = {}
  editMode.value = false
  tab.value = 'form'
}

function onEdit(a) {
  form.value = { ...a }
  editMode.value = true
  tab.value = 'form'
}

async function onSave() {
  if (editMode.value) {
    await updatePatientAssignmentMock(form.value)
  } else {
    await addPatientAssignmentMock({
      ...form.value,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
  }
  await load()
  tab.value = 'list'
}

async function onDelete(id) {
  if (confirm('¿Está seguro de eliminar esta asignación?')) {
    await deletePatientAssignmentMock(id)
    await load()
  }
}
</script>

<style scoped>
.patient-assignment {
  max-width: 800px;
  margin: auto;
  padding: 1rem;
}
.tabs-container button {
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  background: #ddd;
}
.tabs-container button.active {
  background: #aaa;
  color: white;
}
.filters {
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
}
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th, .table td {
  border: 1px solid #ccc;
  padding: 0.5rem;
}
.btn-danger {
  background: #d9534f;
  color: #fff;
  border: none;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
}
.form-section form {
  display: grid;
  gap: 0.8rem;
}
.form-actions {
  margin-top: 1rem;
}
.form-actions button {
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
}
</style>
