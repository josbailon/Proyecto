<!-- src/views/student/DashboardView.vue -->
<template>
  <section class="student-dashboard container py-4">
    <!-- Sprint 4 – 2025-07-15 – Dashboard Estudiante -->
    <div class="row g-3 mb-4">
      <CardStats
        icon="fas fa-notes-medical"
        label="Historias Clínicas"
        :value="counts.histories"
        bg="primary"
      />
      <CardStats
        icon="fas fa-file-medical"
        label="Casos Clínicos"
        :value="counts.cases"
        bg="success"
      />
      <CardStats
        icon="fas fa-tasks"
        label="Tareas"
        :value="counts.assignments"
        bg="warning"
      />
      <CardStats
        icon="fas fa-tooth"
        label="Odontograma"
        :value="counts.odontogram"
        bg="info"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
// Rutas relativas corregidas:
import { useStudentStore } from '../../store/student';
import { useAdminStore }   from '../../store/admin';
import CardStats          from '../../components/common/CardStats.vue';

const studentStore = useStudentStore();
const adminStore   = useAdminStore();

// Obtener el ID del estudiante autenticado
const studentId = computed(() => adminStore.currentUser?.id ?? 0);

// Al montar la vista, carga todos los datos
onMounted(async () => {
  await studentStore.loadHistories();
  await studentStore.loadCases();
  await studentStore.loadAssignments();
  await studentStore.loadOdontogram(studentId.value);
});

const counts = computed(() => ({
  histories:   studentStore.histories.length,
  cases:       studentStore.cases.length,
  assignments: studentStore.assignments.length,
  odontogram:  studentStore.odontogram.length
}));
</script>

<style src="../../assets/css/pages/student/DashboardView.css" scoped></style>
