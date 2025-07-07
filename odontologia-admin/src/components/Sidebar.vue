<template>
  <nav :class="['sidebar', { collapsed }]">
    <div class="sidebar-header">
      <img src="../assets/img/logo.png" alt="Logo" class="sidebar-logo" />
      <h1 class="sidebar-title" v-if="!collapsed">DentApp</h1>
    </div>
    <ul class="sidebar-menu">
      <li v-for="item in menu" :key="item.text">
        <router-link
          :to="item.to"
          class="sidebar-link"
          active-class="active"
        >
          <i :class="['sidebar-icon', item.icon]"></i>
          <span class="link-text" v-if="!collapsed">{{ item.text }}</span>
        </router-link>
      </li>
    </ul>
    <button class="sidebar-toggle" @click="$emit('toggle-sidebar')">
      <i :class="collapsed ? 'fas fa-chevron-right' : 'fas fa-chevron-left'"></i>
    </button>
  </nav>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';

export default defineComponent({
  name: 'Sidebar',
  props: {
    collapsed: { type: Boolean, default: false }
  },
  setup(props) {
    const menu = [
      { text: 'Dashboard', to: '/admin',         icon: 'fas fa-tachometer-alt' },
      { text: 'Usuarios',  to: '/admin/users',   icon: 'fas fa-users' },
      { text: 'Ajustes',   to: '/admin/settings',icon: 'fas fa-cog' }
    ];
    return { ...toRefs(props), menu };
  }
});
</script>

<style src="../assets/css/components/Sidebar.css" scoped></style>
