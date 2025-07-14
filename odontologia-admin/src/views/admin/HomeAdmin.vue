<!-- src/views/admin/HomeAdmin.vue -->
<template>
  <section class="home-admin container py-4">
    <h1 class="mb-4">Panel de Administración</h1>
    <div class="row g-4">
      <div class="col-md-3" v-for="stat in statsList" :key="stat.label">
        <div class="card text-center shadow-sm h-100">
          <div class="card-body">
            <i :class="stat.icon" class="stat-icon mb-2"></i>
            <h2 class="stat-number">{{ stat.value }}</h2>
            <p class="stat-label">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
// Ajusta esta ruta si tu archivo está en otro lugar:
// Si tus mocks de admin están en src/mocks/admin/api.ts:
import type { Stats } from '../../mocks/admin/api'
import { fetchStatsMock } from '../../mocks/admin/api'
// — o —
// Si en su lugar tienes un único api.ts en src/mocks/api.ts, usa:
// import type { Stats } from '@/mocks/api'
// import { fetchStatsMock } from '@/mocks/api'

const stats = ref<Stats | null>(null)

onMounted(async () => {
  stats.value = await fetchStatsMock()
})

const statsList = computed(() => [
  { label: 'Usuarios',   value: stats.value?.users       ?? 0, icon: 'bi bi-people-fill' },
  { label: 'Citas',      value: stats.value?.appointments ?? 0, icon: 'bi bi-calendar-check-fill' },
  { label: 'Pacientes',  value: stats.value?.patients    ?? 0, icon: 'bi bi-person-badge-fill' },
  { label: 'Mensajes',   value: stats.value?.messages    ?? 0, icon: 'bi bi-chat-dots-fill' }
])
</script>

<style src="@/assets/css/pages/admin/HomeAdmin.css" scoped></style>
