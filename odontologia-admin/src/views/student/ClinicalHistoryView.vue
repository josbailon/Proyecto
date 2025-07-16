<template>
  <section class="clinical-histories container py-4">
    <div class="card shadow-sm">
      <div class="card-header d-flex align-items-center">
        <ul class="nav nav-tabs card-header-tabs flex-grow-1">
          <li class="nav-item">
            <a class="nav-link" :class="{ active: tab === 'list' }" href="#" @click.prevent="tab = 'list'">Listado</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{ active: tab === 'form' }" href="#" @click.prevent="prepareNew(); tab = 'form'">{{ editMode ? 'Editar' : 'Crear' }}</a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <div v-if="tab === 'list'">
          <ClinicalHistoryList
            :histories="studentStore.histories"
            @edit="onEdit"
            @delete="onDelete"
          />
        </div>
        <div v-else>
          <ClinicalHistoryForm
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
import type { ClinicalHistory } from '../../mocks/student/clinicalHistories';

import ClinicalHistoryList from '../../components/student/ClinicalHistoryList.vue';
import ClinicalHistoryForm from '../../components/student/ClinicalHistoryForm.vue';

const studentStore = useStudentStore();
const tab = ref<'list' | 'form'>('list');
const editMode = ref(false);
const form = ref<Partial<ClinicalHistory>>({});

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
