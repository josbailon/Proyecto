<!-- src/views/student/ClinicalCasesView.vue -->
<template>
  <div class="ccv">
    <div class="ccv-header">
      <h1><i class="fas fa-file-medical-alt me-2"></i> Casos Clínicos</h1>
      <button class="btn btn-success" @click="createNewCase">
        <i class="fas fa-plus"></i> Nuevo Caso
      </button>
    </div>

    <div class="ccv-filters">
      <input
        v-model="filterTerm"
        type="text"
        class="form-control"
        placeholder="Buscar paciente o ID..."
      />
      <select v-model="statusFilter" class="form-select">
        <option value="">Todos los estados</option>
        <option v-for="s in allStatuses" :key="s" :value="s">
          {{ s }}
        </option>
      </select>
    </div>

    <div class="ccv-cards" v-if="filteredCases.length">
      <div v-for="c in filteredCases" :key="c.id" class="ccv-card shadow-sm">
        <div class="ccv-card-header">
          <h5 class="mb-1">#{{ c.id }} - {{ c.patientName }}</h5>
          <span class="badge" :class="badgeClass(c.status)">
            {{ c.status }}
          </span>
        </div>
        <p class="text-muted small mb-2">Creado: {{ c.createdAt }}</p>
        <p class="mb-2"><strong>Motivo:</strong> {{ c.reason }}</p>
        <div class="ccv-card-actions">
          <button class="btn btn-sm btn-outline-primary" @click="openCase(c, 'desc')">
            <i class="fas fa-eye"></i> Ver Descripción
          </button>
          <button class="btn btn-sm btn-outline-success" @click="openCase(c, 'treat')">
            <i class="fas fa-tooth"></i> Tratamiento
          </button>
          <button class="btn btn-sm btn-outline-info" @click="openCase(c, 'rx')">
            <i class="fas fa-prescription-bottle"></i> Prescripción
          </button>
          <button class="btn btn-sm btn-outline-warning" @click="openCase(c, 'appt')">
            <i class="fas fa-calendar-alt"></i> Agendar Cita
          </button>
        </div>
      </div>
    </div>

    <div v-else class="ccv-empty">
      <i class="fas fa-folder-open fa-2x mb-2"></i>
      <p>No se encontraron casos clínicos.</p>
    </div>

    <!-- Modal -->
    <div v-if="selectedCase" class="ccv-modal-backdrop" @click.self="closeModal"></div>
    <div v-if="selectedCase" class="ccv-modal">
      <div class="ccv-modal-header">
        <h5 class="modal-title">Caso #{{ selectedCase.id }} - {{ selectedCase.patientName }}</h5>
        <button class="btn-close" @click="closeModal"></button>
      </div>
      <div class="ccv-modal-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>
      <div class="ccv-modal-body">
        <div v-if="activeTab === 'desc'">
          <h6>Descripción</h6>
          <p><strong>Motivo:</strong> {{ selectedCase.reason }}</p>
          <p><strong>Descripción:</strong> {{ selectedCase.description }}</p>
        </div>

        <div v-if="activeTab === 'treat'">
          <h6>Tratamiento</h6>
          <p>{{ selectedCase.treatment }}</p>
          <table class="table table-sm mt-3">
            <thead>
              <tr>
                <th>Código</th>
                <th>Dientes</th>
                <th>Descripción</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in selectedCase.procedures" :key="p.code">
                <td>{{ p.code }}</td>
                <td>{{ p.teeth }}</td>
                <td>{{ p.description }}</td>
                <td>
                  <span class="badge" :class="badgeClass(p.status)">
                    {{ p.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="activeTab === 'rx'">
          <h6>Prescripciones</h6>
          <ul>
            <li v-for="r in selectedCase.prescriptions" :key="r">{{ r }}</li>
          </ul>
        </div>

        <div v-if="activeTab === 'appt'">
          <h6>Citas</h6>
          <ul>
            <li v-for="a in selectedCase.appointments" :key="a">{{ a }}</li>
          </ul>
        </div>
      </div>
      <div class="ccv-modal-footer">
        <button class="btn btn-secondary" @click="closeModal">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { ClinicalCase, Status } from '../../mocks/student/clinicalCases';
import { clinicalCasesMock } from '../../mocks/student/clinicalCases';

const cases = ref<ClinicalCase[]>(clinicalCasesMock);
const filterTerm = ref('');
const statusFilter = ref<Status | ''>('');

const allStatuses: Status[] = ['Borrador', 'Pendiente', 'Aprobado', 'Completado'];

const filteredCases = computed(() =>
  cases.value.filter(c =>
    (!filterTerm.value ||
      c.patientName.toLowerCase().includes(filterTerm.value.toLowerCase()) ||
      c.id.toString().includes(filterTerm.value)) &&
    (!statusFilter.value || c.status === statusFilter.value)
  )
);

const selectedCase = ref<ClinicalCase | null>(null);
const activeTab = ref('desc');

const tabs = [
  { id: 'desc', label: 'Descripción' },
  { id: 'treat', label: 'Tratamiento' },
  { id: 'rx', label: 'Prescripciones' },
  { id: 'appt', label: 'Citas' }
];

function badgeClass(status: Status) {
  return {
    Borrador: 'bg-secondary',
    Pendiente: 'bg-warning text-dark',
    Aprobado: 'bg-primary',
    Completado: 'bg-success'
  }[status];
}

function openCase(c: ClinicalCase, tab: string) {
  selectedCase.value = c;
  activeTab.value = tab;
}

function closeModal() {
  selectedCase.value = null;
}

function createNewCase() {
  alert('Aquí se abriría un formulario para crear un nuevo caso clínico.');
}
</script>

<style src="@/assets/css/pages/student/ClinicalCases.css" scoped></style>
