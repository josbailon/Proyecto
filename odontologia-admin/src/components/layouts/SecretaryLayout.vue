<!-- src/components/layouts/SecretaryLayout.vue -->
<template>
  <div class="secretary-layout d-flex">
    <!-- Barra lateral -->
    <Sidebar role="secretario" />

    <!-- Zona principal: Header, contenido y Footer -->
    <div class="main flex-grow-1 d-flex flex-column">
      <Header role="secretario" />

      <main class="content flex-grow-1 p-4">
        <!-- Aquí cargan las vistas hijas -->
        <router-view />
      </main>

      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
// Componentes de layout
import Sidebar from '@/components/common/Sidebar.vue'
import Header  from '@/components/common/Header.vue'
import Footer  from '@/components/common/Footer.vue'
</script>

<style scoped>
.secretary-layout {
  height: 100vh;
  overflow: hidden;
  display: flex;
}

.main {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
}

.content {
  background-color: var(--color-light);
  overflow-y: auto;
}

/* Personaliza Header y Footer dentro de este layout */
.secretary-layout ::v-deep .navbar {
  background-color: var(--color-info);
}

.secretary-layout ::v-deep .footer {
  background-color: var(--color-secondary);
}
</style>
