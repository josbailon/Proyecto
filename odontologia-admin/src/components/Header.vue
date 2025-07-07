<template>
  <header class="app-header">
    <!-- Toggle sidebar -->
    <button class="btn-icon toggle-btn" @click="$emit('toggle-sidebar')">
      <i class="fas fa-bars"></i>
    </button>

    <!-- Logo y título -->
    <router-link to="/" class="brand">
      <img src="../assets/img/logo.png" alt="Logo" class="brand-logo" />
      <span class="brand-text">DentApp Admin</span>
    </router-link>

    <div class="spacer"></div>

    <!-- Notificaciones -->
    <button class="btn-icon notify-btn">
      <i class="fas fa-bell"></i>
      <span class="badge">5</span>
    </button>

    <!-- Menú de usuario -->
    <div class="user-menu" @click="toggleMenu">
      <img src="../assets/img/user-avatar.png" alt="Usuario" class="avatar" />
      <span class="username">{{ user.nombre }}</span>
      <i class="fas fa-chevron-down arrow"></i>
      <ul v-if="menuOpen" class="dropdown">
        <li><router-link to="/profile"><i class="fas fa-user-circle"></i> Perfil</router-link></li>
        <li><a @click.prevent="logout"><i class="fas fa-sign-out-alt"></i> Cerrar sesión</a></li>
      </ul>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Header',
  emits: ['toggle-sidebar'],
  setup() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const menuOpen = ref(false);
    const router = useRouter();

    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };
    const logout = () => {
      localStorage.clear();
      router.push({ name: 'Login' });
    };

    return { user, menuOpen, toggleMenu, logout };
  }
});
</script>

<style src="../assets/css/components/Header.css" scoped></style>
