<template>
  <div id="admin-layout" class="d-flex">
    <!-- Sidebar -->
    <Sidebar />

    <div class="flex-fill d-flex flex-column">
      <!-- Header -->
      <Header />

      <!-- Contenido principal -->
      <main class="flex-fill overflow-auto p-4">
        <router-view />
      </main>

      <!-- Footer -->
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header  from '../common/Header.vue';
import Sidebar from '../common/Sidebar.vue';
import Footer  from '../common/Footer.vue';
</script>

<style scoped>
#admin-layout {
  height: 100vh;
}

main {
  background: var(--color-gray-100);
}
</style>
