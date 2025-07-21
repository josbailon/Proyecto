<!-- src/components/secretary/MedicalScreeningForm.vue -->
<template>
  <div class="medical-form">
    <h2>Cuestionario de Tamizaje Médico</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="patientId">Paciente</label>
        <select v-model="formulario.patientId" required>
          <option disabled value="">Seleccione un paciente</option>
          <option v-for="p in secretaryStore.patients" :key="p.id" :value="p.id">
            {{ p.nombre }} - {{ p.cedula }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Enfermedades</label>
        <input type="text" v-model="formulario.enfermedades" />
      </div>

      <div class="form-group">
        <label>Medicamentos</label>
        <input type="text" v-model="formulario.medicamentos" />
      </div>

      <div class="form-group">
        <label>Alergias</label>
        <input type="text" v-model="formulario.alergias" />
      </div>

      <div class="form-group">
        <label>Tipo de Sangre</label>
        <input type="text" v-model="formulario.tipoSangre" />
      </div>

      <div class="form-group">
        <label>Condiciones sistémicas</label>
        <input type="text" v-model="formulario.condiciones" />
      </div>

      <button type="submit">Guardar Historia Médica</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useSecretaryStore } from '../../store/secretary';

const secretaryStore = useSecretaryStore();

const formulario = reactive({
  patientId: '',
  enfermedades: '',
  medicamentos: '',
  alergias: '',
  tipoSangre: '',
  condiciones: '',
});

function limpiarFormulario() {
  formulario.patientId = '';
  formulario.enfermedades = '';
  formulario.medicamentos = '';
  formulario.alergias = '';
  formulario.tipoSangre = '';
  formulario.condiciones = '';
}

async function handleSubmit() {
  if (!formulario.patientId) return alert('Seleccione un paciente');

  await secretaryStore.addMedicalHistory({
    id: 0,
    patientId: Number(formulario.patientId),
    generalData: '',
    dentalHistory: '',
    intraoralFindings: '',
    allergies: formulario.alergias.split(',').map(a => a.trim()),
    medicamentos: formulario.medicamentos.split(',').map(m => m.trim()),
    enfermedades: formulario.enfermedades.split(',').map(e => e.trim()),
    tipoSangre: formulario.tipoSangre,
    condiciones: formulario.condiciones.split(',').map(c => c.trim()),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  alert('Historia médica guardada exitosamente');
  limpiarFormulario();
}
</script>

<style scoped>
.medical-form {
  max-width: 600px;
  margin: auto;
}
.form-group {
  margin-bottom: 1rem;
}
</style>
