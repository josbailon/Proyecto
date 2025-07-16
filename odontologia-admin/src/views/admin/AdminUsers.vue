<template>
  <div class="admin-users container-fluid py-4">
    <!-- Toolbar -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1 class="h3 text-primary">
        <i class="fas fa-users me-2"></i> Gestión de Usuarios
      </h1>
      <div class="d-flex">
        <input
          v-model="filter"
          type="text"
          class="form-control me-2"
          placeholder="🔍 Buscar..."
          aria-label="Buscar usuarios"
        />
        <button
          class="btn btn-success"
          @click="openModal()"
          aria-label="Añadir usuario"
        >
          <i class="fas fa-plus me-1"></i> Añadir
        </button>
      </div>
    </div>

    <!-- Spinner de carga -->
    <div v-if="loading" class="text-center my-4">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <!-- Mensaje de error -->
    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <!-- Tabla de usuarios -->
    <div v-if="!loading" class="table-responsive">
      <table class="table table-striped table-hover align-middle">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in filteredUsers" :key="u.id">
            <td>{{ u.id }}</td>
            <td>{{ u.nombre }}</td>
            <td>{{ u.email }}</td>
            <td>
              <span :class="roleBadgeClass(u.role)">
                {{ u.role }}
              </span>
            </td>
            <td class="text-center">
              <button
                class="btn btn-sm btn-primary me-1"
                @click="openModal(u)"
                title="Editar"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button
                class="btn btn-sm btn-danger"
                @click="onDelete(u.id)"
                title="Eliminar"
              >
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
          <tr v-if="!filteredUsers.length">
            <td colspan="5" class="text-center text-muted py-4">
              No se encontraron usuarios.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de Crear/Editar -->
    <transition name="fade">
      <div v-if="isModalOpen" class="modal-backdrop fade show"></div>
    </transition>
    <transition name="fade">
      <div
        v-if="isModalOpen"
        class="modal d-block"
        tabindex="-1"
        role="dialog"
        aria-modal="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content shadow">
            <div class="modal-header">
              <h5 class="modal-title">
                {{ editingUser.id ? 'Editar Usuario' : 'Nuevo Usuario' }}
              </h5>
              <button
                type="button"
                class="btn-close"
                @click="closeModal"
                aria-label="Cerrar"
              ></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="handleSave">
                <div class="mb-3">
                  <label class="form-label">Nombre</label>
                  <input
                    v-model="editingUser.nombre"
                    type="text"
                    class="form-control"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input
                    v-model="editingUser.email"
                    type="email"
                    class="form-control"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Rol</label>
                  <select
                    v-model="editingUser.role"
                    class="form-select"
                    required
                  >
                    <option disabled value="">Selecciona un rol</option>
                    <option v-for="r in roles" :key="r" :value="r">
                      {{ r }}
                    </option>
                  </select>
                </div>
                <div
                  class="mb-3"
                  v-if="['profesor', 'estudiante'].includes(editingUser.role)"
                >
                  <label class="form-label">Especialidad</label>
                  <input
                    v-model="editingUser.especialidad"
                    type="text"
                    class="form-control"
                  />
                </div>
                <div
                  class="mb-3"
                  v-if="editingUser.role === 'estudiante'"
                >
                  <label class="form-label">Historial</label>
                  <textarea
                    v-model="editingUser.historial"
                    class="form-control"
                    rows="2"
                  ></textarea>
                </div>
                <div class="d-flex justify-content-end mt-3">
                  <button
                    type="button"
                    class="btn btn-secondary me-2"
                    @click="closeModal"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="loading"
                  >
                    <span v-if="!loading">
                      {{ editingUser.id ? 'Guardar' : 'Crear' }}
                    </span>
                    <span v-else>
                      <i class="fas fa-spinner fa-spin"></i> Guardando...
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  fetchUsersMock,
  deleteUserMock,
  saveUserMock,
  type User,
  type Role
} from '../../mocks/api'

// Estados
const users = ref<User[]>([])
const loading = ref(false)
const error = ref('')
const filter = ref('')
const isModalOpen = ref(false)

// Modelo del formulario
const editingUser = ref<Partial<User> & { role: Role }>({
  id: 0,
  nombre: '',
  email: '',
  password: '',
  role: 'estudiante'
})

const roles: Role[] = ['admin', 'profesor', 'estudiante', 'secretario']

// Cargar datos iniciales
onMounted(loadUsers)

async function loadUsers() {
  loading.value = true
  error.value = ''
  try {
    users.value = await fetchUsersMock()
  } catch (err: unknown) {
    error.value = (err as { message?: string }).message || 'Error al cargar usuarios'
  } finally {
    loading.value = false
  }
}

// Computed de filtrado
const filteredUsers = computed(() =>
  users.value.filter(u =>
    u.nombre.toLowerCase().includes(filter.value.toLowerCase()) ||
    u.email.toLowerCase().includes(filter.value.toLowerCase())
  )
)

// Abrir modal
function openModal(user?: User) {
  if (user) {
    editingUser.value = { ...user }
  } else {
    editingUser.value = {
      nombre: '',
      email: '',
      password: '',
      role: 'estudiante'
    }
  }
  isModalOpen.value = true
}

// Cerrar modal
function closeModal() {
  isModalOpen.value = false
}

// Guardar
async function handleSave() {
  loading.value = true
  error.value = ''
  try {
    const u = editingUser.value as User
    await saveUserMock(u)
    await loadUsers()
    closeModal()
  } catch (err: unknown) {
    error.value = (err as { message?: string }).message || 'Error al guardar usuario'
  } finally {
    loading.value = false
  }
}

// Eliminar
async function onDelete(id: number) {
  if (!confirm('¿Eliminar este usuario?')) return
  loading.value = true
  error.value = ''
  try {
    await deleteUserMock(id)
    await loadUsers()
  } catch (err: unknown) {
    error.value = (err as { message?: string }).message || 'Error al eliminar usuario'
  } finally {
    loading.value = false
  }
}

// Clase dinámica para los badges
function roleBadgeClass(role: Role) {
  return {
    'badge bg-danger': role === 'admin',
    'badge bg-success': role === 'profesor',
    'badge bg-info text-dark': role === 'estudiante',
    'badge bg-warning text-dark': role === 'secretario'
  }
}
</script>

<style src="@/assets/css/pages/admin/AdminUsers.css" scoped></style>
