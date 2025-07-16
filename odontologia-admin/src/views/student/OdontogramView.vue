<template>
  <div class="odontogram-view">
    <h1>Odontograma</h1>

    <!-- Selección de paciente -->
    <div class="section">
      <label for="patientSelect">Seleccionar Paciente:</label>
      <select
        id="patientSelect"
        v-model.number="selectedPatientId"
      >
        <option :value="0">-- Seleccionar --</option>
        <option
          v-for="p in patients"
          :key="p.patientId"
          :value="p.patientId"
        >
          {{ p.patientName }}
        </option>
      </select>
    </div>

    <!-- Selección tipo odontograma -->
    <div class="section" v-if="selectedPatient">
      <label for="typeSelect">Tipo de Odontograma:</label>
      <select
        id="typeSelect"
        v-model="selectedPatient.odontogramType"
      >
        <option value="Adulto">Adulto</option>
        <option value="Infantil">Infantil</option>
        <option value="Mixto">Mixto</option>
      </select>
    </div>

    <!-- Tabla -->
    <div v-if="selectedPatient" class="odontogram-table">
      <h2>Odontograma de {{ selectedPatient.patientName }}</h2>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Diente</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Daño</th>
            <th>Tratamiento</th>
            <th>Notas</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in selectedPatient.teeth" :key="t.id">
            <td>{{ t.id }}</td>
            <td>{{ t.name }}</td>
            <td>{{ t.type }}</td>
            <td>
              <select v-model="t.status">
                <option value="">-- Seleccionar --</option>
                <option
                  v-for="s in toothStatuses"
                  :key="s"
                  :value="s"
                >
                  {{ s || '-- Ninguno --' }}
                </option>
              </select>
            </td>
            <td>
              <select v-model="t.damage">
                <option value="">-- Seleccionar --</option>
                <option
                  v-for="d in damageOptions"
                  :key="d"
                  :value="d"
                >
                  {{ d }}
                </option>
              </select>
            </td>
            <td>
              <select v-model="t.treatment">
                <option value="">-- Seleccionar --</option>
                <option
                  v-for="tr in treatmentOptions"
                  :key="tr"
                  :value="tr"
                >
                  {{ tr || '-- Ninguno --' }}
                </option>
              </select>
            </td>
            <td>
              <input
                v-model="t.notes"
                type="text"
                placeholder="Notas..."
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  odontogramsMock,
  type PatientOdontogram,
  type ToothStatus,
  damageOptions,
  treatmentOptions
} from '../../mocks/student/odontogram';

import { ref, computed } from 'vue';

// Listado de pacientes
const patients = ref<PatientOdontogram[]>([...odontogramsMock]);

// Id seleccionado
const selectedPatientId = ref<number>(0);

// Paciente actual
const selectedPatient = computed(() =>
  patients.value.find(p => p.patientId === selectedPatientId.value) || null
);

const toothStatuses: ToothStatus[] = [
  '',
  'Sano',
  'Caries',
  'Fractura',
  'Ausente',
  'Restaurado',
  'Extracción indicada'
];
</script>

<style src="../../assets/css/pages/student/OdontogramView.css" scoped></style>
