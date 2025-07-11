<!-- src/components/secretary/PatientAssignmentForm.vue -->
<template>
  <form
    @submit.prevent="onSubmit"
    :class="{ 'needs-validation': true, 'was-validated': submitted }"
    novalidate
    class="patient-assignment-form"
  >
    <!-- Sprint 5 – 2025-07-22 – Formulario de Asignación de Pacientes -->
    <h3 class="mb-4">
      {{ editMode ? 'Editar Asignación' : 'Nueva Asignación' }}
    </h3>

    <!-- Estudiante -->
    <div class="mb-3">
      <label for="student" class="form-label">Estudiante</label>
      <select
        id="student"
        v-model="form.studentId"
        class="form-select"
        required
      >
        <option value="" disabled>Seleccione un estudiante...</option>
        <option
          v-for="s in students"
          :key="s.id"
          :value="s.id"
        >
          {{ s.nombre }}
        </option>
      </select>
      <div class="invalid-feedback">
        Por favor, seleccione un estudiante.
      </div>
    </div>

    <!-- Paciente -->
    <div class="mb-3">
      <label for="patient" class="form-label">Paciente</label>
      <select
        id="patient"
        v-model="form.patientId"
        class="form-select"
        required
      >
        <option value="" disabled>Seleccione un paciente...</option>
        <option
          v-for="p in patients"
          :key="p.id"
          :value="p.id"
        >
          {{ p.nombre }}
        </option>
      </select>
      <div class="invalid-feedback">
        Por favor, seleccione un paciente.
      </div>
    </div>

    <!-- Fecha y Hora -->
    <div class="mb-3">
      <label for="assignedAt" class="form-label">Fecha y Hora</label>
      <input
        id="assignedAt"
        type="datetime-local"
        v-model="form.assignedAt"
        class="form-control"
        :min="minDateTime"
        required
      />
      <div class="invalid-feedback">
        Introduzca una fecha y hora válidas.
      </div>
    </div>

    <!-- Notas -->
    <div class="mb-4">
      <label for="notes" class="form-label">Notas (opcional)</label>
      <textarea
        id="notes"
        v-model="form.notes"
        class="form-control"
        rows="3"
        maxlength="500"
      ></textarea>
      <div class="form-text">
        Máximo 500 caracteres.
      </div>
    </div>

    <!-- Botones -->
    <div class="d-flex justify-content-end gap-2">
      <button
        type="button"
        class="btn btn-outline-secondary"
        @click="$emit('cancel')"
      >
        Cancelar
      </button>
      <button type="submit" class="btn btn-primary">
        {{ editMode ? 'Guardar Cambios' : 'Crear Asignación' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, watch, onMounted, computed } from 'vue'
import type { PatientAssignment } from '../../mocks/secretary/patientAssignments'
import { savePatientAssignmentMock } from '../../mocks/secretary/patientAssignments'
import type { User } from '../../mocks/admin/user'    // Sólo User
import { fetchUsersMock } from '../../mocks/api'       // No import Role

// Props y emisiones
const props = defineProps<{
  modelValue: Partial<PatientAssignment>
  editMode: boolean
}>()
const emit = defineEmits<{
  (e: 'save', payload: PatientAssignment): void
  (e: 'cancel'): void
}>()

// Form state
const form = reactive<Partial<PatientAssignment>>({ ...props.modelValue })
const submitted = ref(false)

// Select options
const students = ref<User[]>([])
const patients = ref<User[]>([])

onMounted(async () => {
  const users = await fetchUsersMock()
  // ¡Filtro directo con literales de cadena!
  students.value = users.filter(u => u.role === 'estudiante')
  patients.value = users.filter(u => u.role === 'paciente' as any)
})

// Cuando cambie modelValue (modo edición), refrescar form
watch(() => props.modelValue, nv => {
  Object.assign(form, nv)
})

// Fecha mínima (hoy) en formato YYYY-MM-DDThh:mm
const minDateTime = computed(() => {
  return new Date().toISOString().slice(0, 16)
})

// Submit con validación nativa
async function onSubmit() {
  submitted.value = true
  const formEl = document.querySelector(
    '.patient-assignment-form'
  ) as HTMLFormElement
  if (!formEl.checkValidity()) return

  const payload: PatientAssignment = {
    id: form.id ?? Date.now(),
    studentId: form.studentId!,
    patientId: form.patientId!,
    assignedAt: form.assignedAt!,
    notes: form.notes?.trim() || ''
  }

  await savePatientAssignmentMock(payload)
  emit('save', payload)
}
</script>

<style scoped src="../../assets/css/pages/secretary/PatientAssignment.css"></style>
