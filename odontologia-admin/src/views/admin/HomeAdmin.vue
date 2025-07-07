<template>
  <div class="row g-3">
    <div class="col-md-4" v-for="card in cards" :key="card.key">
      <div :class="['card text-white h-100 shadow-sm', card.bg]">
        <div class="card-body d-flex align-items-center">
          <i :class="[card.icon, 'fa-2x me-3']"></i>
          <div>
            <h5 class="card-title mb-1">{{ card.title }}</h5>
            <p class="card-text display-6">{{ stats[card.key] }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import { fetchUsersMock } from '../../mocks/api';
import type { User } from '../../mocks/user';

interface Stats { pacientes: number; estudiantes: number; profesores: number; }
interface Card  { title: string; key: keyof Stats; icon: string; bg: string; }

export default defineComponent({
  name: 'HomeAdmin',
  setup() {
    const stats = reactive<Stats>({ pacientes: 0, estudiantes: 0, profesores: 0 });
    const cards: Card[] = [
      { title: 'Pacientes',   key: 'pacientes',   icon: 'fas fa-user-injured', bg: 'bg-success' },
      { title: 'Estudiantes', key: 'estudiantes', icon: 'fas fa-user-graduate', bg: 'bg-primary' },
      { title: 'Secretarios', key: 'profesores',  icon: 'fas fa-user-tie',      bg: 'bg-warning' }
    ];

    onMounted(async () => {
      const users: User[] = await fetchUsersMock();
      stats.pacientes   = users.filter(u => u.role === 'paciente').length;
      stats.estudiantes = users.filter(u => u.role === 'estudiante').length;
      stats.profesores  = users.filter(u => u.role === 'secretario').length;
    });

    return { stats, cards };
  }
});
</script>

<style src="../../assets/css/pages/admin/HomeAdmin.css" scoped></style>
