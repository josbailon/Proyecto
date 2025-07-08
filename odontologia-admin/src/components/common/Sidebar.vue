<template>
  <nav :class="['sidebar', { collapsed }]" aria-label="Sidebar">
    <div class="sidebar-brand d-flex align-items-center px-3 py-2">
      <img src="../assets/img/logo.png" alt="Logo" class="me-2 logo" />
      <span v-if="!collapsed" class="h5 mb-0">DentApp</span>
      <button class="btn btn-sm ms-auto d-lg-none" @click="$emit('toggle-sidebar')">
        <i class="fas fa-bars"></i>
      </button>
    </div>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item" v-for="item in menu" :key="item.text">
        <router-link
          :to="item.to"
          class="nav-link d-flex align-items-center"
          active-class="active"
        >
          <i :class="item.icon" class="me-2"></i>
          <span v-if="!collapsed">{{ item.text }}</span>
        </router-link>
      </li>
    </ul>
    <div class="mt-auto px-3 pb-3">
      <button class="btn btn-outline-secondary w-100" @click="$emit('toggle-sidebar')">
        <i :class="collapsed ? 'fas fa-angle-right' : 'fas fa-angle-left'"></i>
        <span v-if="!collapsed" class="ms-2">Cerrar</span>
      </button>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
export default defineComponent({
  name: 'Sidebar',
  props: { collapsed: Boolean },
  setup(props) {
    const menu = [
      { text: 'Dashboard', to: '/admin',        icon: 'fas fa-tachometer-alt' },
      { text: 'Usuarios',  to: '/admin/users',  icon: 'fas fa-users' },
      { text: 'Casos',     to: '/admin/cases',  icon: 'fas fa-file-medical' },
      { text: 'Ajustes',   to: '/admin/settings', icon: 'fas fa-cog' }
    ];
    return { ...toRefs(props), menu };
  }
});
</script>

<style src="../assets/css/components/Sidebar.css" scoped></style>
