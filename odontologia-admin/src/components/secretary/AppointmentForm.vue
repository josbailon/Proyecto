<template>
  <form @submit.prevent="submitForm" class="appointment-form">
    <div>
      <label for="patient">Paciente:</label>
      <select v-model="form.patientId" required>
        <option disabled value="">Seleccione un paciente</option>
        <option v-for="p in patients" :key="p.id" :value="p.id">
          {{ p.nombre }} ({{ p.cedula }})
        </option>
      </select>
    </div>

    <div>
      <label for="student">Estudiante:</label>
      <select v-model="form.studentId" required>
        <option disabled value="">Seleccione un estudiante</option>
        <option v-for="s in students" :key="s.id" :value="s.id">
          {{ s.name }} ({{ s.course }})
        </option>
      </select>
    </div>

    <div>
      <label for="datetime">Fecha y hora:</label>
      <input type="datetime-local" v-model="form.datetime" required />
    </div>

    <div>
      <label for="notes">Notas (opcional):</label>
      <textarea v-model="form.notes" rows="3"></textarea>
    </div>

    <button type="submit">Agendar Cita</button>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useSecretaryStore } from '@/store/secretary';

const store = useSecretaryStore();
const patients = store.patients;
const students = store.students;

const form = ref({
  patientId: '',
  studentId: '',
  datetime: '',
  notes: '',
});

function submitForm() {
  if (!form.value.patientId || !form.value.studentId || !form.value.datetime) return;

  store.addAppointment({
    id: 0,
    patientId: Number(form.value.patientId),
    studentId: Number(form.value.studentId),
    datetime: form.value.datetime,
    status: 'pendiente',
    notes: form.value.notes,
  });

  alert('Cita registrada exitosamente');

  Object.keys(form.value).forEach(key => form.value[key] = '');
}

onMounted(() => {
  store.loadPatients();
  store.loadStudents();
});
</script>

<style scoped>
.appointment-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: auto;
}

label {
  font-weight: bold;
}

input,
select,
textarea {
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
}

button {
  padding: 0.75rem;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>
