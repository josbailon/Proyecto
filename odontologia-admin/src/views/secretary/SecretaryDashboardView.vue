<!-- SecretaryDashboardView.vue -->
<template>
  <div class="secretary-dashboard-view">
    <SecretaryDashboard />
  </div>
</template>

<script setup lang="ts">
import SecretaryDashboard from '@/components/secretary/SecretaryDashboard.vue';
</script>

<style scoped>
.secretary-dashboard-view {
  padding: 2rem;
  background-color: #f0f2f5;
  min-height: 100vh;
}
</style>
