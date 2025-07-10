<!-- src/views/admin/AdminUsers.vue -->
<template>
  <section class="admin-users container py-4">
    <!-- Sprint 2 – 2025-07-11 – CRUD usuarios -->
    <div class="card shadow-sm">
      <div class="card-header d-flex align-items-center">
        <ul class="nav nav-tabs card-header-tabs flex-grow-1">
          <li class="nav-item">
            <a
              href="#"
              class="nav-link"
              :class="{ active: activeTab === 'list' }"
              @click.prevent="activeTab = 'list'"
            >
              Listado
            </a>
          </li>
          <li class="nav-item">
            <a
              href="#"
              class="nav-link"
              :class="{ active: activeTab === 'form' }"
              @click.prevent="prepareNew(); activeTab = 'form'"
            >
              {{ editMode ? 'Editar' : 'Crear' }}
            </a>
          </li>
        </ul>
        <button
          class="btn btn-success btn-sm ms-3"
          v-if="activeTab === 'list'"
          @click="prepareNew(); activeTab = 'form'"
        >
          <i class="fas fa-user-plus me-1"></i> Nuevo
        </button>
      </div>

      <div class="card-body">
        <!-- LISTADO -->
        <div v-if="activeTab === 'list'">
          <div class="d-flex mb-3">
            <input
              v-model="search"
              type="text"
              class="form-control form-control-sm w-auto me-auto"
              placeholder="Buscar..."
            />
            <select v-model="perPage" class="form-select form-select-sm w-auto">
              <option v-for="n in [5,10,25]" :key="n" :value="n">{{ n }} / pág.</option>
            </select>
          </div>
          <DataTable
            :columns="columns"
            :rows="pagedUsers"
            :page="page"
            :per-page="perPage"
            @edit="prepareEdit"
            @delete="confirmDelete"
            @update:page="page = $event"
          />
        </div>

        <!-- FORMULARIO -->
        <div v-else>
          <UserForm
            :model-value="form"
            :edit-mode="editMode"
            @save="onSubmit"
            @cancel="cancelForm"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { User } from '../../mocks/admin/user';
import { useAdminStore } from '../../store/admin';
import DataTable from '../../components/common/DataTable.vue';
import UserForm from '../../components/admin/UserForm.vue';

const adminStore = useAdminStore();

// Tabs & form state
const activeTab = ref<'list' | 'form'>('list');
const editMode  = ref(false);

// Table controls
const search  = ref('');
const page    = ref(1);
const perPage = ref(10);

// Form model
const form = ref<Partial<User>>({});

// Table columns
const columns = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'email',  label: 'Email'  },
  { key: 'role',   label: 'Rol'    }
];

onMounted(async () => {
  await adminStore.fetchUsers();
});

// Computed: filtered & paginated users
const filteredUsers = computed(() =>
  adminStore.users.filter((u: User) =>
    u.nombre.toLowerCase().includes(search.value.toLowerCase()) ||
    u.email.toLowerCase().includes(search.value.toLowerCase())
  )
);

const pagedUsers = computed(() =>
  filteredUsers.value.slice((page.value - 1) * perPage.value, page.value * perPage.value)
);

// Handlers
function prepareNew() {
  editMode.value = false;
  form.value = {};
}

function prepareEdit(u: User) {
  editMode.value = true;
  form.value = { ...u };
  activeTab.value = 'form';
}

function cancelForm() {
  activeTab.value = 'list';
}

async function onSubmit(data: Partial<User>) {
  await adminStore.saveUser(data as User);
  cancelForm();
}

async function confirmDelete(id: number) {
  if (!confirm('¿Eliminar usuario?')) return;
  await adminStore.deleteUser(id);
}
</script>

<style src="../../assets/css/pages/admin/AdminUsers.css" scoped></style>
