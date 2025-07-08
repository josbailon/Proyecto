<!-- src/views/admin/HomeAdmin.vue -->
<template>
  <section class="home-admin container py-4">
    <!-- Sprint 1 – 2025-07-10 – Estadísticas globales -->
    <div class="row g-3 mb-4">
      <CardStats
        icon="fas fa-user-injured"
        label="Pacientes"
        :value="counts.pacientes"
        bg="success"
      />
      <CardStats
        icon="fas fa-user-graduate"
        label="Estudiantes"
        :value="counts.estudiantes"
        bg="primary"
      />
      <CardStats
        icon="fas fa-chalkboard-teacher"
        label="Profesores"
        :value="counts.profesores"
        bg="warning"
      />
      <CardStats
        icon="fas fa-calendar-check"
        label="Citas"
        :value="counts.citas"
        bg="info"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
// Sprint 1 – 2025-07-10 – Carga de estadísticas
import { onMounted, computed } from 'vue';
import { useAdminStore } from '../../store/admin';
import { useSecretaryStore } from '../../store/secretary';

import CardStats from '../../components/common/CardStats.vue';

import type { User } from '../../mocks/admin/user';

const adminStore = useAdminStore();
const secStore   = useSecretaryStore();

onMounted(async () => {
  await adminStore.fetchUsers();
  await secStore.loadAppointments();
});

const counts = computed(() => ({
  pacientes:   adminStore.users.filter((u: User) => u.role === 'paciente').length,
  estudiantes: adminStore.users.filter((u: User) => u.role === 'estudiante').length,
  profesores:  adminStore.users.filter((u: User) => u.role === 'profesor').length,
  citas:       secStore.appointments.length
}));
</script>

<style src="../../assets/css/pages/admin/HomeAdmin.css" scoped></style>
