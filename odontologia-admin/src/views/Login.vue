<template>
  <div class="login-container">
    <!-- PANEL IZQUIERDO -->
    <div class="login-left">
      <div class="left-content">
        <img src="../assets/img/descarga.png" alt="Logo" class="logo" />
        <h1>DentApp</h1>
        <p>Gestiona tus citas dental de forma sencilla.</p>
      </div>
    </div>

    <!-- PANEL DERECHO -->
    <div class="login-right">
      <button class="close-btn" @click.prevent>✕</button>
      <h2>Iniciar sesión</h2>
      <form @submit.prevent="onSubmit" novalidate>
        <div class="form-group">
          <i class="fas fa-user icon"></i>
          <input
            v-model="email"
            type="email"
            class="form-control"
            placeholder="Usuario"
            required
            :disabled="loading"
          />
        </div>
        <div class="form-group">
          <i class="fas fa-lock icon"></i>
          <input
            v-model="password"
            type="password"
            class="form-control"
            placeholder="Contraseña"
            required
            :disabled="loading"
          />
        </div>
        <button
          type="submit"
          class="btn btn-login w-100"
          :disabled="loading"
        >
          <span v-if="!loading">LOGIN</span>
          <span v-else><i class="fas fa-spinner fa-spin"></i></span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginMock } from '../mocks/admin/api';

const email = ref('');
const password = ref('');
const loading = ref(false);
const router = useRouter();

const onSubmit = async () => {
  if (loading.value) return;
  loading.value = true;
  try {
    const user = await loginMock(email.value, password.value);
    localStorage.setItem('user', JSON.stringify(user));
    router.push({ name: 'HomeAdmin' });
  } catch (e: any) {
    alert(e.message);
  } finally {
    loading.value = false;
  }
};
</script>

<style src="../assets/css/pages/Login.css" scoped></style>
