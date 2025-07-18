<!-- src/views/secretary/MedicalScreeningView.vue -->
<template>
  <div class="medical-screening-view">
    <h1>Cuestionario de Tamizaje Médico</h1>
    <MedicalScreeningForm />
  </div>
</template>

<script setup lang="ts">
import MedicalScreeningForm from '@/components/secretary/MedicalScreeningForm.vue'
</script>

<style scoped src="@/assets/css/pages/secretary/MedicalScreeningView.css"></style>
