<!-- src/components/layouts/AdminLayout.vue -->
<template>
  <div class="admin-layout">
    <div class="main-container d-flex">
      <!-- Sidebar -->
      <aside class="sidebar">
        <Sidebar
          :items="menuItems"
          :logoSrc="logoSrc"
          title="DentApp Admin"
          subtitle="Panel Administrativo"
        />
      </aside>

      <!-- Contenido -->
      <main class="content flex-fill p-4">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Sidebar from '@/components/common/Sidebar.vue'
import logoSrc from '@/assets/img/descarga.png'

const router = useRouter()

const menuItems = [
  {
    name: 'HomeAdmin',
    label: 'Inicio',
    icon: 'fas fa-home',
    to: { name: 'HomeAdmin' }
  },
  {
    name: 'AdminUsers',
    label: 'Usuarios',
    icon: 'fas fa-users',
    to: { name: 'AdminUsers' }
  },
  {
    name: 'AdminSettings',
    label: 'Ajustes',
    icon: 'fas fa-cog',
    to: { name: 'AdminSettings' }
  }
]

function handleLogout() {
  localStorage.removeItem('user')
  router.push({ name: 'Login' })
}
</script>

<style scoped>
.admin-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-container {
  flex: 1 1 auto;
  display: flex;
  height: 100%;
  overflow: hidden;
}

.sidebar {
  flex: 0 0 240px;
  background-color: var(--sidebar-bg, #1e1e2f);
  border-right: 1px solid var(--sidebar-border, #2e2e4f);
}

.content {
  overflow-y: auto;
  background-color: var(--content-bg, #f8f9fa);
}
</style>
