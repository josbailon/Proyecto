<!-- src/components/layouts/StudentLayout.vue -->
<template>
  <div class="student-layout">
    <Sidebar
      title="ULEAM"
      subtitle="FACULTAD DE ODONTOLOGÍA"
      :logo-src="logoSrc"
      :items="navItems"
    />
    <main class="student-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/components/common/Sidebar.vue'
// Importa el PNG que tienes en src/assets/img/descarga.png
import logoSrc from '@/assets/img/descarga.png'
import type { RouteLocationRaw } from 'vue-router'

const navItems: Array<{
  name: string
  label: string
  icon: string
  to: RouteLocationRaw
}> = [
  { name: 'StudentDashboard',   label: 'Inicio',              icon: 'fas fa-home',            to: { name: 'StudentDashboard' } },
  { name: 'ClinicalHistory',    label: 'Historial Clínico',   icon: 'fas fa-notes-medical',   to: { name: 'ClinicalHistory' } },
  { name: 'ClinicalCases',      label: 'Casos Clínicos',      icon: 'fas fa-file-medical',    to: { name: 'ClinicalCases' } },
  { name: 'Assignments',        label: 'Tareas',              icon: 'fas fa-tasks',           to: { name: 'Assignments' } },
  { name: 'Communication',      label: 'Mensajes',            icon: 'fas fa-envelope',        to: { name: 'Communication' } },
  { name: 'StudentResources',  label: 'Recursos',            icon: 'fas fa-book',            to: { name: 'StudentResources' } },
  { name: 'Odontogram',         label: 'Odontograma',         icon: 'fas fa-tooth',           to: { name: 'Odontogram' } },
  { name: 'DatosFiliacion',     label: 'Datos de Filiación',  icon: 'fas fa-address-card',    to: { name: 'DatosFiliacion' } },
  { name: 'TopografiaMucosaOral', label: 'Topografía Mucosa Oral', icon: 'fas fa-map-marked-alt', to: { name: 'TopografiaMucosaOral' } },
  { name: 'Preguntas',          label: 'Preguntas Frecuentes', icon: 'fas fa-question-circle', to: { name: 'Preguntas' } },
  { name: 'Tratamiento',        label: 'Tratamiento',         icon: 'fas fa-stethoscope',     to: { name: 'Tratamiento' } }
]
</script>

<style scoped>
.student-layout {
  display: flex;
  height: 100vh;
  background: #f0f2f5;
}

.student-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  background: #ffffff;
}

/* Ajustes responsivos */
@media (max-width: 992px) {
  .student-layout {
    flex-direction: column;
  }
  .student-content {
    padding: 1rem;
  }
}
</style>
