<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">OdontoEdu</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin" class="nav-link">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Cerrar sesión</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
// Si necesitas emitir logout, podrías descomentar:
// const emit = defineEmits<{'logout': void}>();
</script>

<style src="@/assets/css/components/Header.css" scoped></style>
