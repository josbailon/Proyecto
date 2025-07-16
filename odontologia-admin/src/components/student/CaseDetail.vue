<!-- src/components/student/CaseDetail.vue -->
<template>
  <div class="ccv-modal">
    <div class="ccv-modal__header">
      <h3>
        Caso #{{ caseData.id }} - {{ caseData.patientName }}
      </h3>
      <button @click="$emit('close')" class="ccv-modal__close">×</button>
    </div>

    <div class="ccv-modal__body">
      <h4>Descripción</h4>
      <p><strong>Motivo de consulta:</strong> {{ caseData.reason }}</p>
      <p><strong>Síntomas:</strong> {{ caseData.symptoms }}</p>
      <p><strong>Notas:</strong> {{ caseData.notes || '–' }}</p>

      <h4>Tratamientos</h4>
      <ul>
        <li v-for="p in caseData.procedures" :key="p.code">
          <strong>{{ p.code }}</strong> - {{ p.description }} ({{ p.teeth }})
        </li>
      </ul>

      <h4>Prescripciones</h4>
      <ul>
        <li v-for="r in caseData.prescriptions" :key="r.id">
          {{ r.drug }} - {{ r.dose }}
        </li>
      </ul>

      <h4>Citas</h4>
      <ul>
        <li v-for="a in caseData.appointments" :key="a.id">
          {{ a.date }} - {{ a.status }}
        </li>
      </ul>

      <h4>Comentarios</h4>
      <ul>
        <li v-for="c in caseData.comments" :key="c.at">
          <small>{{ c.by }} ({{ c.at }})</small>: {{ c.text }}
        </li>
      </ul>
    </div>

    <div class="ccv-modal__footer">
      <button class="btn btn-secondary" @click="$emit('close')">
        Cerrar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ClinicalCase } from '../../mocks/student/clinicalCases'

defineProps<{
  caseData: ClinicalCase
}>()
</script>

<style scoped>
.ccv-modal {
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  width: 90%;
  z-index: 2000;
}

.ccv-modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.5rem;
}

.ccv-modal__close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.ccv-modal__body {
  margin-top: 1rem;
}

.ccv-modal__footer {
  text-align: right;
  margin-top: 1rem;
}
</style>
