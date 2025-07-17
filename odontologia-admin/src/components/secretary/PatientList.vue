<!-- Página: Gestión de Pacientes – Componente PatientList.vue -->
<template>
  <div class="patient-list">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3>Listado de Pacientes</h3>
      <input
        v-model="searchTerm"
        type="text"
        class="form-control w-50"
        placeholder="Buscar por nombre o cédula..."
      />
    </div>

    <table class="table table-bordered table-hover">
      <thead class="table-light">
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Cédula</th>
          <th>Cantón</th>
          <th>Contacto</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in filteredPatients" :key="p.id">
          <td>{{ p.id }}</td>
          <td>{{ p.nombre }}</td>
          <td>{{ p.cedula }}</td>
          <td>{{ p.canton }}</td>
          <td>{{ p.contacto }}</td>
          <td>
            <button class="btn btn-sm btn-outline-primary me-1" @click="$emit('edit', p)">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" @click="$emit('delete', p.id)">
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
        <tr v-if="!filteredPatients.length">
          <td colspan="6" class="text-center text-muted">No se encontraron pacientes.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Patient } from '../../mocks/secretary/patients'

const props = defineProps<{ patients: Patient[] }>()
defineEmits<{ (e: 'edit', patient: Patient): void; (e: 'delete', id: number): void }>()

const searchTerm = ref('')

const filteredPatients = computed(() => {
  return props.patients.filter(p =>
    p.nombre.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    p.cedula.includes(searchTerm.value)
  )
})
</script>

<style scoped src="@/assets/css/pages/secretary/PatientList.css"></style>
