<!-- src/App.vue -->
<template>
  <div id="app">
    <!-- Global Header -->
    <Header @toggle-sidebar="toggleSidebar" />

    <div class="app-body">
      <!-- Sidebar, collapsible -->
      <Sidebar :collapsed="collapsed" @toggle-sidebar="toggleSidebar" />

      <!-- Main content area -->
      <main class="main-content" :class="{ collapsed: collapsed }">
        <router-view />
      </main>
    </div>

    <!-- Global Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// CORRECT IMPORTS: components are under components/common/
import Header  from './components/common/Header.vue';
import Sidebar from './components/common/Sidebar.vue';
import Footer  from './components/common/Footer.vue';

const collapsed = ref(false);
function toggleSidebar() {
  collapsed.value = !collapsed.value;
}
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.app-body {
  display: flex;
  flex: 1;
  margin-top: var(--header-height);
}

.main-content {
  flex: 1;
  padding: var(--spacer);
  transition: margin-left 0.3s ease;
  margin-left: var(--sidebar-width);
}
.main-content.collapsed {
  margin-left: var(--sidebar-collapsed-width);
}
</style>
