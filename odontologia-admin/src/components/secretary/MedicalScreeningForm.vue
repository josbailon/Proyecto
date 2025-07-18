<template>
  <form @submit.prevent="submitForm" class="medical-screening-form">
    <div>
      <label>Paciente:</label>
      <select v-model="form.patientId" required>
        <option disabled value="">Seleccione un paciente</option>
        <option v-for="p in patients" :key="p.id" :value="p.id">
          {{ p.nombre }} ({{ p.cedula }})
        </option>
      </select>
    </div>

    <div>
      <label>Enfermedades:</label>
      <input v-model="form.enfermedades" placeholder="Ej: Diabetes, Asma" />
    </div>

    <div>
      <label>Medicamentos:</label>
      <input v-model="form.medicamentos" placeholder="Ej: Ibuprofeno" />
    </div>

    <div>
      <label>Alergias:</label>
      <input v-model="form.alergias" placeholder="Ej: Penicilina" />
    </div>

    <div>
      <label>Tipo de sangre:</label>
      <input v-model="form.tipoSangre" placeholder="Ej: O+" />
    </div>

    <div>
      <label>Condiciones sistémicas:</label>
      <input v-model="form.condiciones" placeholder="Ej: Hipertensión" />
    </div>

    <button type="submit">Guardar Cuestionario</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSecretaryStore } from '@/store/secretary';

const store = useSecretaryStore();
const patients = store.patients;

const form = ref({
  patientId: '',
  enfermedades: '',
  medicamentos: '',
  alergias: '',
  tipoSangre: '',
  condiciones: ''
});

function submitForm() {
  if (!form.value.patientId) return;

  store.addMedicalHistory({
    id: 0,
    patientId: Number(form.value.patientId),
    generalData: form.value.enfermedades,
    dentalHistory: '',
    intraoralFindings: '',
    allergies: form.value.alergias.split(',').map(a => a.trim()),
    medications: form.value.medicamentos.split(',').map(m => m.trim()),
    systemicHistory: form.value.condiciones,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  alert('Historia médica registrada exitosamente');
  Object.keys(form.value).forEach(key => form.value[key as keyof typeof form.value] = '');
}
</script>

<style scoped>
.medical-screening-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: auto;
}

label {
  font-weight: bold;
}

input, select {
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
}

button {
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
