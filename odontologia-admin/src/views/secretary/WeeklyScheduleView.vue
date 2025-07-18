<!-- src/views/secretary/WeeklyScheduleView.vue -->
<template>
  <section class="weekly-schedule container py-4">
    <h2 class="mb-4">Horario Semanal de Citas</h2>
    <div class="table-responsive">
      <table class="table table-bordered align-middle">
        <thead class="table-light">
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Estudiante (ID)</th>
            <th>Paciente (ID)</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="appt in appointments" :key="appt.id">
            <td>{{ appt.fecha }}</td>
            <td>{{ appt.hora }}</td>
            <td>{{ appt.estudianteId }}</td>
            <td>{{ appt.pacienteId }}</td>
            <td>
              <span :class="statusBadge(appt.estado)">
                {{ appt.estado }}
              </span>
            </td>
          </tr>
          <tr v-if="appointments.length === 0">
            <td colspan="5" class="text-center text-muted">
              No hay citas programadas esta semana.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Appointment } from '@/mocks/secretary/appointments';
import { fetchAppointmentsMock } from '@/mocks/secretary/appointments';

const appointments = ref<Appointment[]>([]);

onMounted(async () => {
  appointments.value = await fetchAppointmentsMock();
});

function statusBadge(status: Appointment['estado']): string {
  switch (status) {
    case 'pendiente':
      return 'badge bg-warning text-dark';
    case 'confirmada':
      return 'badge bg-success';
    case 'cancelada':
      return 'badge bg-danger';
    default:
      return 'badge bg-secondary';
  }
}
</script>

<style scoped>
.weekly-schedule {
  background: var(--color-white);
}
.weekly-schedule h2 {
  color: var(--color-primary);
  font-weight: 600;
}
.weekly-schedule .table {
  margin-bottom: 0;
}
.weekly-schedule .badge {
  font-size: 0.9em;
}
</style>
