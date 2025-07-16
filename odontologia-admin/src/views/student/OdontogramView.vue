<!-- src/views/student/OdontogramView.vue -->
<template>
  <div class="odontogram-view">
    <h1>Odontograma</h1>

    <!-- Selección de paciente -->
    <div class="controls">
      <label for="patientSelect">Paciente:</label>
      <select id="patientSelect" v-model="selectedPatientId">
        <option :value="null">-- Selecciona Paciente --</option>
        <option v-for="p in patients" :key="p.id" :value="p.id">
          {{ p.name }}
        </option>
      </select>
    </div>

    <!-- Selección de tipo de odontograma -->
    <div v-if="selectedPatientId" class="controls">
      <label for="typeSelect">Tipo de Odontograma:</label>
      <select id="typeSelect" v-model="selectedType">
        <option value="adult">Adulto</option>
        <option value="child">Infantil</option>
        <option value="mixed">Mixto</option>
      </select>
    </div>

    <!-- Visualización del odontograma -->
    <div v-if="currentTeeth" class="odontogram-grid">
      <div
        v-for="tooth in currentTeeth"
        :key="tooth.id"
        class="tooth"
        :class="statusClass(tooth.status)"
        @click="changeToothStatus(tooth)"
      >
        <strong>{{ tooth.id }}</strong>
        <span class="tooth-name">{{ tooth.name }}</span>
        <span class="tooth-status">{{ tooth.status }}</span>
      </div>
    </div>

    <!-- Mensaje vacío -->
    <div v-else class="no-data">
      <p>Selecciona un paciente y un tipo de odontograma.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Patient, Tooth, ToothStatus } from '../../mocks/student/odontogram'
import {
  odontogramMocks,
  adultTeeth,
  childTeeth,
  mixedTeeth
} from '../../mocks/student/odontogram'

// Simulación de pacientes
const patients: Patient[] = [
  { id: 1, name: 'María González' },
  { id: 2, name: 'Luis Ramírez' },
  { id: 3, name: 'Ana Torres' }
]

// Paciente seleccionado
const selectedPatientId = ref<number | null>(null)

// Tipo de odontograma seleccionado
const selectedType = ref<'adult' | 'child' | 'mixed'>('adult')

// Devuelve los dientes correspondientes al paciente y tipo seleccionado
const currentTeeth = computed<Tooth[] | null>(() => {
  if (!selectedPatientId.value) return null
  return odontogramMocks[selectedPatientId.value]?.[selectedType.value] || null
})

// Lista de posibles estados de un diente
const toothStatuses: ToothStatus[] = [
  'sano',
  'caries',
  'restaurado',
  'ausente',
  'endodoncia',
  'fracturado',
  'extracción indicada',
  'sellado'
]

// Cambia el estado de un diente al siguiente en la lista
function changeToothStatus(tooth: Tooth) {
  const currentIndex = toothStatuses.indexOf(tooth.status)
  const nextIndex = (currentIndex + 1) % toothStatuses.length
  tooth.status = toothStatuses[nextIndex]
}

// Devuelve clases CSS según estado del diente
function statusClass(status: ToothStatus) {
  return {
    sano: 'tooth--healthy',
    caries: 'tooth--caries',
    restaurado: 'tooth--restored',
    ausente: 'tooth--missing',
    endodoncia: 'tooth--endodontic',
    fracturado: 'tooth--fractured',
    'extracción indicada': 'tooth--extraction',
    sellado: 'tooth--sealed'
  }[status]
}
</script>

<style src="@/assets/css/pages/student/OdontogramView.css" scoped></style>
