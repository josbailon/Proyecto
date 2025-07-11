<!-- src/views/secretary/SecretaryDashboardView.vue -->
<template>
  <section class="secretary-dashboard container py-4">
    <!-- Sprint 5 – 2025-07-22 – Dashboard Secretario -->
    <h2 class="mb-4">Panel de Control - Secretario</h2>

    <!-- Estadísticas rápidas -->
    <div class="row mb-4">
      <div class="col-md-4">
        <div class="card text-center">
          <div class="card-body">
            <h3>{{ totalAssignments }}</h3>
            <p>Pacientes Asignados</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card text-center">
          <div class="card-body">
            <h3>{{ totalAppointments }}</h3>
            <p>Citas Programadas</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card text-center">
          <div class="card-body">
            <h3>{{ upcomingWeek }}</h3>
            <p>Próxima Semana</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabla de citas semanales -->
    <WeeklyScheduleTable :appointments="appointments" />
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
// Import relativo a mocks de secretario
import type { PatientAssignment } from '../../mocks/secretary/patientAssignments'
import {
  fetchPatientAssignmentsMock
} from '../../mocks/secretary/patientAssignments'
import type { Appointment } from '../../mocks/secretary/appointments'
import { fetchAppointmentsMock } from '../../mocks/secretary/appointments'

// Estado reactivo
const assignments     = ref<PatientAssignment[]>([])
const appointments    = ref<Appointment[]>([])

// Carga datos al montar
onMounted(async () => {
  assignments.value  = await fetchPatientAssignmentsMock()
  appointments.value = await fetchAppointmentsMock()
})

// Cálculos rápidos
const totalAssignments = computed(() => assignments.value.length)
const totalAppointments = computed(() => appointments.value.length)

// Fecha de hoy + 7 días para mostrar
const upcomingWeek = computed(() => {
  const today = new Date()
  const next  = new Date(today.getTime() + 7 * 24*60*60*1000)
  return next.toLocaleDateString()
})
</script>

<style scoped>
.secretary-dashboard h2 {
  color: var(--color-primary);
  font-weight: 600;
}
.secretary-dashboard .card {
  border-radius: var(--radius);
}
.secretary-dashboard .card-body h3 {
  color: var(--color-info);
  font-size: 2rem;
}
</style>
