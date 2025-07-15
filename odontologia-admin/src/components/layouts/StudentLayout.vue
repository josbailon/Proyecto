<!-- src/components/layouts/StudentLayout.vue -->
<template>
  <div class="student-layout d-flex flex-column vh-100">
    <!-- HEADER -->
    <Header />

    <div class="flex-grow-1 d-flex overflow-hidden">
      <!-- SIDEBAR -->
      <aside class="student-sidebar bg-white border-end">
        <ul class="nav flex-column">
          <li
            v-for="item in navItems"
            :key="item.routeName"
            class="nav-item"
          >
            <RouterLink
              :to="{ name: item.routeName }"
              class="nav-link d-flex align-items-center"
              :class="{ active: item.routeName === currentRoute }"
            >
              <i :class="['bi', item.icon, 'me-2']"></i>
              <span>{{ item.name }}</span>
            </RouterLink>
          </li>
        </ul>
      </aside>

      <!-- CONTENIDO PRINCIPAL -->
      <main class="student-content flex-fill overflow-auto p-4">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/common/Header.vue'

// Definimos los elementos del menú con sus nombres de ruta (coinciden con router/index.ts)
type NavItem = { name: string; icon: string; routeName: string }

const navItems = computed<NavItem[]>(() => [
  { name: 'Tablero',        icon: 'bi-speedometer2',   routeName: 'StudentDashboard' },
  { name: 'Historial',       icon: 'bi-journal-medical',routeName: 'ClinicalHistory' },
  { name: 'Casos Clínicos',  icon: 'bi-folder2-open',   routeName: 'ClinicalCases' },
  { name: 'Tareas',          icon: 'bi-card-checklist', routeName: 'Assignments' },
  { name: 'Mensajería',      icon: 'bi-chat-dots',      routeName: 'Communication' },
  { name: 'Odontograma',     icon: 'bi-tooth',          routeName: 'Odontogram' }
])

const route = useRoute()
const currentRoute = computed(() => route.name as string)
</script>

<style scoped>
.student-layout {
  background-color: #f8f9fa;
}

/* Sidebar */
.student-sidebar {
  width: 220px;
}
.student-sidebar .nav-link {
  color: #495057;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}
.student-sidebar .nav-link.active,
.student-sidebar .nav-link:hover {
  background-color: #0d6efd;
  color: white;
}

/* Main content */
.student-content {
  background: #ffffff;
}

/* Iconos Bootstrap Icons */
@import 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css';
</style>
