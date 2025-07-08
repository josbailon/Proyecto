<!-- src/views/student/AssignmentsView.vue -->
<template>
  <section class="assignments-page container py-4">
    <h1 class="mb-4"><i class="fas fa-file-upload me-2"></i>Mis Tareas</h1>
    <AssignmentList />
  </section>
</template>

<script setup lang="ts">
import AssignmentList from '../../components/student/AssignmentList.vue';
</script>

<style src="../../assets/css/pages/student/Assignments.css" scoped></style>
