<!-- src/views/admin/AdminUsers.vue -->
<template>
  <div class="admin-users container-fluid py-4">
    <div class="d-flex flex-column flex-sm-row justify-content-between align-items-start mb-4">
      <h2 class="mb-3 mb-sm-0">Gestión de Usuarios</h2>
      <div class="d-flex gap-2 w-100 w-sm-auto">
        <input
          v-model="search"
          type="text"
          class="form-control"
          placeholder="Buscar usuarios..."
        />
        <button class="btn btn-success" @click="openAddModal">
          <i class="fas fa-user-plus me-1"></i> Añadir usuario
        </button>
      </div>
    </div>

    <div class="card shadow-sm">
      <div class="card-body p-0">
        <table class="table table-striped table-hover mb-0">
          <thead class="table-primary">
            <tr>
              <th>ID</th><th>Nombre</th><th>Email</th><th>Rol</th><th class="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.nombre }}</td>
              <td>{{ user.email }}</td>
              <td>
                <span
                  class="badge text-capitalize"
                  :class="{
                    'bg-primary':   user.role === 'admin',
                    'bg-success':   user.role === 'profesor',
                    'bg-info':      user.role === 'estudiante',
                    'bg-secondary': user.role === 'secretario'
                  }"
                >
                  {{ user.role }}
                </span>
              </td>
              <td class="text-center">
                <button class="btn btn-sm btn-outline-primary me-1"
                        @click="openEditModal(user)">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger"
                        @click="confirmDelete(user.id)">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
            <tr v-if="filteredUsers.length === 0">
              <td colspan="5" class="text-center py-3 text-muted">
                No se encontraron usuarios.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <UserFormModal
      v-if="showModal"
      :user="currentUser"
      @save="fetchUsers"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
// 👉 Importa tipo y funciones desde tu mock
import type { User } from '../../mocks/api';
import { fetchUsersMock, deleteUserMock } from '../../mocks/api';

import UserFormModal from '@/components/admin/UserForm.vue';

const users       = ref<User[]>([]);
const search      = ref('');
const showModal   = ref(false);
const currentUser = ref<User | null>(null);

const fetchUsers = async () => {
  users.value = await fetchUsersMock();
};

onMounted(fetchUsers);

const filteredUsers = computed(() =>
  users.value.filter((u: User) =>
    [u.nombre, u.email, u.role]
      .some(field => field.toLowerCase().includes(search.value.toLowerCase()))
  )
);

function openAddModal() {
  currentUser.value = null;
  showModal.value = true;
}

function openEditModal(user: User) {
  currentUser.value = { ...user };
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

async function confirmDelete(id: number) {
  if (confirm('¿Seguro que deseas eliminar este usuario?')) {
    await deleteUserMock(id);
    await fetchUsers();
  }
}
</script>

<style src="@/assets/css/pages/admin/AdminUsers.css" scoped></style>
