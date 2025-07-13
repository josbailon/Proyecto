<template>
  <div class="login-wrapper vh-100 d-flex align-items-center justify-content-center">
    <div class="login-card row g-0 shadow-lg">
      <!-- Panel izquierdo con imagen y branding -->
      <div class="col-md-5 login-info d-none d-md-flex flex-column align-items-center justify-content-center text-white">
        <img src="@/assets/img/descarga.png" alt="Logo" class="mb-3 logo" />
        <h2 class="mb-2">Facultad de Odontología</h2>
        <p class="text-center px-3">Bienvenido al aula virtual. Inicia sesión para continuar.</p>
      </div>
      <!-- Panel derecho con formulario -->
      <div class="col-12 col-md-7 bg-white p-4">
        <h3 class="fw-bold text-center mb-4">Iniciar sesión</h3>
        <form @submit.prevent="onSubmit" novalidate>
          <div class="mb-3 position-relative">
            <i class="fas fa-user form-icon"></i>
            <input
              v-model="email"
              type="email"
              class="form-control form-control-lg ps-5"
              placeholder="Correo electrónico"
              required
              :disabled="loading"
            />
          </div>
          <div class="mb-4 position-relative">
            <i class="fas fa-lock form-icon"></i>
            <input
              v-model="password"
              type="password"
              class="form-control form-control-lg ps-5"
              placeholder="Contraseña"
              required
              :disabled="loading"
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary btn-lg w-100"
            :disabled="loading"
          >
            <template v-if="!loading">Entrar</template>
            <template v-else><i class="fas fa-spinner fa-spin"></i></template>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginMock } from '../mocks/api'; // Asegúrate de que la ruta es correcta

const email = ref('');
const password = ref('');
const loading = ref(false);
const router = useRouter();

async function onSubmit() {
  if (loading.value) return;
  loading.value = true;
  try {
    const user = await loginMock(email.value, password.value);
    localStorage.setItem('user', JSON.stringify(user));
    // Redirigir según rol
    if (user.role === 'admin') {
      router.push({ name: 'HomeAdmin' });
    } else if (user.role === 'profesor') {
      router.push({ name: 'ProfessorDashboard' });
    } else if (user.role === 'secretario') {
      router.push({ name: 'SecretaryDashboard' });
    } else {
      router.push({ name: 'StudentDashboard' });
    }
  } catch (err: any) {
    alert(err.message);
  } finally {
    loading.value = false;
  }
}
</script>

<style src="@/assets/css/pages/login/Login.css" scoped />