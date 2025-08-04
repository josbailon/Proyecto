<!-- src/views/student/TratamientoView.vue -->
<template>
  <div class="treatment-container">
    <!-- Encabezado -->
    <div class="header">
      <h1>REGISTRO DE TRATAMIENTO ODONTOLÓGICO</h1>
      <div class="patient-info">
        <span><strong>Paciente:</strong> {{ patient.name }}</span>
        <span><strong>ID:</strong> {{ patient.id }}</span>
        <span><strong>Fecha:</strong> {{ currentDate }}</span>
      </div>
    </div>

    <!-- Sección III: Motivo de Consulta -->
    <section class="section">
      <h2>III. MOTIVO DE CONSULTA</h2>
      <textarea 
        v-model="form.consultReason" 
        class="form-control"
        placeholder="Transcribir textualmente lo que menciona el paciente">
      </textarea>
    </section>

    <!-- Sección IV: Enfermedad Actual -->
    <section class="section">
      <h2>IV. ENFERMEDAD ACTUAL</h2>
      <textarea
        v-model="form.currentIllness"
        class="form-control"
        placeholder="Sexo, edad, Relato cronológico de los signos y síntomas, si presenta dolor especificar desde cuando, intensidad, evolución, ubicación, tipo y si ha tomado medicación previa y el porque acude a clínicas de odontología">
      </textarea>
    </section>

    <!-- Sección III: Examen Físico -->
    <section class="section">
      <h2>III. EXAMEN FÍSICO</h2>
      
      <div class="subsection">
        <h3>Examen físico general</h3>
        <div class="row">
          <div class="col">
            <label>Peso (kg)</label>
            <input type="number" v-model.number="form.physicalExam.weight" class="form-control">
          </div>
          <div class="col">
            <label>Talla (cm)</label>
            <input type="number" v-model.number="form.physicalExam.height" class="form-control">
          </div>
        </div>
        
        <div class="form-group">
          <label>Facies</label>
          <input type="text" v-model="form.physicalExam.facies" class="form-control">
        </div>
        
        <div class="form-group">
          <label>Marcha</label>
          <input type="text" v-model="form.physicalExam.gait" class="form-control">
        </div>
        
        <div class="form-group">
          <label>Piel y mucosas</label>
          <input type="text" v-model="form.physicalExam.skinMucous" class="form-control">
        </div>
      </div>
      
      <div class="subsection">
        <h3>Examen físico regional</h3>
        <div class="form-group">
          <label>Cráneo</label>
          <input type="text" v-model="form.regionalExam.skull" class="form-control">
        </div>
        
        <div class="form-group">
          <label>Cara y Cuello (Simetrías, perfil, piel, cadenas ganglionares, tiroides, glándulas salivales)</label>
          <textarea v-model="form.regionalExam.faceNeck" class="form-control"></textarea>
        </div>
        
        <div class="form-group">
          <label>ATM (Dolor, chasquido, luxación, desviación, apertura bucal)</label>
          <input type="text" v-model="form.regionalExam.atm" class="form-control">
        </div>
      </div>
      
      <!-- Topografía de Mucosa Oral -->
      <div class="subsection">
        <h3>Examen físico bucal</h3>
        <div class="tool-buttons">
          <button @click="openMucosaOralPage" class="btn btn-tool">
            <i class="fas fa-external-link-alt"></i> Abrir Topografía de Mucosa Oral 
          </button>
        </div>
        <TopografiaMucosaOral ref="mucosaComponent" />
      </div>
    </section>

    <!-- Odontograma -->
    <section class="section">
      <h2>ODONTOGRAMA</h2>
      <div class="tool-buttons">
        <button @click="openOdontogramaPage" class="btn btn-tool">
          <i class="fas fa-external-link-alt"></i> Abrir Odontograma
        </button>
      </div>
      <OdontogramView ref="odontogramComponent" />
    </section>

    <!-- Estudios Complementarios -->
    <section class="section">
      <h2>IV. ESTUDIOS COMPLEMENTARIOS</h2>
      <div class="checkbox-group">
        <div v-for="study in complementaryStudies" :key="study.id" class="form-check">
          <input 
            type="checkbox" 
            v-model="form.complementaryStudies[study.id]"
            :id="'study-'+study.id"
            class="form-check-input">
          <label :for="'study-'+study.id" class="form-check-label">{{ study.label }}</label>
        </div>
      </div>
      <div class="form-group">
        <label>Otro</label>
        <input type="text" v-model="form.otherStudies" class="form-control">
      </div>
    </section>

    <!-- Por Atención -->
    <section class="section">
      <h2>POR ATENCIÓN</h2>
      
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Fecha y Hora</label>
            <input type="datetime-local" v-model="form.attention.dateTime" class="form-control">
          </div>
        </div>
      </div>
      
      <div class="subsection">
        <h3>Signos Vitales</h3>
        <div class="row">
          <div class="col-md-4">
            <div class="form-group">
              <label>Presión arterial (mmHg)</label>
              <input type="text" v-model="form.vitalSigns.bloodPressure" class="form-control">
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label>Frecuencia cardiaca (lpm)</label>
              <input type="number" v-model.number="form.vitalSigns.heartRate" class="form-control">
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label>Frecuencia respiratoria (rpm)</label>
              <input type="number" v-model.number="form.vitalSigns.respiratoryRate" class="form-control">
            </div>
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-4">
            <div class="form-group">
              <label>Temperatura (°C)</label>
              <input type="number" step="0.1" v-model.number="form.vitalSigns.temperature" class="form-control">
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label>Saturación de oxígeno (%)</label>
              <input type="number" v-model.number="form.vitalSigns.oxygenSaturation" class="form-control">
            </div>
          </div>
        </div>
      </div>
      
      <div class="form-group">
        <label>Diagnóstico</label>
        <input type="text" v-model="form.diagnosis.description" class="form-control">
      </div>
      
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>CIE 10</label>
            <input type="text" v-model="form.diagnosis.cie10" class="form-control">
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label>Tipo de diagnóstico</label>
            <select v-model="form.diagnosis.type" class="form-control">
              <option value="presuntivo">Presuntivo</option>
              <option value="definitivo">Definitivo</option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="form-group">
        <label>Procedimiento propuesto</label>
        <textarea v-model="form.proposedProcedure" class="form-control"></textarea>
      </div>
    </section>

    <!-- Evolución -->
    <section class="section">
      <h2>EVOLUCIÓN</h2>
      
      <div class="form-group">
        <label>Procedimiento realizado</label>
        <textarea v-model="form.evolution.procedurePerformed" class="form-control"></textarea>
      </div>
      
      <div class="subsection">
        <h3>Complicaciones</h3>
        <div class="row">
          <div class="col-md-4" v-for="comp in complications" :key="comp.id">
            <div class="form-check">
              <input 
                type="checkbox" 
                v-model="form.evolution.complications[comp.id]"
                :id="'comp-'+comp.id"
                class="form-check-input">
              <label :for="'comp-'+comp.id" class="form-check-label">{{ comp.label }}</label>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>Otros</label>
          <input type="text" v-model="form.evolution.otherComplications" class="form-control">
        </div>
      </div>
      
      <div class="form-group">
        <label>Prescripción Médica</label>
        <textarea v-model="form.prescription" class="form-control" rows="4"></textarea>
      </div>
      
      <div class="form-group">
        <label>Indicaciones postoperatorias</label>
        <textarea v-model="form.postOperativeInstructions" class="form-control" rows="3"></textarea>
      </div>
      
      <div class="form-group">
        <label>Evolución postoperatoria</label>
        <textarea v-model="form.postOperativeEvolution" class="form-control" rows="3"></textarea>
      </div>
    </section>

    <!-- Responsables -->
    <section class="section">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Elaborado por</label>
            <input type="text" v-model="form.responsibles.studentName" class="form-control">
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label>Cédula del estudiante</label>
            <input type="text" v-model="form.responsibles.studentId" class="form-control">
          </div>
        </div>
      </div>
      
      <div class="form-group">
        <label>Aprobado por</label>
        <input 
          type="text" 
          value="Od. Sierra Zambrano Juan Manuel/ 1310374119/" 
          class="form-control" 
          disabled>
      </div>
      
      <div class="form-group">
        <label>Firma</label>
        <div class="signature-pad">
          <canvas 
            ref="signaturePad" 
            width="400" 
            height="200"
            @mousedown="startDrawing"
            @mousemove="draw"
            @mouseup="stopDrawing"
            @mouseleave="stopDrawing"></canvas>
          <button @click="clearSignature" class="btn btn-sm btn-secondary mt-2">Limpiar Firma</button>
        </div>
      </div>
      
      <div class="subsection">
        <h3>RESPONSABLE DEL REGISTRO</h3>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Nombre del profesional tratante</label>
              <input type="text" v-model="form.responsibles.doctorName" class="form-control">
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>Número de cédula</label>
              <input type="text" v-model="form.responsibles.doctorId" class="form-control">
            </div>
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Código MSP</label>
              <input type="text" v-model="form.responsibles.mspCode" class="form-control">
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label>Reg. Senescyt</label>
          <input 
            type="text" 
            value="Esp. Patología y cirugía oral/ Reg. MSP Libro: 01 Folio: 162 N°: 907/ Reg. Senescyt: 1701121093" 
            class="form-control" 
            disabled>
        </div>
      </div>
    </section>

    <!-- Botones de acción -->
    <div class="action-buttons">
      <button @click="saveDraft" class="btn btn-primary">
        <i class="fas fa-save"></i> Guardar Borrador
      </button>
      <button @click="submitForm" class="btn btn-success">
        <i class="fas fa-check-circle"></i> Finalizar Tratamiento
      </button>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    
    // Datos del paciente
    const patient = reactive({
      id: 'PT-001',
      name: 'Juan Pérez'
    })

    // Estado del formulario
    const form = reactive({
      consultReason: '',
      currentIllness: '',
      physicalExam: {
        weight: null,
        height: null,
        facies: '',
        gait: '',
        skinMucous: ''
      },
      regionalExam: {
        skull: '',
        faceNeck: '',
        atm: ''
      },
      complementaryStudies: {
        imaging: false,
        paraclinical: false,
        photographic: false,
        studyModels: false,
        diagnosticWax: false
      },
      otherStudies: '',
      attention: {
        dateTime: ''
      },
      vitalSigns: {
        bloodPressure: '',
        heartRate: null,
        respiratoryRate: null,
        temperature: null,
        oxygenSaturation: null
      },
      diagnosis: {
        description: '',
        cie10: '',
        type: 'presuntivo'
      },
      proposedProcedure: '',
      evolution: {
        procedurePerformed: '',
        complications: {
          hemorrhage: false,
          allergies: false,
          fractures: false,
          acutePain: false,
          softTissue: false
        },
        otherComplications: ''
      },
      prescription: '',
      postOperativeInstructions: '',
      postOperativeEvolution: '',
      responsibles: {
        studentName: '',
        studentId: '',
        doctorName: '',
        doctorId: '',
        mspCode: ''
      }
    })

    // Referencias a componentes
    const mucosaComponent = ref(null)
    const odontogramComponent = ref(null)

    // Opciones predefinidas
    const complementaryStudies = [
      { id: 'imaging', label: 'Solicitud de estudio imagenológico' },
      { id: 'paraclinical', label: 'Solicitud de estudio paraclínicos' },
      { id: 'photographic', label: 'Solicitud de estudio fotográfico' },
      { id: 'studyModels', label: 'Solicitud de modelos de estudio' },
      { id: 'diagnosticWax', label: 'Encerado diagnóstico' }
    ]

    const complications = [
      { id: 'hemorrhage', label: 'Hemorragias' },
      { id: 'allergies', label: 'Alergias' },
      { id: 'fractures', label: 'Fracturas' },
      { id: 'acutePain', label: 'Dolor Agudo' },
      { id: 'softTissue', label: 'Lesión de tejidos blandos' }
    ]

    // Fecha actual formateada
    const currentDate = ref(new Date().toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }))

    // Lógica para el pad de firma
    const signaturePad = ref(null)
    const isDrawing = ref(false)
    const lastX = ref(0)
    const lastY = ref(0)
    let ctx = null

    onMounted(() => {
      const canvas = signaturePad.value
      ctx = canvas.getContext('2d')
      ctx.strokeStyle = '#000'
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
    })

    const startDrawing = (e) => {
      isDrawing.value = true
      const rect = signaturePad.value.getBoundingClientRect()
      lastX.value = e.clientX - rect.left
      lastY.value = e.clientY - rect.top
    }

    const draw = (e) => {
      if (!isDrawing.value) return
      
      const rect = signaturePad.value.getBoundingClientRect()
      const currentX = e.clientX - rect.left
      const currentY = e.clientY - rect.top
      
      ctx.beginPath()
      ctx.moveTo(lastX.value, lastY.value)
      ctx.lineTo(currentX, currentY)
      ctx.stroke()
      
      lastX.value = currentX
      lastY.value = currentY
    }

    const stopDrawing = () => {
      isDrawing.value = false
    }

    const clearSignature = () => {
      ctx.clearRect(0, 0, signaturePad.value.width, signaturePad.value.height)
    }

    // Métodos del formulario
    const saveDraft = () => {
      const draftData = {
        form: {...form},
        mucosa: mucosaComponent.value ? mucosaComponent.value.getData() : null,
        odontogram: odontogramComponent.value ? odontogramComponent.value.getData() : null,
        date: new Date()
      }
      
      localStorage.setItem('treatmentDraft', JSON.stringify(draftData))
      alert('Borrador guardado correctamente')
    }

    const submitForm = () => {
      // Recopilar datos de los componentes hijos
      const mucosaData = mucosaComponent.value ? mucosaComponent.value.getData() : null
      const odontogramData = odontogramComponent.value ? odontogramComponent.value.getData() : null
      
      const treatmentData = {
        patient: {...patient},
        form: {...form},
        mucosa: mucosaData,
        odontogram: odontogramData,
        date: new Date()
      }
      
      localStorage.setItem('treatmentCompleted', JSON.stringify(treatmentData))
      alert('Tratamiento finalizado y guardado')
    }

    // Métodos para abrir nuevas pestañas
    const openMucosaOralPage = () => {
      const route = router.resolve({ name: 'TopografiaMucosaOral' });
      window.open(route.href, '_blank');
    };

   const openOdontogramaPage = () => {
  const route = router.resolve({ name: 'Odontogram' }); // <-- CORREGIDO AQUÍ
  window.open(route.href, '_blank');
};

    return {
      patient,
      form,
      currentDate,
      complementaryStudies,
      complications,
      mucosaComponent,
      odontogramComponent,
      signaturePad,
      startDrawing,
      draw,
      stopDrawing,
      clearSignature,
      saveDraft,
      submitForm,
      openMucosaOralPage,
      openOdontogramaPage
    }
  }
}
</script>

<style src="@/assets/css/pages/student/TratamientoView.css" scoped></style>