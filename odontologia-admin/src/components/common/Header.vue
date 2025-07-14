<!-- src/components/common/Header.vue -->
<template>
  <header class="app-header d-flex align-items-center justify-content-between px-3">
    <div class="d-flex align-items-center">
      <img src="../../assets/img/descarga.png" alt="Logo" class="header-logo me-3" />
      <div>
        <h4 class="mb-0">{{ pageTitle }}</h4>
        <Breadcrumb />
      </div>
    </div>
    <button class="btn btn-outline-danger btn-sm" @click="onLogout">
      <i class="fas fa-sign-out-alt me-1"></i> Salir
    </button>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Breadcrumb from './Breadcrumb.vue'

// Definimos el emit correctamente
const emit = defineEmits<{
  (e: 'logout'): void
}>()

// No hay props que no usemos
// const props = defineProps<{ /* ... */ }>()

const route = useRoute()
const titles: Record<string,string> = {
  HomeAdmin:      'Panel de Control',
  AdminUsers:     'Gestión de Usuarios',
  AdminSettings:  'Ajustes Generales',
  // … añade más según tus rutas
}
const pageTitle = computed(() =>
  titles[route.name as string] || ''
)

function onLogout() {
  emit('logout')
}
</script>

<style scoped>
.app-header {
  height: 50px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
}
.header-logo {
  width: 48px;
  height: 48px;
  object-fit: contain;
}
</style>
