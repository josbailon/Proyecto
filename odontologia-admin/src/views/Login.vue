<template>
  <div class="login-page">
    <div class="container login-container">
      <div class="card login-card shadow">
        <div class="row g-0">
          <!-- PANEL IZQUIERDO -->
          <div class="col-lg-5 login-left d-none d-lg-flex flex-column justify-content-center align-items-center text-center">
            <img src="@/assets/img/descarga.png" alt="Logo" class="login-logo mb-4" />
            <h2 class="login-title mb-2">Facultad de Odontología</h2>
            <h1 class="login-subtitle mb-3">ULEAM</h1>
            <p class="login-description">
              Bienvenido a nuestra plataforma.
            </p>
          </div>

          <!-- PANEL DERECHO -->
          <div class="col-12 col-lg-7 login-right d-flex flex-column justify-content-center p-5">
            <button
              type="button"
              class="btn-close ms-auto mb-3"
              @click="resetForm"
              aria-label="Cerrar"
            ></button>
            <h3 class="text-primary fw-bold mb-4">Iniciar Sesión</h3>
            <form
              @submit.prevent="onSubmit"
              novalidate
              class="flex-grow-1 d-flex flex-column justify-content-center"
            >
              <div class="mb-4 position-relative">
                <i class="fas fa-user form-icon"></i>
                <input
                  v-model="email"
                  type="email"
                  class="form-control form-control-lg"
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
                  class="form-control form-control-lg"
                  placeholder="Contraseña"
                  required
                  :disabled="loading"
                />
              </div>
              <button
                type="submit"
                class="btn btn-login btn-lg w-100 mb-3"
                :disabled="loading"
              >
                <span v-if="!loading">ENTRAR</span>
                <span v-else>
                  <i class="fas fa-spinner fa-spin"></i> Procesando...
                </span>
              </button>
              <p class="text-muted small text-center">
                ¿Olvidaste tu contraseña?
                <a href="#" class="text-primary">Recupérala aquí</a>
              </p>
            </form>
          </div>
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
      case 'admin':
        router.push({ name: 'HomeAdmin' });
        break;
      case 'profesor':
        router.push({ name: 'ProfessorDashboard' });
        break;
      case 'secretario':
        router.push({ name: 'SecretaryDashboard' });
        break;
      case 'estudiante':
        router.push({ name: 'StudentDashboard' });
        break;
    }
  } catch (err: any) {
    alert(err.message || 'Error al iniciar sesión');
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
/* Fondo general */
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #4CA1AF, #2C3E50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.login-container {
  max-width: 1100px;
  width: 100%;
}

/* Card principal */
.login-card {
  border: none;
  border-radius: 1rem;
  overflow: hidden;
}

/* Panel izquierdo */
.login-left {
  background: linear-gradient(
    180deg,
    #2C3E50 0%,
    #4CA1AF 100%
  );
  color: #fff;
  padding: 3rem;
}

.login-logo {
  width: 120px;
  height: auto;
  background: #fff;
  border-radius: 50%;
  padding: 0.75rem;
  box-shadow: 0 0 15px rgba(0,0,0,0.2);
}

.login-title {
  font-size: 1.5rem;
  font-weight: 600;
}

.login-subtitle {
  font-size: 2.5rem;
  font-weight: 800;
  color: #F05B4D;
}

.login-description {
  font-size: 0.95rem;
  max-width: 300px;
}

/* Panel derecho */
.login-right {
  background: #fff;
}

.btn-close {
  color: #999;
  font-size: 1.2rem;
  transition: color 0.2s;
}

.btn-close:hover {
  color: #333;
}

.form-icon {
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: #4CA1AF;
}

.form-control {
  padding-left: 3rem;
  border-radius: 0.5rem;
  height: 3.5rem;
  border: 1px solid #CED4DA;
  transition: border-color 0.3s;
}

.form-control:focus {
  border-color: #4CA1AF;
  box-shadow: 0 0 0 0.2rem rgba(76, 161, 175, 0.25);
}

.btn-login {
  background: #f05b4d;
  border: none;
  color: #fff;
  font-weight: 600;
  border-radius: 0.5rem;
  transition: background 0.3s;
  height: 3.5rem;
}

.btn-login:hover {
  background: #c92c38;
}

.text-primary {
  color: #4CA1AF !important;
}

.text-muted {
  color: #6c757d !important;
}

.btn-login:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

a.text-primary {
  text-decoration: none;
}

a.text-primary:hover {
  text-decoration: underline;
}
</style>
