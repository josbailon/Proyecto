<template>
  <div class="login-page d-flex align-items-center justify-content-center vh-100">
    <div class="card login-card shadow-lg">
      <div class="row g-0">
        <!-- PANEL IZQUIERDO -->
        <div class="col-lg-4 login-left d-none d-lg-flex flex-column align-items-center justify-content-center text-center px-3">
          <img src="@/assets/img/descarga.png" alt="Logo" class="login-logo mb-4" />
          <h2 class="mb-2 text-white">Facultad De Odontologia </h2>
          <h1 class="mb-3 text-white">Uleam</h1>
          <p class="text-white px-2">Bienveniod a nuestra plataforma .</p>
        </div>
        <!-- PANEL DERECHO -->
        <div class="col-12 col-lg-8 login-right p-5 d-flex flex-column justify-content-center">
          <button type="button" class="btn-close align-self-end mb-3" @click="resetForm" aria-label="Cerrar"></button>
          <h3 class="fw-bold mb-4 text-primary">Iniciar sesión</h3>
          <form @submit.prevent="onSubmit" novalidate class="flex-grow-1 d-flex flex-column justify-content-center">
            <div class="mb-4 position-relative">
              <i class="fas fa-user form-icon text-green"></i>
              <input
                v-model="email"
                type="email"
                class="form-control form-control-lg"
                placeholder="Correo electrónico"
                required
                :disabled="loading"
              />
            </div>
            <div class="mb-5 position-relative">
              <i class="fas fa-lock form-icon text-red"></i>
              <input
                v-model="password"
                type="password"
                class="form-control form-control-lg"
                placeholder="Contraseña"
                required
                :disabled="loading"
              />
            </div>
            <button
              type="submit"
              class="btn btn-block btn-lg btn-login mb-3"
              :disabled="loading"
            >
              <span v-if="!loading">ENTRAR</span>
              <span v-else><i class="fas fa-spinner fa-spin"></i></span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginMock } from '../mocks/api';

const email = ref('');
const password = ref('');
const loading = ref(false);
const router = useRouter();

function resetForm() {
  email.value = '';
  password.value = '';
}

async function onSubmit() {
  if (loading.value) return;
  loading.value = true;
  try {
    const user = await loginMock(email.value.trim(), password.value);
    localStorage.setItem('user', JSON.stringify(user));
    switch (user.role) {
      case 'admin':      router.push({ name: 'HomeAdmin' });       break;
      case 'profesor':   router.push({ name: 'ProfessorDashboard' }); break;
      case 'secretario': router.push({ name: 'SecretaryDashboard' }); break;
      case 'estudiante': router.push({ name: 'StudentDashboard' }); break;
    }
  } catch (err: any) {
    alert(err.message || 'Error al iniciar sesión');
  } finally {
    loading.value = false;
  }
}
</script>

<style src="@/assets/css/pages/Login.css" scoped></style>
