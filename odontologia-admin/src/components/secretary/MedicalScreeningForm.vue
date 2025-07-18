<template>
  <div class="medical-form">
    <h2>Cuestionario de Tamizaje Médico</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="paciente">Paciente:</label>
        <select v-model="form.patientId" required>
          <option disabled value="">Seleccione un paciente</option>
          <option v-for="p in patients" :key="p.id" :value="p.id">
            {{ p.nombre }} - {{ p.cedula }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Enfermedades:</label>
        <input v-model="enfermedad" @keyup.enter.prevent="addEnfermedad" placeholder="Presione Enter para agregar" />
        <ul>
          <li v-for="(item, index) in form.enfermedades" :key="index">
            {{ item }} <button @click.prevent="removeEnfermedad(index)">✖</button>
          </li>
        </ul>
      </div>

      <div class="form-group">
        <label>Medicamentos:</label>
        <input v-model="medicamento" @keyup.enter.prevent="addMedicamento" placeholder="Presione Enter para agregar" />
        <ul>
          <li v-for="(item, index) in form.medicamentos" :key="index">
            {{ item }} <button @click.prevent="removeMedicamento(index)">✖</button>
          </li>
        </ul>
      </div>

      <div class="form-group">
        <label>Alergias:</label>
        <input v-model="alergia" @keyup.enter.prevent="addAlergia" placeholder="Presione Enter para agregar" />
        <ul>
          <li v-for="(item, index) in form.alergias" :key="index">
            {{ item }} <button @click.prevent="removeAlergia(index)">✖</button>
          </li>
        </ul>
      </div>

      <div class="form-group">
        <label>Tipo de Sangre:</label>
        <select v-model="form.tipoSangre" required>
          <option disabled value="">Seleccione un tipo</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
      </div>

      <div class="form-group">
        <label>Condiciones Sistémicas:</label>
        <input v-model="condicion" @keyup.enter.prevent="addCondicion" placeholder="Presione Enter para agregar" />
        <ul>
          <li v-for="(item, index) in form.condiciones" :key="index">
            {{ item }} <button @click.prevent="removeCondicion(index)">✖</button>
          </li>
        </ul>
      </div>

      <button type="submit">Guardar Historia Médica</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useSecretaryStore } from '@/store/secretary';
import type { MedicalHistory } from '@/mocks/secretary/medicalHistories';

const secretary = useSecretaryStore();
const patients = computed(() => secretary.patients);

const form = ref<MedicalHistory>({
  id: Date.now(),
  patientId: 0,
  enfermedades: [],
  medicamentos: [],
  alergias: [],
  tipoSangre: '',
  condiciones: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const enfermedad = ref('');
const medicamento = ref('');
const alergia = ref('');
const condicion = ref('');

// Métodos para añadir y eliminar elementos
function addEnfermedad() {
  if (enfermedad.value) {
    form.value.enfermedades.push(enfermedad.value);
    enfermedad.value = '';
  }
}
function removeEnfermedad(index: number) {
  form.value.enfermedades.splice(index, 1);
}

function addMedicamento() {
  if (medicamento.value) {
    form.value.medicamentos.push(medicamento.value);
    medicamento.value = '';
  }
}
function removeMedicamento(index: number) {
  form.value.medicamentos.splice(index, 1);
}

function addAlergia() {
  if (alergia.value) {
    form.value.alergias.push(alergia.value);
    alergia.value = '';
  }
}
function removeAlergia(index: number) {
  form.value.alergias.splice(index, 1);
}

function addCondicion() {
  if (condicion.value) {
    form.value.condiciones.push(condicion.value);
    condicion.value = '';
  }
}
function removeCondicion(index: number) {
  form.value.condiciones.splice(index, 1);
}

function submitForm() {
  form.value.id = Date.now();
  form.value.createdAt = new Date().toISOString();
  form.value.updatedAt = new Date().toISOString();
  secretary.addOrUpdateHistory({ ...form.value });
  alert('Historia médica registrada correctamente');
  resetForm();
}

function resetForm() {
  form.value = {
    id: Date.now(),
    patientId: 0,
    enfermedades: [],
    medicamentos: [],
    alergias: [],
    tipoSangre: '',
    condiciones: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
</script>

<style scoped>
.medical-form {
  max-width: 600px;
  margin: auto;
  background: #ffffff;z
  padding: 1.5rem;
  border-radius: 8px;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input,
select,
textarea {
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

ul {
  padding-left: 1rem;
}

ul li {
  list-style: disc;
  margin-bottom: 0.3rem;
}

button {
  background-color: #007bff;
  color: white;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
