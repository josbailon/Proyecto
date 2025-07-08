<!-- src/views/student/CommunicationView.vue -->
<template>
  <section class="communication-page container py-4">
    <h1 class="mb-4"><i class="fas fa-comments me-2"></i>Mensajería</h1>
    <Messaging />
  </section>
</template>

<script setup lang="ts">
import Messaging from '../../components/student/Messaging.vue';
</script>

<style src="../../assets/css/pages/student/Communication.css" scoped></style>
