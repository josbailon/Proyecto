<template>
  <div class="users-page">
    <!-- Título -->
    <h2><i class="fas fa-user-cog me-2"></i>Gestión de Usuarios</h2>

    <div class="card shadow-sm">
      <!-- Tabs + Nuevo -->
      <div class="card-header d-flex align-items-center">
        <ul class="nav nav-tabs card-header-tabs flex-grow-1">
          <li class="nav-item">
            <a
              href="#"
              class="nav-link"
              :class="{ active: activeTab === 'list' }"
              @click.prevent="activeTab = 'list'"
            >Listado</a>
          </li>
          <li class="nav-item">
            <a
              href="#"
              class="nav-link"
              :class="{ active: activeTab === 'form' }"
              @click.prevent="activeTab = 'form'; prepareNew()"
            >{{ editMode ? 'Editar' : 'Crear' }}</a>
          </li>
        </ul>
        <button
          v-if="activeTab === 'list'"
          class="btn btn-success btn-sm ms-3"
          @click="activeTab = 'form'; prepareNew()"
        >
          <i class="fas fa-user-plus me-1"></i> Nuevo
        </button>
      </div>

      <div class="card-body">
        <!-- LISTADO -->
        <div v-if="activeTab === 'list'">
          <div class="d-flex mb-3">
            <div class="input-group input-group-sm w-auto me-auto">
              <span class="input-group-text"><i class="fas fa-search"></i></span>
              <input
                v-model="search"
                type="text"
                class="form-control"
                placeholder="Buscar..."
              />
            </div>
            <select v-model="perPage" class="form-select form-select-sm w-auto">
              <option v-for="n in [5,10,25]" :key="n" :value="n">
                {{ n }} / pág.
              </option>
            </select>
          </div>
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead class="table-light">
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th class="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="u in paginatedUsers" :key="u.id">
                  <td>{{ u.nombre }}</td>
                  <td>{{ u.email }}</td>
                  <td>
                    <span class="badge" :class="roleBadge(u.role)">{{ u.role }}</span>
                  </td>
                  <td class="text-end">
                    <button
                      class="btn btn-outline-primary btn-sm btn-action me-1"
                      @click="activeTab='form'; prepareEdit(u)"
                      title="Editar"
                    ><i class="fas fa-edit"></i></button>
                    <button
                      class="btn btn-outline-danger btn-sm btn-action"
                      @click="confirmDelete(u.id!)"
                      title="Eliminar"
                    ><i class="fas fa-trash-alt"></i></button>
                  </td>
                </tr>
                <tr v-if="paginatedUsers.length===0">
                  <td colspan="4" class="text-center py-3 text-muted">
                    No hay usuarios.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="d-flex justify-content-between align-items-center mt-3">
            <small>Mostrando {{ paginatedUsers.length }} de {{ filteredUsers.length }}</small>
            <ul class="pagination pagination-sm mb-0">
              <li class="page-item" :class="{ disabled: page===1 }">
                <button class="page-link" @click="prevPage">«</button>
              </li>
              <li class="page-item" :class="{ disabled: page===totalPages }">
                <button class="page-link" @click="nextPage">»</button>
              </li>
            </ul>
          </div>
        </div>

        <!-- FORMULARIO -->
        <div v-else>
          <form @submit.prevent="onSubmit" class="row g-3">
            <div class="col-md-6 form-floating">
              <input
                v-model="form.nombre"
                type="text"
                class="form-control"
                id="nombre"
                placeholder="Nombre"
                required
              />
              <label for="nombre">Nombre</label>
            </div>
            <div class="col-md-6 form-floating">
              <input
                v-model="form.email"
                type="email"
                class="form-control"
                id="email"
                placeholder="Email"
                required
              />
              <label for="email">Email</label>
            </div>
            <div v-if="!editMode" class="col-md-6 form-floating">
              <input
                v-model="form.password"
                type="password"
                class="form-control"
                id="password"
                placeholder="Contraseña"
                required
              />
              <label for="password">Contraseña</label>
            </div>
            <div class="col-md-6 form-floating">
              <select v-model="form.role" class="form-select" id="role" required>
                <option :value="undefined">Seleccione rol</option>
                <option v-for="r in roles" :key="r" :value="r">{{ r }}</option>
              </select>
              <label for="role">Rol</label>
            </div>
            <div v-if="form.role==='estudiante'" class="col-md-6 form-floating">
              <input
                v-model="form.especialidad"
                type="text"
                class="form-control"
                id="especialidad"
                placeholder="Especialidad"
              />
              <label for="especialidad">Especialidad</label>
            </div>
            <div v-if="form.role==='paciente'" class="col-12 form-floating">
              <textarea
                v-model="form.historial"
                class="form-control"
                id="historial"
                placeholder="Historial"
              ></textarea>
              <label for="historial">Historial</label>
            </div>
            <div class="col-12 d-flex justify-content-end">
              <button type="submit" class="btn btn-success me-2">
                <i :class="editMode ? 'fas fa-save' : 'fas fa-check'" class="me-1"></i>
                {{ editMode ? 'Actualizar' : 'Crear' }}
              </button>
              <button class="btn btn-secondary" @click="cancelForm" type="button">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, onMounted } from 'vue';
import { fetchUsersMock, saveUserMock, deleteUserMock } from '../../mocks/admin/api';
import type { User, Role } from '../../mocks/admin/user';

export default defineComponent({
  name: 'AdminUsers',
  setup() {
    const users = ref<User[]>([]);
    const search = ref('');
    const page = ref(1);
    const perPage = ref(10);
    const activeTab = ref<'list'|'form'>('list');
    const editMode = ref(false);

    const load = async () => {
      users.value = await fetchUsersMock();
    };
    onMounted(load);

    const filteredUsers = computed(() =>
      users.value.filter(u =>
        u.nombre.toLowerCase().includes(search.value.toLowerCase()) ||
        u.email.toLowerCase().includes(search.value.toLowerCase())
      )
    );
    const totalPages = computed(() =>
      Math.max(1, Math.ceil(filteredUsers.value.length / perPage.value))
    );
    const paginatedUsers = computed(() =>
      filteredUsers.value.slice(
        (page.value - 1)*perPage.value,
        page.value*perPage.value
      )
    );
    const prevPage = () => page.value>1 && page.value--;
    const nextPage = () => page.value<totalPages.value && page.value++;

    const roles: Role[] = ['admin','estudiante','secretario','paciente'];
    const form = reactive<Partial<User>>({
      nombre:'', email:'', password:'', role: undefined, especialidad:'', historial:''
    });

    const prepareNew = () => {
      editMode.value = false;
      Object.assign(form, {
        id: undefined, nombre:'', email:'', password:'', role: undefined,
        especialidad:'', historial:''
      });
    };
    const prepareEdit = (u: User) => {
      editMode.value = true;
      Object.assign(form, u);
    };
    const cancelForm = () => {
      prepareNew();
      activeTab.value = 'list';
    };

    const onSubmit = async () => {
      await saveUserMock(form as User);
      await load();
      activeTab.value = 'list';
    };
    const confirmDelete = async (id: number) => {
      if (!confirm('¿Eliminar este usuario?')) return;
      await deleteUserMock(id);
      if (page.value>totalPages.value) page.value=totalPages.value;
      await load();
    };

    const roleBadge = (r: Role) => {
      switch(r){
        case 'admin':      return 'badge bg-danger';
        case 'estudiante': return 'badge bg-primary';
        case 'secretario': return 'badge bg-warning text-dark';
        case 'paciente':   return 'badge bg-success';
      }
    };

    return {
      users, search, page, perPage,
      filteredUsers, paginatedUsers, totalPages,
      prevPage, nextPage,
      activeTab, editMode,
      roles, form,
      prepareNew, prepareEdit, cancelForm,
      onSubmit, confirmDelete, roleBadge
    };
  }
});
</script>

<style src="../../assets/css/pages/admin/AdminUsers.css" scoped></style>
