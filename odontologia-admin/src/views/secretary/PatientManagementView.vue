<!-- src/views/secretary/PatientManagementView.vue -->
<template>
  <div class="patient-management-view">
    <h2>Gestión de Pacientes</h2>

    <PatientForm @saved="refresh" />
    <PatientList :patients="store.patients" />
  </div>
</template>

<script setup lang="ts">
import PatientForm from '@/components/secretary/PatientForm.vue';
import PatientList from '@/components/secretary/PatientList.vue';
import { onMounted } from 'vue';
import { useSecretaryStore } from '@/store/secretary';

const store = useSecretaryStore();

function refresh() {
  store.loadAllData(); // Se llama solo un método de carga general
}

onMounted(() => {
  store.loadAllData();
});
</script>
