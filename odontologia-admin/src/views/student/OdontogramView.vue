<template>
  <div class="odonto-view">
    <h1 class="odonto-title">Odontograma</h1>

    <!-- SELECCIÓN DE PACIENTE Y TIPO -->
    <div class="odonto-select-bar">
      <select v-model="selectedPatientId" @change="loadPatientOdontogram">
        <option :value="null" disabled>Selecciona un paciente</option>
        <option v-for="p in patients" :key="p.id" :value="p.id">
          {{ p.name }}
        </option>
      </select>

      <select v-model="selectedOdontogramType">
        <option value="">Selecciona tipo de odontograma</option>
        <option v-for="t in odontogramTypes" :key="t" :value="t">{{ t }}</option>
      </select>

      <button class="btn btn-primary" @click="createNewOdontogram">
        <i class="fas fa-plus"></i> Nuevo Odontograma
      </button>
    </div>

    <!-- ODONTOGRAMA -->
    <div v-if="odontogram" class="odonto-table">
      <h3>
        Odontograma de {{ currentPatient?.name }} ({{ odontogram.type }})
      </h3>

      <table>
        <thead>
          <tr>
            <th>Diente</th>
            <th>Tipo</th>
            <th>Estado/Daño</th>
            <th>Tratamiento</th>
            <th>Notas</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tooth in odontogram.teeth" :key="tooth.id">
            <td>{{ tooth.id }} - {{ tooth.name }}</td>
            <td>{{ tooth.type }}</td>
            <td>
              <select v-model="tooth.status">
                <option value="">-- Seleccionar --</option>
                <option v-for="d in damageOptions" :key="d" :value="d">
                  {{ d }}
                </option>
              </select>
            </td>
            <td>
              <select v-model="tooth.treatment">
                <option value="">-- Seleccionar --</option>
                <option v-for="t in treatmentOptions" :key="t" :value="t">
                  {{ t }}
                </option>
              </select>
            </td>
            <td>
              <input type="text" v-model="tooth.notes" placeholder="Notas..." />
            </td>
          </tr>
        </tbody>
      </table>

      <button class="btn btn-success" @click="saveOdontogram">
        Guardar Odontograma
      </button>
    </div>

    <div v-else class="odonto-empty">
      <p>Selecciona paciente y tipo para crear o ver su odontograma.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  patientsOdontograms,
  damageOptions,
  treatmentOptions,
  type Odontogram,
  type OdontogramType,
  type PatientOdontogram,
  type Tooth,
} from '../../mocks/student/odontogram';

// Datos
const patients = patientsOdontograms;
const odontogramTypes: OdontogramType[] = ['Adulto', 'Niño', 'Mixto'];

// Variables reactivas
const selectedPatientId = ref<number | null>(null);
const selectedOdontogramType = ref<OdontogramType | ''>('');
const odontogram = ref<Odontogram | null>(null);

// Paciente actual (cómodo para mostrar nombre)
const currentPatient = computed(() => {
  return patients.find((p: PatientOdontogram) => p.id === selectedPatientId.value) || null;
});

// Carga odontograma existente si lo hubiera
function loadPatientOdontogram(): void {
  odontogram.value = null;
  selectedOdontogramType.value = '';
}

// Crear nuevo odontograma (o cargar existente)
function createNewOdontogram(): void {
  if (!selectedPatientId.value || !selectedOdontogramType.value) return;

  const patient = patients.find((p: PatientOdontogram) => p.id === selectedPatientId.value);
  if (!patient) return;

  let odonto = patient.odontograms.find(
    (o: Odontogram) => o.type === selectedOdontogramType.value
  );
  if (!odonto) {
    odonto = {
      id: Date.now(),
      patientId: patient.id,
      type: selectedOdontogramType.value,
      createdAt: new Date().toISOString().split('T')[0],
      teeth: generateTeeth(selectedOdontogramType.value),
    };
    patient.odontograms.push(odonto);
  }
  odontogram.value = odonto;
}

// Generar dientes para el odontograma elegido
function generateTeeth(type: OdontogramType): Tooth[] {
  const mapping: Record<OdontogramType, string[]> = {
    Adulto: ['11', '12', '13', '14', '15', '16', '17', '18', '21', '22', '23', '24', '25', '26', '27', '28'],
    Niño: ['51', '52', '53', '54', '55', '61', '62', '63', '64', '65'],
    Mixto: ['11', '12', '13', '51', '52', '53'],
  };

  return mapping[type].map((id: string): Tooth => ({
    id,
    name: `Diente ${id}`,
    type: type === 'Niño' || (type === 'Mixto' && id.startsWith('5')) ? 'Temporal' : 'Permanente',
    status: '',
    treatment: '',
    notes: '',
  }));
}

// Guardar odontograma
function saveOdontogram(): void {
  if (!odontogram.value) return;
  alert(`Odontograma guardado para paciente ID ${odontogram.value.patientId}.`);
}
</script>

<style scoped>
.odonto-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
.odonto-title {
  margin-bottom: 1rem;
  color: #007bff;
}
.odonto-select-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}
.odonto-table {
  overflow-x: auto;
}
.odonto-table table {
  width: 100%;
  border-collapse: collapse;
}
.odonto-table th,
.odonto-table td {
  border: 1px solid #ddd;
  padding: 8px;
}
.odonto-table th {
  background-color: #f8f8f8;
}
.odonto-empty {
  text-align: center;
  color: #888;
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
}
.btn-primary {
  background-color: #007bff;
  color: #fff;
}
.btn-success {
  background-color: #28a745;
  color: #fff;
}
</style>
