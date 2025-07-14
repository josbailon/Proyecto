<template>
  <div class="admin-users container-fluid py-4">
    <!-- Toolbar -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1 class="h3 text-primary">
        <i class="fas fa-users me-2"></i>Gestión de Usuarios
      </h1>
      <div class="d-flex">
        <input
          v-model="filter"
          @input="onFilter"
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

    <!-- Tabla de usuarios -->
    <div class="table-responsive">
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
              <span
                :class="{
                  'badge bg-danger': u.role === 'admin',
                  'badge bg-success': u.role === 'profesor',
                  'badge bg-info text-dark': u.role === 'estudiante',
                  'badge bg-warning text-dark': u.role === 'secretario'
                }"
              >
                {{ u.role }}
              </span>
            </td>
            <td class="text-center">
              <button
                class="btn btn-sm btn-primary me-1"
                @click="openModal(u)"
                data-bs-toggle="tooltip"
                title="Editar"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button
                class="btn btn-sm btn-danger"
                @click="onDelete(u.id)"
                data-bs-toggle="tooltip"
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
                aria-label="Cerrar"
                @click="closeModal"
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
                    <option
                      v-for="r in roles"
                      :key="r"
                      :value="r"
                    >{{ r }}</option>
                  </select>
                </div>
                <div
                  class="mb-3"
                  v-if="['profesor','estudiante'].includes(editingUser.role)"
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
                  <input
                    v-model="editingUser.historial"
                    type="text"
                    class="form-control"
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="closeModal"
              >
                Cancelar
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="handleSave"
              >
                {{ editingUser.id ? 'Guardar' : 'Crear' }}
              </button>
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

const users = ref<User[]>([])
const filter = ref('')
const isModalOpen = ref(false)

// Para crear/editar
const editingUser = ref<Partial<User> & { role: Role }>({
  id: 0,
  nombre: '',
  email: '',
  password: '',
  role: 'estudiante'
})

const roles: Role[] = ['admin', 'profesor', 'estudiante', 'secretario']

// Carga inicial
async function loadUsers() {
  users.value = await fetchUsersMock()
}
onMounted(loadUsers)

// Filtrado
const filteredUsers = computed(() =>
  users.value.filter(u =>
    u.nombre.toLowerCase().includes(filter.value.toLowerCase()) ||
    u.email.toLowerCase().includes(filter.value.toLowerCase())
  )
)
function onFilter() {
  /* nada más: v-model + computed se encargan */
}

// Abrir modal (nuevo o editar)
function openModal(user?: User) {
  if (user) {
    editingUser.value = { ...user } as any
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

// Guardar cambios o crear
async function handleSave() {
  // convertir Partial<User> → User
  const u = editingUser.value as User
  await saveUserMock(u)
  await loadUsers()
  closeModal()
}

// Eliminar
async function onDelete(id: number) {
  if (!confirm('¿Eliminar este usuario?')) return
  await deleteUserMock(id)
  await loadUsers()
}
</script>

<style src="@/assets/css/pages/admin/AdminUsers.css" scoped></style>
