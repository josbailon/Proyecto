<!-- src/views/secretary/MedicalScreeningView.vue -->
<template>
  <section class="screening-view container">
    <h1 class="title">Cuestionario de Tamizaje Médico</h1>

    <div class="patient-info-card" v-if="selectedPatient">
      <h2>Datos del Paciente</h2>
      <ul>
        <li><strong>Nombre:</strong> {{ selectedPatient.nombre }}</li>
        <li><strong>Cédula:</strong> {{ selectedPatient.cedula }}</li>
        <li><strong>Edad:</strong> {{ calcularEdad(selectedPatient.fechaNacimiento) }} años</li>
        <li><strong>Contacto:</strong> {{ selectedPatient.contacto }}</li>
        <li><strong>Cantón:</strong> {{ selectedPatient.canton }}</li>
      </ul>
    </div>

    <MedicalScreeningForm @pacienteSeleccionado="handlePacienteSeleccionado" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MedicalScreeningForm from '@/components/secretary/MedicalScreeningForm.vue'
import type { Patient } from '../../mocks/secretary/patients'

const selectedPatient = ref<Patient | null>(null)

function handlePacienteSeleccionado(paciente: Patient) {
  selectedPatient.value = paciente
}

function calcularEdad(fecha: string | undefined): number {
  if (!fecha) return 0
  const nacimiento = new Date(fecha)
  const hoy = new Date()
  let edad = hoy.getFullYear() - nacimiento.getFullYear()
  const m = hoy.getMonth() - nacimiento.getMonth()
  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--
  }
  return edad
}
</script>

<style src="@/assets/css/pages/secretary/MedicalScreeningView.css" scoped />
