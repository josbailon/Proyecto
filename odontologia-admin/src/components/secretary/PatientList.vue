<!-- Página: Gestión de Pacientes -->
<template>
  <div class="patient-list">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Cédula</th>
          <th>Contacto</th>
          <th>Cantón</th>
          <th>Parroquia</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="patient in patients" :key="patient.id">
          <td>{{ patient.nombre }}</td>
          <td>{{ patient.cedula }}</td>
          <td>{{ patient.contacto }}</td>
          <td>{{ patient.canton }}</td>
          <td>{{ patient.parroquia || '-' }}</td>
          <td>{{ patient.telefono || '-' }}</td>
          <td>
            <button class="btn btn-sm btn-outline-primary" @click="$emit('edit', patient)">
              Editar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps<{ patients: any[] }>();
defineEmits(['edit']);
</script>

<style scoped src="@/assets/css/pages/secretary/PatientList.css"></style>
