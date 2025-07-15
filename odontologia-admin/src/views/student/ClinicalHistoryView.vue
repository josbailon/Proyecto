<!-- src/components/student/ClinicalHistoryForm.vue -->
<template>
  <div class="history-form card mb-4">
    <div class="card-body">
      <h5 class="card-title mb-3">
        {{ isEdit ? 'Editar Historia Clínica' : 'Nueva Historia Clínica' }}
      </h5>
      <form @submit.prevent="onSubmit" novalidate>
        <!-- Patient ID -->
        <div class="mb-3">
          <label class="form-label">ID de Paciente</label>
          <input
            v-model.number="form.patientId"
            type="number"
            class="form-control"
            required
            :disabled="loading"
          />
        </div>

        <!-- General Data -->
        <div class="mb-3">
          <label class="form-label">Datos Generales</label>
          <textarea
            v-model="form.generalData"
            class="form-control"
            rows="2"
            required
            :disabled="loading"
          ></textarea>
        </div>

        <!-- Dental History -->
        <div class="mb-3">
          <label class="form-label">Historial Dental</label>
          <textarea
            v-model="form.dentalHistory"
            class="form-control"
            rows="2"
            required
            :disabled="loading"
          ></textarea>
        </div>

        <!-- Intraoral Findings -->
        <div class="mb-3">
          <label class="form-label">Hallazgos Intraorales</label>
          <textarea
            v-model="form.intraoralFindings"
            class="form-control"
            rows="2"
            required
            :disabled="loading"
          ></textarea>
        </div>

        <!-- Allergies & Medications -->
        <div class="row mb-3">
          <div class="col">
            <label class="form-label">Alergias (separadas por coma)</label>
            <input
              v-model="form.allergiesRaw"
              type="text"
              class="form-control"
              placeholder="p.ej. Penicilina, Aspirina"
              :disabled="loading"
            />
          </div>
          <div class="col">
            <label class="form-label">Medicamentos (separados por coma)</label>
            <input
              v-model="form.medicationsRaw"
              type="text"
              class="form-control"
              placeholder="p.ej. Ibuprofeno, Paracetamol"
              :disabled="loading"
            />
          </div>
        </div>

        <!-- Systemic History -->
        <div class="mb-3">
          <label class="form-label">Historial Sistémico</label>
          <textarea
            v-model="form.systemicHistory"
            class="form-control"
            rows="2"
            required
            :disabled="loading"
          ></textarea>
        </div>

        <!-- Botones -->
        <div class="d-flex justify-content-end">
          <button
            type="button"
            class="btn btn-secondary me-2"
            @click="onCancel"
            :disabled="loading"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="loading"
          >
            <span v-if="!loading">
              {{ isEdit ? 'Guardar Cambios' : 'Crear Historia' }}
            </span>
            <span v-else><i class="fas fa-spinner fa-spin"></i></span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, watch, ref } from 'vue'
import type { ClinicalHistory } from '../../mocks/api'
import { saveHistoryMock } from '../../mocks/api'

const props = defineProps<{ history?: ClinicalHistory }>()
const emit = defineEmits<{
  (e: 'saved', h: ClinicalHistory): void
  (e: 'cancel'): void
}>()

// Estado del formulario
const form = reactive({
  id: undefined as number | undefined,
  patientId: 0,
  generalData: '',
  dentalHistory: '',
  intraoralFindings: '',
  allergiesRaw: '',
  medicationsRaw: '',
  systemicHistory: '',
})
const loading = ref(false)

// ¿Estamos editando?
const isEdit = computed(() => !!props.history)

// Cuando cambie `props.history`, rellenamos o reseteamos
watch(
  () => props.history,
  (h) => {
    if (h) {
      form.id = h.id
      form.patientId = h.patientId
      form.generalData = h.generalData
      form.dentalHistory = h.dentalHistory
      form.intraoralFindings = h.intraoralFindings
      form.allergiesRaw = h.allergies.join(', ')
      form.medicationsRaw = h.medications.join(', ')
      form.systemicHistory = h.systemicHistory
    } else {
      resetForm()
    }
  },
  { immediate: true }
)

function resetForm() {
  form.id = undefined
  form.patientId = 0
  form.generalData = ''
  form.dentalHistory = ''
  form.intraoralFindings = ''
  form.allergiesRaw = ''
  form.medicationsRaw = ''
  form.systemicHistory = ''
}

async function onSubmit() {
  loading.value = true
  try {
    const payload: ClinicalHistory = {
      id: form.id || 0,
      patientId: form.patientId,
      generalData: form.generalData,
      dentalHistory: form.dentalHistory,
      intraoralFindings: form.intraoralFindings,
      allergies: form.allergiesRaw
        .split(',')
        .map(s => s.trim())
        .filter(s => s),
      medications: form.medicationsRaw
        .split(',')
        .map(s => s.trim())
        .filter(s => s),
      systemicHistory: form.systemicHistory,
      createdAt: '',
      updatedAt: '',
    }
    const saved = await saveHistoryMock(payload)
    emit('saved', saved)
  } catch (e: any) {
    alert(e.message || 'Error al guardar')
  } finally {
    loading.value = false
  }
}

function onCancel() {
  emit('cancel')
}
</script>

<style scoped>
.history-form .card-title {
  color: #0d6efd;
}
.history-form .form-label {
  font-weight: 500;
}
.history-form .btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
}
.history-form .btn-primary:hover {
  background-color: #0b5ed7;
  border-color: #0a58ca;
}
.history-form .btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}
.history-form .btn-secondary:hover {
  background-color: #5c636a;
  border-color: #565e64;
}
</style>
