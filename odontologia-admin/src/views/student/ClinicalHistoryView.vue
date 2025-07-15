<!-- src/views/student/ClinicalHistoryView.vue -->
<template>
  <div class="container-fluid py-4 bg-light min-vh-100">
    <!-- HEADER -->
    <div class="mb-5">
      <h1 class="fw-bold">Historia Clínica</h1>
      <p class="text-muted">Accede y gestiona las historias clínicas de tus pacientes</p>
      <div class="input-group w-75 w-md-50">
        <input
          v-model="searchTerm"
          @keyup.enter="onSearch"
          type="text"
          class="form-control"
          placeholder="Buscar paciente por nombre o cédula…"
        />
        <button class="btn btn-primary" @click="onSearch">Buscar</button>
      </div>
    </div>

    <!-- TARJETAS -->
    <div v-if="!filteredPatients.length" class="alert alert-warning">
      No se encontraron pacientes.
    </div>
    <div class="row gy-4">
      <div
        v-for="p in filteredPatients"
        :key="p.id"
        class="col-12 col-sm-6 col-lg-4"
      >
        <div class="card h-100 shadow-sm">
          <div class="card-body d-flex">
            <div
              class="avatar rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
            >
              {{ p.name.charAt(0) }}
            </div>
            <div class="flex-grow-1">
              <h5 class="card-title mb-1">{{ p.name }}</h5>
              <small class="text-secondary">{{ p.age }} años</small>
              <ul class="list-unstyled mt-3 mb-0 small text-secondary ps-0">
                <li><strong>Cédula:</strong> {{ p.cedula }}</li>
                <li><strong>Última visita:</strong> {{ p.lastVisit }}</li>
                <li><strong>Tratamientos:</strong> {{ p.history.length }}</li>
              </ul>
            </div>
          </div>
          <div class="card-footer bg-white border-0 d-flex justify-content-between align-items-center">
            <span class="badge bg-success">Activo</span>
            <button class="btn btn-link p-0" @click="openHistory(p)">
              Ver historia
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL -->
    <div
      class="modal-backdrop fade show"
      v-if="selected"
      @click.self="closeModal"
    ></div>
    <div
      class="modal d-block"
      tabindex="-1"
      v-if="selected"
      style="padding-top: 3rem;"
    >
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title">Historia de {{ selected.name }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div class="row mb-4">
              <!-- Info personal -->
              <div class="col-md-6">
                <h6 class="fw-bold">Información Personal</h6>
                <dl class="row">
                  <dt class="col-sm-4">Nombre completo:</dt>
                  <dd class="col-sm-8">{{ selected.name }}</dd>
                  <dt class="col-sm-4">Edad:</dt>
                  <dd class="col-sm-8">{{ selected.age }} años</dd>
                  <dt class="col-sm-4">Cédula:</dt>
                  <dd class="col-sm-8">{{ selected.cedula }}</dd>
                  <dt class="col-sm-4">Teléfono:</dt>
                  <dd class="col-sm-8">{{ selected.phone }}</dd>
                </dl>
              </div>
              <!-- Info médica -->
              <div class="col-md-6">
                <h6 class="fw-bold">Información Médica</h6>
                <dl class="row">
                  <dt class="col-sm-4">Alergias:</dt>
                  <dd class="col-sm-8">{{ selected.allergies }}</dd>
                  <dt class="col-sm-4">Medicamentos:</dt>
                  <dd class="col-sm-8">{{ selected.medications }}</dd>
                  <dt class="col-sm-4">Condiciones:</dt>
                  <dd class="col-sm-8">{{ selected.conditions }}</dd>
                </dl>
              </div>
            </div>

            <!-- Historial tratamientos -->
            <div>
              <h6 class="fw-bold mb-3">Historial de Tratamientos</h6>
              <ul class="list-group">
                <li
                  v-for="t in selected.history"
                  :key="t.id"
                  class="list-group-item d-flex justify-content-between align-items-start"
                >
                  <div class="ms-2 me-auto">
                    <div class="fw-semibold">{{ t.title }}</div>
                    <small class="text-muted">{{ t.description }}</small>
                    <div><small>Supervisor: {{ t.supervisor }}</small></div>
                  </div>
                  <span class="badge bg-secondary rounded-pill">{{ t.date }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="modal-footer border-0">
            <button class="btn btn-success" @click="startTreatment">
              Iniciar caso clinico
            </button>
            <button class="btn btn-outline-secondary" @click="closeModal">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Treatment {
  id: number;
  title: string;
  description: string;
  date: string;
  supervisor: string;
}
interface Patient {
  id: number;
  name: string;
  age: number;
  cedula: string;
  lastVisit: string;
  phone: string;
  allergies: string;
  medications: string;
  conditions: string;
  history: Treatment[];
}

const searchTerm = ref('');
const patients = ref<Patient[]>([
  {
    id: 1,
    name: 'María González',
    age: 35,
    cedula: '1234567890',
    lastVisit: '9 de enero de 2024',
    phone: '0991234567',
    allergies: 'Penicilina',
    medications: 'Ibuprofeno 400 mg',
    conditions: 'Hipertensión',
    history: [
      {
        id: 1,
        title: 'Limpieza dental',
        description: 'Profilaxis completa con aplicación de flúor',
        date: '9 de enero de 2024',
        supervisor: 'Dr. García'
      },
      {
        id: 2,
        title: 'Obturación',
        description: 'Restauración de caries en molar superior derecho',
        date: '14 de diciembre de 2023',
        supervisor: 'Dr. García'
      }
    ]
  },
  {
    id: 2,
    name: 'Carlos López',
    age: 28,
    cedula: '0987654321',
    lastVisit: '7 de enero de 2024',
    phone: '0997654321',
    allergies: 'Ninguna',
    medications: 'Ninguno',
    conditions: 'Saludable',
    history: [
      {
        id: 1,
        title: 'Ortodoncia',
        description: 'Colocación de brackets metálicos',
        date: '7 de enero de 2024',
        supervisor: 'Dra. Pérez'
      }
    ]
  }
]);

const filteredPatients = computed(() =>
  patients.value.filter(p =>
    p.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    p.cedula.includes(searchTerm.value)
  )
);

const selected = ref<Patient|null>(null);
function openHistory(p: Patient) { selected.value = p; }
function closeModal() { selected.value = null; }
function startTreatment() {
  alert(`Iniciando tratamiento para ${selected.value?.name}`);
}
function onSearch() {
  /* El filtrado es reactivo */
}
</script>

<style scoped>
.container-fluid {
  background: #f8fdf8;
}
.avatar {
  width: 50px;
  height: 50px;
  font-size: 1.25rem;
}
.card {
  border: none;
  border-radius: 0.75rem;
}
.card-body {
  padding: 1.25rem;
}
.card-footer {
  border-top: 1px solid #eee;
}
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1040;
}
.modal {
  position: fixed;
  inset: 0;
  z-index: 1050;
  overflow-y: auto;
}
.modal-content {
  border-radius: 0.5rem;
}
.list-group-item {
  border: none;
  border-bottom: 1px solid #eee;
}
.list-group-item:last-child {
  border-bottom: none;
}
</style>
