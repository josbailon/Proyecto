<template>
  <nav class="navbar navbar-expand-lg header-bar">
    <div class="container-fluid px-3">
      <!-- Toggle sidebar -->
      <button
        class="btn btn-outline-secondary me-3 d-lg-none"
        @click="emitToggle()"
      >
        <i class="fas fa-bars"></i>
      </button>

      <!-- Marca -->
      <router-link to="/" class="navbar-brand d-flex align-items-center">
        <img src="../assets/img/logo.png" alt="Logo" class="brand-logo me-2" />
        <span>DentApp</span>
      </router-link>

      <div class="ms-auto d-flex align-items-center">
        <!-- Notificaciones -->
        <button class="btn btn-outline-light position-relative me-3">
          <i class="fas fa-bell"></i>
          <span class="badge bg-danger notification-badge">3</span>
        </button>

        <!-- Menú usuario -->
        <div class="dropdown">
          <a
            class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            href="#"
            id="userDropdown"
            data-bs-toggle="dropdown"
          >
            <img
              src="../assets/img/user-avatar.png"
              alt="Usuario"
              class="avatar me-2"
            />
            <strong>{{ user.nombre || 'Usuario' }}</strong>
          </a>
          <ul
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="userDropdown"
          >
            <li>
              <router-link class="dropdown-item" to="/profile">
                <i class="fas fa-user-circle me-2"></i>Perfil
              </router-link>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <a class="dropdown-item" @click.prevent="logout()">
                <i class="fas fa-sign-out-alt me-2"></i>Cerrar sesión
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// defineEmits para el evento de toggle
const emit = defineEmits<{
  (e: 'toggle-sidebar'): void
}>();

function emitToggle() {
  emit('toggle-sidebar');
}

const router = useRouter();
const user = ref<{ nombre?: string }>(
  JSON.parse(localStorage.getItem('user') || '{}')
);

function logout() {
  localStorage.clear();
  router.push({ name: 'Login' });
}
</script>

<style src="../assets/css/components/Header.css" scoped></style>
