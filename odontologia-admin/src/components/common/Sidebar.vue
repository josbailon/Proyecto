<!-- src/components/common/Sidebar.vue -->
<template>
  <nav class="sidebar d-flex flex-column p-3">
    <router-link
      v-for="item in items"
      :key="item.routeName"
      :to="{ name: item.routeName }"
      class="sidebar-link d-flex align-items-center mb-2"
      :class="{ active: isActive(item.routeName) }"
    >
      <i :class="item.icon + ' me-2'"></i>
      <span>{{ item.name }}</span>
    </router-link>
  </nav>
</template>

<script setup lang="ts">
// Desestructuramos props para que items quede “usado”
const { items } = defineProps<{
  items: Array<{ name: string; routeName: string; icon: string }>
}>()

import { useRoute } from 'vue-router'
const route = useRoute()

function isActive(name: string) {
  return route.name === name
}
</script>

<style scoped>
.sidebar {
  width: 200px;
  min-height: 100vh;
  background-color: #1e1e2f;
}
.sidebar-link {
  color: #cfd3e0;
  text-decoration: none;
  padding: 8px;
  border-radius: 4px;
  transition: background .2s, color .2s;
}
.sidebar-link:hover {
  background-color: #2e2e4f;
  color: #fff;
}
.sidebar-link.active {
  background-color: #3f51b5;
  color: #fff;
}
</style>
