<!-- src/components/admin/UserForm.vue -->

<template>
  <form @submit.prevent="onSave" class="row g-3">
    <div class="col-12 col-md-6">
      <label class="form-label">Nombre</label>
      <input v-model="local.nombre" type="text" class="form-control" required />
    </div>
    <div class="col-12 col-md-6">
      <label class="form-label">Email</label>
      <input v-model="local.email" type="email" class="form-control" required />
    </div>
    <div class="col-12 col-md-6">
      <label class="form-label">Rol</label>
      <select v-model="local.role" class="form-select" required>
        <option disabled value="">Selecciona...</option>
        <option value="admin">Admin</option>
        <option value="estudiante">Estudiante</option>
        <option value="profesor">Profesor</option>
        <option value="secretario">Secretario</option>
        <option value="paciente">Paciente</option>
      </select>
    </div>

    <!-- Solo estudiantes -->
    <div v-if="local.role === 'estudiante'" class="col-12 col-md-6">
      <label class="form-label">Especialidad</label>
      <input v-model="local.especialidad" type="text" class="form-control" />
    </div>

    <!-- Solo pacientes -->
    <div v-if="local.role === 'paciente'" class="col-12">
      <label class="form-label">Historial Médico</label>
      <textarea v-model="local.historial" class="form-control"></textarea>
    </div>

    <div class="col-12 d-flex justify-content-end mt-3">
      <button type="button" class="btn btn-secondary me-2" @click="$emit('cancel')">
        Cancelar
      </button>
      <button type="submit" class="btn btn-primary">
        {{ editMode ? 'Actualizar' : 'Crear' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { User } from '../../mocks/admin/user';

// Extiende User con posibles campos extra
interface FormUser extends Partial<User> {
  especialidad?: string;
  historial?: string;
}

const props = defineProps<{
  modelValue: FormUser;
  editMode: boolean;
}>();

const emit = defineEmits<{
  (e: 'save', data: FormUser): void;
  (e: 'cancel'): void;
}>();

const local = ref<FormUser>({ ...props.modelValue });

watch(() => props.modelValue, v => (local.value = { ...v }));

function onSave() {
  emit('save', { ...local.value });
}
</script>

<style scoped>
.form-label {
  font-weight: 500;
}
</style>
