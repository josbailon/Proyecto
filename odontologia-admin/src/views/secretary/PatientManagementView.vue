<!-- Página: Gestión de Pacientes -->
<template>
  <section class="patient-management container py-4">
    <h2 class="mb-4">Gestión de Pacientes</h2>

    <div class="card shadow-sm">
      <div class="card-header d-flex justify-content-between align-items-center">
        <strong>Pacientes Registrados</strong>
        <button class="btn btn-sm btn-primary" @click="prepareNew">+ Nuevo Paciente</button>
      </div>
      <div class="card-body">
        <div v-if="tab === 'list'">
          <PatientList :patients="patients" @edit="onEdit" />
        </div>
        <div v-else>
          <PatientForm
            :model-value="formModel"
            :edit-mode="editMode"
            @save="onSave"
            @cancel="cancel"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * Página: Gestión de Pacientes
 */
import { ref, onMounted, computed } from 'vue';
import PatientList from '@/components/secretary/PatientList.vue';
import PatientForm from '@/components/secretary/PatientForm.vue';
import { useSecretaryStore } from '../../store/secretary';

const secretary = useSecretaryStore();
const tab = ref<'list' | 'form'>('list');
const editMode = ref(false);
const formModel = ref({});

const patients = computed(() => secretary.patients);

onMounted(async () => {
  await secretary.loadPatients();
});

function prepareNew() {
  editMode.value = false;
  formModel.value = {};
  tab.value = 'form';
}

function onEdit(patient: any) {
  editMode.value = true;
  formModel.value = { ...patient };
  tab.value = 'form';
}

async function onSave(p: any) {
  await secretary.savePatient(p);
  tab.value = 'list';
}

function cancel() {
  tab.value = 'list';
}
</script>

<style scoped src="@/assets/css/pages/secretary/PatientManagement.css"></style>
