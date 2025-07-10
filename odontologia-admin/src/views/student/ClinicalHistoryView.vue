<!-- src/views/student/ClinicalHistoryView.vue -->
<template>
  <section class="clinical-histories container py-4">
    <!-- Sprint 4 – 2025-07-16 – CRUD Historias Clínicas -->
    <div class="card shadow-sm">
      <div class="card-header d-flex align-items-center">
        <ul class="nav nav-tabs card-header-tabs flex-grow-1">
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: tab === 'list' }"
              href="#"
              @click.prevent="tab = 'list'"
            >
              Listado
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: tab === 'form' }"
              href="#"
              @click.prevent="prepareNew(); tab = 'form'"
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
            :columns="cols"
            :rows="studentStore.histories"
            :page="page"
            :per-page="perPage"
            @edit="onEdit"
            @delete="onDelete"
            @update:page="page = $event"
          />
        </div>

        <!-- FORMULARIO -->
        <div v-else>
          <HistoryForm
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
import HistoryForm from '../../components/student/HistoryForm.vue';
import type { ClinicalHistory } from '../../mocks/student/clinicalHistories';

const studentStore = useStudentStore();
const tab = ref<'list' | 'form'>('list');
const editMode = ref(false);
const form = ref<Partial<ClinicalHistory>>({});
const page = ref(1);
const perPage = ref(10);

const cols = [
  { key: 'generalData',       label: 'Datos Generales' },
  { key: 'dentalHistory',     label: 'Antecedentes Dentales' },
  { key: 'intraoralFindings', label: 'Hallazgos Intraorales' }
];

onMounted(() => {
  studentStore.loadHistories();
});

function prepareNew() {
  editMode.value = false;
  form.value = {};
}

function prepareEdit(h: ClinicalHistory) {
  editMode.value = true;
  form.value = { ...h };
  tab.value = 'form';
}

/** Manejador intermedio para el evento edit, convierte al tipo correcto */
function onEdit(row: Record<string, any>) {
  prepareEdit(row as ClinicalHistory);
}

async function onSubmit(payload: ClinicalHistory) {
  await studentStore.saveHistory(payload);
  tab.value = 'list';
}

async function onDelete(id: number) {
  await studentStore.deleteHistory(id);
}
</script>

<style src="../../assets/css/pages/student/ClinicalHistoryView.css" scoped></style>
