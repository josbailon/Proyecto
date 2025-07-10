<template>
  <div id="student-layout" class="d-flex">
    <!-- Barra lateral específica de Estudiante -->
    <StudentSidebar />

    <div class="flex-fill d-flex flex-column">
      <!-- Cabecera común -->
      <Header />

      <!-- Contenido -->
      <main class="flex-fill overflow-auto p-4">
        <router-view />
      </main>

      <!-- Pie de página común -->
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header         from '../common/Header.vue';
import Footer         from '../common/Footer.vue';
import StudentSidebar from '../student/StudentSidebar.vue';
</script>

<style scoped>
#student-layout {
  height: 100vh;
}
main {
  background: var(--color-gray-100);
}
</style>
