<!-- src/components/layouts/AdminLayout.vue -->
<template>
  <div class="admin-layout">
    <!-- Header siempre arriba -->
    <Header @logout="handleLogout" />

    <!-- Contenedor principal: sidebar a la izquierda, content a la derecha -->
    <div class="main-container d-flex">
      <Sidebar :items="menuItems" class="sidebar" />
      <main class="content flex-fill p-4">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Sidebar from '@/components/common/Sidebar.vue'
import Header  from '@/components/common/Header.vue'

const router = useRouter()

// Menú de ejemplo para Admin
const menuItems = [
  { name: 'Inicio',    routeName: 'HomeAdmin',     icon: 'fas fa-home'  },
  { name: 'Usuarios',  routeName: 'AdminUsers',    icon: 'fas fa-users' },
  { name: 'Ajustes',   routeName: 'AdminSettings', icon: 'fas fa-cog'   }
]

// Al hacer logout, borramos el usuario y vamos a login
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

/* El header tiene altura fija */
.admin-layout > header {
  flex: 0 0 auto;
}

/* El contenedor principal llena el resto */
.main-container {
  flex: 1 1 auto;
  overflow: hidden;
}

/* Sidebar a la izquierda con ancho fijo */
.sidebar {
  flex: 0 0 240px;
  background-color: #1e1e2f;
  border-right: 1px solid #2e2e4f;
}

/* Zona de contenido scrollable */
.content {
  overflow-y: auto;
  background-color: #f8f9fa;
}
</style>
