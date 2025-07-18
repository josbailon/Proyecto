<!-- src/components/secretary/PatientForm.vue -->
<template>
  <form @submit.prevent="submitForm" class="patient-form">
    <div class="row">
      <div class="col-md-6 mb-3">
        <label>Nombre completo</label>
        <input v-model="form.nombre" type="text" class="form-control" required />
      </div>
      <div class="col-md-6 mb-3">
        <label>Cédula</label>
        <input v-model="form.cedula" type="text" class="form-control" required />
      </div>
      <div class="col-md-6 mb-3">
        <label>Cantón</label>
        <input v-model="form.canton" type="text" class="form-control" />
      </div>
      <div class="col-md-6 mb-3">
        <label>Parroquia</label>
        <input v-model="form.parroquia" type="text" class="form-control" />
      </div>
      <div class="col-md-6 mb-3">
        <label>Contacto</label>
        <input v-model="form.contacto" type="text" class="form-control" required />
      </div>
      <div class="col-md-6 mb-3">
        <label>Teléfono</label>
        <input v-model="form.telefono" type="text" class="form-control" />
      </div>
      <div class="col-md-6 mb-3">
        <label>Tipo de sangre</label>
        <input v-model="form.tipoSangre" type="text" class="form-control" />
      </div>

      <div class="col-md-6 mb-3">
        <label>Condiciones</label>
        <input v-model="form.condicionesString" type="text" class="form-control" placeholder="Ej: diabetes, hipertensión" />
      </div>
      <div class="col-md-6 mb-3">
        <label>Enfermedades</label>
        <input v-model="form.enfermedadesString" type="text" class="form-control" placeholder="Separadas por coma" />
      </div>
      <div class="col-md-6 mb-3">
        <label>Medicamentos</label>
        <input v-model="form.medicamentosString" type="text" class="form-control" placeholder="Separados por coma" />
      </div>
      <div class="col-md-6 mb-3">
        <label>Alergias</label>
        <input v-model="form.alergiasString" type="text" class="form-control" placeholder="Separadas por coma" />
      </div>
    </div>

    <div class="d-flex justify-content-end gap-2 mt-3">
      <button type="submit" class="btn btn-success">Guardar</button>
      <button type="button" class="btn btn-secondary" @click="$emit('cancel')">Cancelar</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'

const props = defineProps<{
  modelValue: any;
  editMode: boolean;
}>()

const emit = defineEmits(['save', 'cancel'])

const form = reactive({
  id: undefined,
  nombre: '',
  cedula: '',
  canton: '',
  parroquia: '',
  contacto: '',
  telefono: '',
  tipoSangre: '',
  condicionesString: '',
  enfermedadesString: '',
  medicamentosString: '',
  alergiasString: '',
})

watch(() => props.modelValue, val => {
  Object.assign(form, val, {
    condicionesString: (val?.condiciones || []).join(', '),
    enfermedadesString: (val?.enfermedades || []).join(', '),
    medicamentosString: (val?.medicamentos || []).join(', '),
    alergiasString: (val?.alergias || []).join(', ')
  })
}, { immediate: true })

function submitForm() {
  const payload = {
    ...form,
    condiciones: form.condicionesString.split(',').map(s => s.trim()).filter(Boolean),
    enfermedades: form.enfermedadesString.split(',').map(s => s.trim()).filter(Boolean),
    medicamentos: form.medicamentosString.split(',').map(s => s.trim()).filter(Boolean),
    alergias: form.alergiasString.split(',').map(s => s.trim()).filter(Boolean),
    createdAt: props.modelValue?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  emit('save', payload)
}
</script>

<style scoped src="@/assets/css/pages/secretary/PatientForm.css"></style>
