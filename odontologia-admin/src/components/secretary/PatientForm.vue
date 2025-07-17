<!-- Página: Gestión de Pacientes - Componente: Formulario de Pacientes -->
<template>
  <form
    @submit.prevent="onSubmit"
    :class="{ 'needs-validation': true, 'was-validated': submitted }"
    novalidate
    class="patient-form"
  >
    <h3 class="mb-4">{{ editMode ? 'Editar Paciente' : 'Nuevo Paciente' }}</h3>

    <div class="mb-3">
      <label for="nombre" class="form-label">Nombre y Apellidos</label>
      <input
        id="nombre"
        v-model="form.nombre"
        type="text"
        class="form-control"
        required
      />
      <div class="invalid-feedback">Este campo es obligatorio.</div>
    </div>

    <div class="mb-3">
      <label for="cedula" class="form-label">Cédula de Identidad</label>
      <input
        id="cedula"
        v-model="form.cedula"
        type="text"
        class="form-control"
        pattern="\\d{10}"
        required
      />
      <div class="invalid-feedback">Ingrese una cédula válida de 10 dígitos.</div>
    </div>

    <div class="mb-3">
      <label for="canton" class="form-label">Cantón de Residencia</label>
      <input
        id="canton"
        v-model="form.canton"
        type="text"
        class="form-control"
        required
      />
      <div class="invalid-feedback">Este campo es obligatorio.</div>
    </div>

    <div class="mb-3">
      <label for="contacto" class="form-label">Contacto (Teléfono o Email)</label>
      <input
        id="contacto"
        v-model="form.contacto"
        type="text"
        class="form-control"
        required
      />
      <div class="invalid-feedback">Ingrese un contacto válido.</div>
    </div>

    <div class="d-flex justify-content-end gap-2 mt-4">
      <button
        type="button"
        class="btn btn-outline-secondary"
        @click="$emit('cancel')"
      >
        Cancelar
      </button>
      <button type="submit" class="btn btn-primary">
        {{ editMode ? 'Guardar Cambios' : 'Crear Paciente' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';

interface Patient {
  id: number;
  nombre: string;
  cedula: string;
  canton: string;
  contacto: string;
}

const props = defineProps<{
  modelValue: Partial<Patient>;
  editMode: boolean;
}>();

const emit = defineEmits<{
  (e: 'save', value: Patient): void;
  (e: 'cancel'): void;
}>();

const submitted = ref(false);
const form = reactive<Partial<Patient>>({ ...props.modelValue });

watch(() => props.modelValue, nv => {
  Object.assign(form, nv);
});

function onSubmit() {
  submitted.value = true;
  const formEl = document.querySelector('.patient-form') as HTMLFormElement;
  if (!formEl.checkValidity()) return;

  const patient: Patient = {
    id: form.id ?? Date.now(),
    nombre: form.nombre!,
    cedula: form.cedula!,
    canton: form.canton!,
    contacto: form.contacto!
  };

  emit('save', patient);
}
</script>

<!-- Estilos para la página: Gestión de Pacientes -->
<style scoped src="@/assets/css/pages/secretary/PatientForm.css"></style>
