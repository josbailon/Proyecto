<!-- src/views/professor/AssignmentsManagementView.vue -->
<template>
  <section class="assignments-management container py-4">
    <!-- Sprint 4 – 2025-07-18 – Gestión de Tareas Académicas -->
    <h2 class="mb-4">Gestión de Tareas</h2>

    <div class="card shadow-sm">
      <div class="card-header d-flex align-items-center">
        <ul class="nav nav-tabs card-header-tabs flex-grow-1">
          <li class="nav-item">
            <a
              href="#"
              class="nav-link"
              :class="{ active: tab === 'list' }"
              @click.prevent="tab = 'list'"
            >
              Listado
            </a>
          </li>
          <li class="nav-item">
            <a
              href="#"
              class="nav-link"
              :class="{ active: tab === 'form' }"
              @click.prevent="prepareNew()"
            >
              {{ editMode ? 'Editar' : 'Crear' }}
            </a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <!-- LISTADO -->
        <div v-if="tab === 'list'">
          <DataTable
            :columns="columns"
            :rows="assignments"
            :page="page"
            :per-page="perPage"
            @edit="onEdit"
            @delete="onDelete"
            @update:page="(val: number) => (page = val)"
          />
        </div>
        <!-- FORMULARIO -->
        <div v-else>
          <AssignTaskForm
            :model-value="formModel"
            :edit-mode="editMode"
            @save="onSave"
            @cancel="() => (tab = 'list')"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Componentes
import DataTable      from '../../components/common/DataTable.vue';
import AssignTaskForm from '../../components/professor/AssignTaskForm.vue';

// Tipos y mocks (rutas relativas)
import type { ProfessorAssignment } from '../../mocks/professor/assignments';
import {
  fetchProfessorAssignmentsMock,
  saveProfessorAssignmentMock,
  deleteProfessorAssignmentMock
} from '../../mocks/professor/assignments';

const assignments = ref<ProfessorAssignment[]>([]);
const tab         = ref<'list' | 'form'>('list');
const editMode    = ref(false);
const formModel   = ref<Partial<ProfessorAssignment>>({});
const page        = ref(1);
const perPage     = ref(10);

const columns = [
  { key: 'title',     label: 'Título' },
  { key: 'course',    label: 'Curso' },
  { key: 'dueDate',   label: 'Fecha Entrega' },
  { key: 'createdAt', label: 'Creado El' }
];

onMounted(async () => {
  assignments.value = await fetchProfessorAssignmentsMock();
});

function prepareNew() {
  editMode.value  = false;
  formModel.value = {};
  tab.value       = 'form';
}

function onEdit(row: Record<string, any>) {
  editMode.value  = true;
  formModel.value = { ...(row as ProfessorAssignment) };
  tab.value       = 'form';
}

async function onSave(payload: ProfessorAssignment) {
  await saveProfessorAssignmentMock(payload);
  assignments.value = await fetchProfessorAssignmentsMock();
  tab.value         = 'list';
}

async function onDelete(id: number) {
  await deleteProfessorAssignmentMock(id);
  assignments.value = await fetchProfessorAssignmentsMock();
}
</script>

<style scoped src="../../assets/css/pages/professor/ProfessorAssignments.css"></style>
