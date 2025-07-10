<template>
  <section class="assignments container py-4">
    <!-- Sprint 4 – 2025-07-18 – CRUD Tareas Académicas -->
    <div class="card shadow-sm">
      <div class="card-header d-flex align-items-center">
        <ul class="nav nav-tabs card-header-tabs flex-grow-1">
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: tab === 'list' }"
              href="#"
              @click.prevent="tab = 'list'"
            >Listado</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: tab === 'form' }"
              href="#"
              @click.prevent="prepareNew(); tab = 'form'"
            >{{ editMode ? 'Editar' : 'Crear' }}</a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <!-- LISTADO -->
        <div v-if="tab === 'list'">
          <DataTable
            :columns="cols"
            :rows="studentStore.assignments"
            :page="page"
            :per-page="perPage"
            @edit="onEdit"
            @delete="onDelete"
            @update:page="page = $event"
          />
        </div>
        <!-- FORMULARIO -->
        <div v-else>
          <AssignmentForm
            :model-value="form"
            :edit-mode="editMode"
            @save="onSubmit"
            @cancel="() => (tab = 'list')"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStudentStore } from '../../store/student';
import DataTable from '../../components/common/DataTable.vue';
import AssignmentForm from '../../components/student/AssignmentForm.vue';
import type { Assignment } from '../../mocks/student/assignments';

const studentStore = useStudentStore();
const tab         = ref<'list'|'form'>('list');
const editMode    = ref(false);
const form        = ref<Partial<Assignment>>({});
const page        = ref(1);
const perPage     = ref(10);

const cols = [
  { key: 'title',   label: 'Título' },
  { key: 'dueDate', label: 'Fecha Límite' },
  { key: 'status',  label: 'Estado' }
];

onMounted(() => {
  studentStore.loadAssignments();
});

function prepareNew() {
  editMode.value = false;
  form.value = {};
}

function prepareEdit(a: Assignment) {
  editMode.value = true;
  form.value = { ...a };
  tab.value = 'form';
}

// handler intermedio
function onEdit(row: Record<string, any>) {
  prepareEdit(row as Assignment);
}

async function onSubmit(payload: Assignment) {
  await studentStore.saveAssignment(payload);
  tab.value = 'list';
}

async function onDelete(id: number) {
  await studentStore.deleteAssignment(id);
}
</script>

<style src="../../assets/css/pages/student/AssignmentsView.css" scoped></style>
