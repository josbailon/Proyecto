      <!-- src/views/student/DatosFiliacionView.vue -->
<template>
  <div class="oral-history-page">
    <h1>Historia Clínica de Cirugía Oral</h1>
    <form class="oral-history-form" @submit.prevent="handleSubmit">
      <!-- I. Datos de Filiación -->
      <fieldset>
        <legend>I. Datos de Filiación</legend>
        <div class="form-row">
          <div class="form-group">
            <label for="recordNumber">Número de HC / Cédula del paciente</label>
            <input v-model="form.recordNumber" id="recordNumber" type="text" required />
          </div>
          <div class="form-group">
            <label for="name">Nombre del paciente</label>
            <input v-model="form.name" id="name" type="text" required />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group small">
            <label for="age">Edad</label>
            <input v-model="form.age" id="age" type="number" min="0" @change="calculateBirthYear" />
          </div>
          <div class="form-group small">
            <label for="gender">Sexo</label>
            <select v-model="form.gender" id="gender" required>
              <option disabled value="">Seleccione</option>
              <option>Masculino</option>
              <option>Femenino</option>
              <option>Otro</option>
              <option>Prefiero no decir</option>
            </select>
          </div>
          <div class="form-group medium">
            <label for="civilStatus">Estado civil</label>
            <select v-model="form.civilStatus" id="civilStatus">
              <option value="">Seleccione</option>
              <option>Soltero/a</option>
              <option>Casado/a</option>
              <option>Divorciado/a</option>
              <option>Viudo/a</option>
              <option>Unión libre</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group medium">
            <label for="birthDate">Fecha de nacimiento</label>
            <input v-model="form.birthDate" id="birthDate" type="date" @change="calculateAge" />
          </div>
          <div class="form-group">
            <label for="idNumber">Cédula</label>
            <input v-model="form.idNumber" id="idNumber" type="text" @input="formatIdNumber" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="nationality">Nacionalidad</label>
            <input v-model="form.nationality" id="nationality" type="text" list="nationalities" />
            <datalist id="nationalities">
              <option>Ecuatoriana</option>
              <option>Colombiana</option>
              <option>Peruana</option>
              <option>Venezolana</option>
              <option>Estadounidense</option>
              <option>Española</option>
            </datalist>
          </div>
          <div class="form-group">
            <label for="institution">Institución o empresa</label>
            <input v-model="form.institution" id="institution" type="text" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="occupation">Ocupación o cargo</label>
            <input v-model="form.occupation" id="occupation" type="text" list="occupations" />
            <datalist id="occupations">
              <option>Estudiante</option>
              <option>Médico</option>
              <option>Ingeniero</option>
              <option>Docente</option>
              <option>Administrativo</option>
              <option>Técnico</option>
            </datalist>
          </div>
          <div class="form-group">
            <label for="phone">Teléfono</label>
            <input v-model="form.phone" id="phone" type="tel" @input="formatPhone" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input v-model="form.email" id="email" type="email" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group wide">
            <label for="address">Domicilio</label>
            <input v-model="form.address" id="address" type="text" />
          </div>
        </div>
        <div class="form-row switches">
          <div class="switch-group">
            <label>Grupo Prioritario:</label>
            <input type="checkbox" v-model="form.priorityGroup" id="priorityGroup" />
            <span>{{ form.priorityGroup ? "Sí" : "No" }}</span>
          </div>
          <div class="switch-group">
            <label>Discapacidad:</label>
            <input type="checkbox" v-model="form.disability" id="disability" />
            <span>{{ form.disability ? "Sí" : "No" }}</span>
          </div>
          <div class="switch-group">
            <label>Embarazada:</label>
            <input 
              type="checkbox" 
              v-model="form.pregnant" 
              id="pregnant" 
              :disabled="form.gender !== 'Femenino' || parseInt(form.age) < 12 || parseInt(form.age) > 55"
            />
            <span>{{ form.pregnant ? "Sí" : "No" }}</span>
          </div>
          <div class="switch-group">
            <label>Enf. Catastrófica:</label>
            <input type="checkbox" v-model="form.catastrophic" id="catastrophic" />
            <span>{{ form.catastrophic ? "Sí" : "No" }}</span>
          </div>
          <div class="switch-group">
            <label>Persona privada de la libertad:</label>
            <input type="checkbox" v-model="form.ppl" id="ppl" />
            <span>{{ form.ppl ? "Sí" : "No" }}</span>
          </div>
          <div class="switch-group">
            <label>Otros:</label>
            <input type="checkbox" v-model="form.others" id="others" />
            <span>{{ form.others ? "Sí" : "No" }}</span>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>Datos del Representante Legal</legend>
        <div class="form-row">
          <div class="form-group">
            <label for="representativeName">Nombre del representante</label>
            <input v-model="form.representativeName" id="representativeName" type="text" :required="isMinor" />
          </div>
          <div class="form-group">
            <label for="relationship">Relación / Parentesco</label>
            <select v-model="form.relationship" id="relationship" :required="isMinor">
              <option value="">Seleccione</option>
              <option>Padre</option>
              <option>Madre</option>
              <option>Tutor</option>
              <option>Hermano/a</option>
              <option>Abuelo/a</option>
              <option>Otro familiar</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="repIdNumber">Cédula del representante</label>
            <input v-model="form.repIdNumber" id="repIdNumber" type="text" @input="formatRepIdNumber" :required="isMinor" />
          </div>
          <div class="form-group">
            <label for="repPhone">Teléfono del representante</label>
            <input v-model="form.repPhone" id="repPhone" type="tel" @input="formatRepPhone" :required="isMinor" />
          </div>
        </div>
      </fieldset>
      
      <div class="form-actions">
        <button type="button" class="btn-secondary" @click="resetForm">Limpiar formulario</button>
        <button type="submit" class="btn-primary">Guardar Historia Clínica</button>
      </div>
    </form>
    
    <!-- Notificación -->
    <div v-if="showNotification" class="notification" :class="notificationType">
      {{ notificationMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue'

interface FormData {
  recordNumber: string
  name: string
  age: string
  gender: string
  civilStatus: string
  birthDate: string
  idNumber: string
  nationality: string
  institution: string
  occupation: string
  phone: string
  email: string
  address: string
  priorityGroup: boolean
  disability: boolean
  pregnant: boolean
  catastrophic: boolean
  ppl: boolean
  others: boolean
  representativeName: string
  relationship: string
  repIdNumber: string
  repPhone: string
}

const form = reactive<FormData>({
  recordNumber: "",
  name: "",
  age: "",
  gender: "",
  civilStatus: "",
  birthDate: "",
  idNumber: "",
  nationality: "",
  institution: "",
  occupation: "",
  phone: "",
  email: "",
  address: "",
  priorityGroup: false,
  disability: false,
  pregnant: false,
  catastrophic: false,
  ppl: false,
  others: false,
  representativeName: "",
  relationship: "",
  repIdNumber: "",
  repPhone: "",
})

const showNotification = ref(false)
const notificationMessage = ref("")
const notificationType = ref<"success" | "error" | "info">("success")

const isMinor = computed(() => {
  return parseInt(form.age) < 18 && form.age !== ""
})

function calculateAge() {
  if (form.birthDate) {
    const birthDate = new Date(form.birthDate)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    form.age = age.toString()
  }
}

function calculateBirthYear() {
  if (form.age) {
    const currentYear = new Date().getFullYear()
    const birthYear = currentYear - parseInt(form.age)
    form.birthDate = `${birthYear}-01-01` // Aproximación
  }
}

function formatIdNumber() {
  // Formatear cédula según el país (ejemplo para Ecuador)
  form.idNumber = form.idNumber.replace(/[^\d]/g, '')
  if (form.idNumber.length > 10) {
    form.idNumber = form.idNumber.substring(0, 10)
  }
}

function formatRepIdNumber() {
  form.repIdNumber = form.repIdNumber.replace(/[^\d]/g, '')
  if (form.repIdNumber.length > 10) {
    form.repIdNumber = form.repIdNumber.substring(0, 10)
  }
}

function formatPhone() {
  // Formatear número de teléfono
  form.phone = form.phone.replace(/[^\d]/g, '')
  if (form.phone.length > 10) {
    form.phone = form.phone.substring(0, 10)
  }
}

function formatRepPhone() {
  form.repPhone = form.repPhone.replace(/[^\d]/g, '')
  if (form.repPhone.length > 10) {
    form.repPhone = form.repPhone.substring(0, 10)
  }
}

function resetForm() {
  const defaultValues: FormData = {
    recordNumber: "",
    name: "",
    age: "",
    gender: "",
    civilStatus: "",
    birthDate: "",
    idNumber: "",
    nationality: "",
    institution: "",
    occupation: "",
    phone: "",
    email: "",
    address: "",
    priorityGroup: false,
    disability: false,
    pregnant: false,
    catastrophic: false,
    ppl: false,
    others: false,
    representativeName: "",
    relationship: "",
    repIdNumber: "",
    repPhone: "",
  }
  
  Object.assign(form, defaultValues)
  
  showNotification.value = true
  notificationMessage.value = "Formulario limpiado correctamente"
  notificationType.value = "info"
  setTimeout(() => {
    showNotification.value = false
  }, 3000)
}

function handleSubmit() {
  // Validaciones adicionales
  if (!form.recordNumber || !form.name || !form.gender) {
    showNotification.value = true
    notificationMessage.value = "Por favor complete los campos requeridos"
    notificationType.value = "error"
    setTimeout(() => {
      showNotification.value = false
    }, 3000)
    return
  }

  if (isMinor.value && (!form.representativeName || !form.relationship || !form.repIdNumber)) {
    showNotification.value = true
    notificationMessage.value = "Para menores de edad, complete los datos del representante"
    notificationType.value = "error"
    setTimeout(() => {
      showNotification.value = false
    }, 3000)
    return
  }

  // Aquí puedes enviar el formulario a tu backend o almacenarlo
  console.log("Datos del formulario:", form)
  
  showNotification.value = true
  notificationMessage.value = "Historia clínica guardada correctamente"
  notificationType.value = "success"
  setTimeout(() => {
    showNotification.value = false
  }, 3000)
  
  // Opcional: Guardar en localStorage
  localStorage.setItem('oralHistoryData', JSON.stringify(form))
}
</script>

<style scoped>
.oral-history-page {
  max-width: 830px;
  margin: 2rem auto 0 auto;
  padding: 2.2rem 1.5rem 1.5rem 1.5rem;
  background: #fff;
  border-radius: 1.6rem;
  box-shadow: 0 8px 32px 0 rgba(30, 58, 138, 0.10);
  position: relative;
}
.oral-history-page h1 {
  font-size: 2.1rem;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 2.5rem;
  text-align: center;
  letter-spacing: 0.4px;
}

.oral-history-form {
  display: flex;
  flex-direction: column;
  gap: 2.3rem;
}
fieldset {
  border: none;
  border-radius: 1rem;
  padding: 1.3rem 1rem 1rem 1rem;
  margin: 0;
  background: #f8fafc;
  box-shadow: 0 1px 10px 0 rgba(46, 125, 50, 0.04);
}
legend {
  font-weight: bold;
  color: #2e7d32;
  font-size: 1.07rem;
  margin-bottom: 1.2rem;
  letter-spacing: 0.2px;
}

.form-row {
  display: flex;
  gap: 1.2rem;
  margin-bottom: 1.1rem;
  flex-wrap: wrap;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 180px;
  position: relative;
}
.form-group.small {
  max-width: 90px;
}
.form-group.medium {
  max-width: 200px;
}
.form-group.wide {
  flex: 2;
  min-width: 260px;
}
label {
  font-weight: 500;
  color: #1e3a8a;
  margin-bottom: 0.25rem;
  font-size: 0.99rem;
}
input, select {
  padding: 0.49rem 0.7rem;
  border: 1.6px solid #c8e6c9;
  border-radius: 0.45rem;
  font-size: 1rem;
  background: #fff;
  color: #1e3a8a;
  outline: none;
  transition: border-color 0.19s;
}
input:focus, select:focus {
  border-color: #2e7d32;
}
input:invalid {
  border-color: #ff5252;
}
input[disabled] {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.form-row.switches {
  gap: 1.2rem;
  margin-top: 1.2rem;
  flex-wrap: wrap;
}
.switch-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #e8f5e9;
  padding: 0.3rem 0.85rem;
  border-radius: 0.6rem;
  font-size: 0.99rem;
  color: #1e3a8a;
}
.switch-group input[type="checkbox"] {
  accent-color: #2e7d32;
  width: 19px;
  height: 19px;
  cursor: pointer;
}

.form-actions {
  display: flex;
  justify-content: space-between;
}
.btn-primary {
  background: #2e7d32;
  color: #fff;
  font-size: 1.11rem;
  font-weight: bold;
  padding: 0.85rem 2.4rem;
  border: none;
  border-radius: 0.6rem;
  box-shadow: 0 2px 10px #2e7d3230;
  cursor: pointer;
  letter-spacing: 0.5px;
  transition: all 0.17s;
}
.btn-primary:hover {
  background: #388e3c;
  transform: translateY(-1px);
}
.btn-secondary {
  background: #f5f5f5;
  color: #1e3a8a;
  font-size: 1.11rem;
  font-weight: bold;
  padding: 0.85rem 2.4rem;
  border: 1px solid #ddd;
  border-radius: 0.6rem;
  cursor: pointer;
  letter-spacing: 0.5px;
  transition: all 0.17s;
}
.btn-secondary:hover {
  background: #e0e0e0;
  transform: translateY(-1px);
}

.notification {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: fadeInOut 3s ease-in-out;
}
.notification.success {
  background: #4caf50;
  color: white;
}
.notification.error {
  background: #f44336;
  color: white;
}
.notification.info {
  background: #2196f3;
  color: white;
}

@keyframes fadeInOut {
  0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
  10% { opacity: 1; transform: translateX(-50%) translateY(0); }
  90% { opacity: 1; transform: translateX(-50%) translateY(0); }
  100% { opacity: 0; transform: translateX(-50%) translateY(20px); }
}

@media (max-width: 700px) {
  .oral-history-page {
    padding: 0.7rem 0.18rem;
    border-radius: 0.7rem;
  }
  .form-row {
    flex-direction: column;
    gap: 0.6rem;
    margin-bottom: 0.8rem;
  }
  .form-group,
  .form-group.small,
  .form-group.medium,
  .form-group.wide {
    min-width: unset;
    max-width: unset;
    width: 100%;
  }
  .form-row.switches {
    flex-direction: column;
    gap: 0.3rem;
  }
  .form-actions {
    flex-direction: column-reverse;
    gap: 1rem;
  }
  .btn-primary, .btn-secondary {
    width: 100%;
    padding: 0.85rem 1rem;
  }
}
</style>