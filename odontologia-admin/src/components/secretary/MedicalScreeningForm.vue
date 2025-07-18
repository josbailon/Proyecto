<template>
  <section class="medical-screening container">
    <h2>Cuestionario de Tamizaje Médico</h2>
    <form @submit.prevent="submitForm" class="form-container">
      <!-- Paciente -->
      <div class="form-group">
        <label for="paciente">Paciente:</label>
        <select v-model="form.patientId" required>
          <option disabled value="">Seleccione un paciente</option>
          <option v-for="p in patients" :key="p.id" :value="p.id">
            {{ p.nombre }} - {{ p.cedula }}
          </option>
        </select>
      </div>

      <!-- Enfermedades -->
      <div class="form-group">
        <label>Enfermedades:</label>
        <div class="input-inline">
          <input v-model="enfermedad" @keyup.enter.prevent="addEnfermedad" placeholder="Presione Enter para agregar" />
        </div>
        <ul>
          <li v-for="(item, index) in form.enfermedades" :key="index">
            {{ item }}
            <button type="button" @click="removeEnfermedad(index)">✖</button>
          </li>
        </ul>
      </div>

      <!-- Medicamentos -->
      <div class="form-group">
        <label>Medicamentos:</label>
        <input v-model="medicamento" @keyup.enter.prevent="addMedicamento" placeholder="Presione Enter para agregar" />
        <ul>
          <li v-for="(item, index) in form.medicamentos" :key="index">
            {{ item }}
            <button type="button" @click="removeMedicamento(index)">✖</button>
          </li>
        </ul>
      </div>

      <!-- Alergias -->
      <div class="form-group">
        <label>Alergias:</label>
        <input v-model="alergia" @keyup.enter.prevent="addAlergia" placeholder="Presione Enter para agregar" />
        <ul>
          <li v-for="(item, index) in form.alergias" :key="index">
            {{ item }}
            <button type="button" @click="removeAlergia(index)">✖</button>
          </li>
        </ul>
      </div>

      <!-- Tipo de Sangre -->
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

      <!-- Condiciones Sistémicas -->
      <div class="form-group">
        <label>Condiciones Sistémicas:</label>
        <input v-model="condicion" @keyup.enter.prevent="addCondicion" placeholder="Presione Enter para agregar" />
        <ul>
          <li v-for="(item, index) in form.condiciones" :key="index">
            {{ item }}
            <button type="button" @click="removeCondicion(index)">✖</button>
          </li>
        </ul>
      </div>

      <!-- Botón de guardar -->
      <div class="form-actions">
        <button type="submit">💾 Guardar Historia Médica</button>
      </div>
    </form>
  </section>
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

// Métodos para añadir y eliminar
function addEnfermedad() {
  if (enfermedad.value.trim()) {
    form.value.enfermedades.push(enfermedad.value.trim());
    enfermedad.value = '';
  }
}
function removeEnfermedad(index: number) {
  form.value.enfermedades.splice(index, 1);
}

function addMedicamento() {
  if (medicamento.value.trim()) {
    form.value.medicamentos.push(medicamento.value.trim());
    medicamento.value = '';
  }
}
function removeMedicamento(index: number) {
  form.value.medicamentos.splice(index, 1);
}

function addAlergia() {
  if (alergia.value.trim()) {
    form.value.alergias.push(alergia.value.trim());
    alergia.value = '';
  }
}
function removeAlergia(index: number) {
  form.value.alergias.splice(index, 1);
}

function addCondicion() {
  if (condicion.value.trim()) {
    form.value.condiciones.push(condicion.value.trim());
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
  alert('✅ Historia médica registrada correctamente');
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
.medical-screening {
  max-width: 700px;
  margin: auto;
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}
.form-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.form-group {
  display: flex;
  flex-direction: column;
}
input, select, textarea {
  padding: 0.6rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}
ul {
  margin-top: 0.5rem;
  padding-left: 1.2rem;
}
ul li {
  list-style-type: disc;
  margin-bottom: 0.3rem;
}
ul li button {
  margin-left: 0.5rem;
  background-color: transparent;
  border: none;
  color: #d9534f;
  cursor: pointer;
}
button[type="submit"] {
  align-self: center;
  padding: 0.7rem 1.5rem;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>
