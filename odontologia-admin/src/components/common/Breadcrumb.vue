<!-- src/components/common/Breadcrumb.vue -->
<template>
  <nav class="breadcrumb-container">
    <ol class="breadcrumb mb-0">
      <li class="breadcrumb-item">
        <router-link to="{ name: 'HomeAdmin' }">Inicio</router-link>
      </li>
      <li class="breadcrumb-item active" aria-current="page">
        {{ currentLabel }}
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
const labels: Record<string,string> = {
  HomeAdmin: 'Panel',
  AdminUsers: 'Usuarios',
  AdminSettings: 'Ajustes',
  // añade más según tus nombres
}
const currentLabel = labels[route.name as string] || ''
</script>

<style scoped>
.breadcrumb-container {
  padding-left: 16px;
}
.breadcrumb {
  background: transparent;
  font-size: 0.9rem;
}
.breadcrumb-item + .breadcrumb-item::before {
  content: '/';
  padding: 0 4px;
  color: #999;
}
.breadcrumb-item a {
  color: #555;
}
.breadcrumb-item.active {
  color: #333;
}
</style>
