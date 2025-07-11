<template>
  <aside class="sidebar d-flex flex-column p-3 bg-light">
    <router-link to="/" class="sidebar-brand mb-4 text-decoration-none">
      <i class="fas fa-tooth me-2"></i><strong>OdontoEdu</strong>
    </router-link>
    <nav class="nav nav-pills flex-column mb-auto">
      <router-link to="/admin" class="nav-link">🏠 Dashboard</router-link>
      <router-link to="/admin/users" class="nav-link">👥 Usuarios</router-link>
      <router-link to="/admin/settings" class="nav-link">⚙️ Ajustes</router-link>
    </nav>
  </aside>
</template>

<script setup lang="ts">
// Sin lógica adicional
</script>

<style src="@/assets/css/components/Sidebar.css" scoped></style>
