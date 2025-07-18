<template>
  <div class="patient-management-view">
    <div class="tabs">
      <button @click="activeTab = 'list'">📋 Lista de Pacientes</button>
      <button @click="activeTab = 'register'">➕ Registrar Paciente</button>
      <button @click="activeTab = 'search'">🔍 Buscar Paciente</button>
    </div>

    <div class="tab-content">
      <div v-if="activeTab === 'list'">
        <h2>Lista de Pacientes</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cédula</th>
              <th>Cantón</th>
              <th>Contacto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in patients" :key="p.id">
              <td>{{ p.nombre }}</td>
              <td>{{ p.cedula }}</td>
              <td>{{ p.canton }}</td>
              <td>{{ p.contacto }}</td>
              <td><button @click="edit(p)">Editar</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else-if="activeTab === 'register'">
        <h2>Registrar Nuevo Paciente</h2>
        <form @submit.prevent="addPatient">
          <input v-model="form.nombre" placeholder="Nombre" required />
          <input v-model="form.cedula" placeholder="Cédula" required />
          <input v-model="form.canton" placeholder="Cantón" required />
          <input v-model="form.contacto" placeholder="Contacto" required />
          <button type="submit">Guardar</button>
        </form>
      </div>

      <div v-else-if="activeTab === 'search'">
        <h2>Buscar Paciente</h2>
        <input v-model="search" placeholder="Nombre o Cédula" />
        <ul>
          <li v-for="p in filteredPatients" :key="p.id">
            {{ p.nombre }} - {{ p.cedula }} - {{ p.canton }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('list')

const patients = ref([
  { id: 101, nombre: 'Juan Pérez', cedula: '1305482991', canton: 'Manta', contacto: '0991234567' },
  { id: 102, nombre: 'María Gómez', cedula: '1305482992', canton: 'Portoviejo', contacto: '0987654321' },
  { id: 103, nombre: 'Carlos Zambrano', cedula: '1305482993', canton: 'Chone', contacto: '0971112233' }
])

const form = ref({ nombre: '', cedula: '', canton: '', contacto: '' })

function addPatient() {
  const nuevo = { id: Date.now(), ...form.value }
  patients.value.push(nuevo)
  form.value = { nombre: '', cedula: '', canton: '', contacto: '' }
  activeTab.value = 'list'
}

function edit(paciente) {
  alert(`Editar paciente: ${paciente.nombre}`)
}

const search = ref('')
const filteredPatients = computed(() =>
  patients.value.filter(p =>
    p.nombre.toLowerCase().includes(search.value.toLowerCase()) ||
    p.cedula.includes(search.value)
  )
)
</script>

<style scoped>
.patient-management-view {
  padding: 1.5rem;
  font-family: 'Segoe UI', sans-serif;
}
.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
.tabs button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #1976d2;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
.tabs button:hover {
  background-color: #0d47a1;
}
.tab-content {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 10px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
table th, table td {
  padding: 0.75rem;
  border: 1px solid #ccc;
}
table th {
  background-color: #e3f2fd;
}
form input {
  display: block;
  width: 100%;
  margin-bottom: 0.75rem;
  padding: 0.5rem;
  border: 1px solid #bbb;
  border-radius: 5px;
}
form button {
  padding: 0.5rem 1rem;
  background: #2e7d32;
  color: white;
  border: none;
  border-radius: 5px;
}
</style>
