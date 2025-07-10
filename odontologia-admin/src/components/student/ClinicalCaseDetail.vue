<template>
  <div class="case-detail card shadow-sm p-3">
    <h5 class="card-title mb-3">Caso Clínico: {{ caseData.title }}</h5>
    <p><strong>Etapa:</strong> {{ caseData.stage }}</p>
    <p><strong>Descripción:</strong></p>
    <p>{{ caseData.description }}</p>
    <p><small class="text-muted">Última actualización: {{ formatDate(caseData.updatedAt) }}</small></p>
  </div>
</template>

<script setup lang="ts">
import type { ClinicalCase } from '../../mocks/student/clinicalCases';

// Importante: coincide el nombre con el template
const { caseData } = defineProps<{ caseData: ClinicalCase }>();

function formatDate(iso: string) {
  return new Date(iso).toLocaleString();
}
</script>

<style scoped>
.case-detail p {
  margin-bottom: var(--spacer);
}
</style>
