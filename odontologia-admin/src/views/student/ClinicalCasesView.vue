<template>
  <section class="clinical-cases container py-4">
    <!-- Sprint 4 – 2025-07-17 – CRUD Casos Clínicos -->
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
            :rows="studentStore.cases"
            :page="page"
            :per-page="perPage"
            @edit="onEdit"
            @delete="onDelete"
            @update:page="page = $event"
          />
        </div>
        <!-- FORMULARIO -->
        <div v-else>
          <CaseForm
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
import CaseForm from '../../components/student/CaseForm.vue';
import type { ClinicalCase } from '../../mocks/student/clinicalCases';

const studentStore = useStudentStore();
const tab         = ref<'list'|'form'>('list');
const editMode    = ref(false);
const form        = ref<Partial<ClinicalCase>>({});
const page        = ref(1);
const perPage     = ref(10);

const cols = [
  { key: 'title',     label: 'Título' },
  { key: 'stage',     label: 'Etapa' },
  { key: 'createdAt', label: 'Fecha Creación' }
];

onMounted(() => {
  studentStore.loadCases();
});

function prepareNew() {
  editMode.value = false;
  form.value = {};
}

function prepareEdit(c: ClinicalCase) {
  editMode.value = true;
  form.value = { ...c };
  tab.value = 'form';
}

// convierto el row genérico a ClinicalCase
function onEdit(row: Record<string, any>) {
  prepareEdit(row as ClinicalCase);
}

async function onSubmit(payload: ClinicalCase) {
  await studentStore.saveCase(payload);
  tab.value = 'list';
}

async function onDelete(id: number) {
  await studentStore.deleteCase(id);
}
</script>

<style src="../../assets/css/pages/student/ClinicalCasesView.css" scoped></style>
