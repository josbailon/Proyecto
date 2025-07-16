<template>
  <div class="odontogram-container">
    <!-- Selector de tipo de odontograma -->
    <div class="odontogram-select">
      <label for="odontogramType">Seleccionar odontograma:</label>
      <select id="odontogramType" v-model="selectedId" @change="loadOdontogram">
        <option v-for="o in odontograms" :key="o.id" :value="o.id">
          {{ o.name }}
        </option>
      </select>
    </div>

    <!-- Odontograma -->
    <div v-if="odontogram" class="odontogram-grid">
      <button
        v-for="t in odontogram.teeth"
        :key="t.id"
        class="tooth"
        :class="statusClass(t.status)"
        @click="toggleStatus(t)"
      >
        {{ t.label }}
      </button>
    </div>

    <!-- Sin odontograma -->
    <div v-else class="odontogram-empty">
      Selecciona un tipo de odontograma para comenzar.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { odontograms, type Odontogram, type ToothEntry, type ToothStatus } from '../../mocks/student/odontogram'

// Estado del componente
const selectedId = ref<string>('adult')

// Odontograma seleccionado
const odontogram = computed<Odontogram | undefined>(() =>
  odontograms.find(o => o.id === selectedId.value)
)

// Cambiar odontograma
function loadOdontogram() {
  // Nada adicional, computed se actualiza solo
}

// Ciclo de estados de un diente
const statusOrder: ToothStatus[] = ['normal', 'caries', 'restaurado', 'ausente']

function toggleStatus(tooth: ToothEntry) {
  const currentIndex = statusOrder.indexOf(tooth.status)
  tooth.status = statusOrder[(currentIndex + 1) % statusOrder.length]
}

function statusClass(status: ToothStatus) {
  return {
    'tooth-normal': status === 'normal',
    'tooth-caries': status === 'caries',
    'tooth-restaurado': status === 'restaurado',
    'tooth-ausente': status === 'ausente'
  }
}
</script>

<style scoped>
.odontogram-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.odontogram-select {
  margin-bottom: 1rem;
}

.odontogram-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  gap: 0.5rem;
  max-width: 600px;
}

.tooth {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  font-weight: bold;
  cursor: pointer;
}

.tooth-normal {
  background: #f0f0f0;
  color: #333;
}

.tooth-caries {
  background: #f8d7da;
  color: #721c24;
}

.tooth-restaurado {
  background: #d1ecf1;
  color: #0c5460;
}

.tooth-ausente {
  background: #e2e3e5;
  color: #6c757d;
}

.odontogram-empty {
  color: #777;
  margin-top: 1rem;
}
</style>
