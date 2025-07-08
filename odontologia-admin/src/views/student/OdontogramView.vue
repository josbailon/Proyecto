<!-- src/views/student/OdontogramView.vue -->
<template>
  <section class="odontogram-page container py-4">
    <h1 class="mb-4"><i class="fas fa-tooth me-2"></i>Odontograma Digital</h1>
    <Odontogram />
  </section>
</template>

<script setup lang="ts">
import Odontogram from '../../components/student/Odontogram.vue';
</script>

<style src="../../assets/css/pages/student/Odontogram.css" scoped></style>
