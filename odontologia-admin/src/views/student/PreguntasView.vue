<!--src/views/student/PreguntasView.vue-->
<template>
  <div class="medical-interview-container">
    <!-- Encabezado -->
    <header class="header-section">
      <h1 class="title">INTERROGATORIO POR APARATOS Y SISTEMAS</h1>
      <div class="patient-info">
        <div class="patient-name">Paciente: {{ paciente.nombre }}</div>
        <div class="patient-id">ID: {{ paciente.id }}</div>
        <div class="patient-age">Edad: {{ paciente.edad }}</div>
        <div class="patient-gender">Sexo: {{ paciente.sexo }}</div>
      </div>
    </header>

    <!-- Sección principal -->
    <div class="form-section">
      <!-- Motivo de consulta -->
      <div class="section">
        <h2>III. MOTIVO DE CONSULTA</h2>
        <textarea 
          v-model="motivoConsulta" 
          class="full-width-textarea"
          placeholder="Transcribir textualmente lo que menciona el paciente">
        </textarea>
      </div>

      <!-- Enfermedad actual -->
      <div class="section">
        <h2>IV. ENFERMEDAD ACTUAL</h2>
        <textarea 
          v-model="enfermedadActual" 
          class="full-width-textarea"
          placeholder="Sexo, edad, Relato cronológico de los signos y síntomas, si presenta dolor especificar desde cuando, intensidad, evolución, ubicación, tipo y si ha tomado medicación previa y el porque acude a clínicas de odontología">
        </textarea>
      </div>

      <!-- Cuestionario sistemático -->
      <div class="section">
        <h2>CUESTIONARIO SISTEMÁTICO</h2>
        
        <!-- Sección 1: Estado general -->
        <div class="subsection">
          <h3>Estado General</h3>
          <QuestionItem 
            v-for="(q, index) in preguntasGenerales" 
            :key="'gen-'+index"
            :number="q.number"
            :question="q.text"
            :has-observations="q.hasObservations"
            :observation-label="q.observationLabel"
            v-model="q.response"
            @update:observations="q.observations = $event"
          />
        </div>
        
        <!-- Sección 2: Síntomas experimentados -->
        <div class="subsection">
          <h3>¿HA EXPERIMENTADO?</h3>
          <QuestionItem 
            v-for="(q, index) in preguntasSintomas" 
            :key="'sint-'+index"
            :number="q.number"
            :question="q.text"
            v-model="q.response"
          />
        </div>
        
        <!-- Sección 3: Antecedentes personales -->
        <div class="subsection">
          <h3>TIENE O HA TENIDO</h3>
          <div class="form-group">
            <label>Antecedentes familiares de diabetes, problemas cardíacos, tumores?</label>
            <div class="radio-group">
              <label><input type="radio" v-model="antecedentesFamiliares" value="no"> No</label>
              <label><input type="radio" v-model="antecedentesFamiliares" value="si"> Sí</label>
            </div>
          </div>
          
          <QuestionItem 
            v-for="(q, index) in preguntasAntecedentes" 
            :key="'ant-'+index"
            :number="q.number"
            :question="q.text"
            v-model="q.response"
          />
        </div>
        
        <!-- Sección 4: Medicamentos -->
        <div class="subsection">
          <h3>MEDICAMENTOS</h3>
          <div class="form-group">
            <label>Toma o ha tomado de forma ininterrumpida bifosfonatos por más de 3 años</label>
            <div class="radio-group">
              <label><input type="radio" v-model="bifosfonatos" value="no"> No</label>
              <label><input type="radio" v-model="bifosfonatos" value="si"> Sí</label>
            </div>
          </div>
          
          <div class="form-group">
            <label>Toma anticoagulantes</label>
            <div class="radio-group">
              <label><input type="radio" v-model="anticoagulantes" value="no"> No</label>
              <label><input type="radio" v-model="anticoagulantes" value="si"> Sí</label>
            </div>
          </div>
          
          <h4>Medicamentos actuales</h4>
          <div v-for="(med, index) in medicamentos" :key="'med-'+index" class="medication-item">
            <input type="text" v-model="med.nombre" placeholder="Nombre del medicamento">
            <input type="text" v-model="med.dosis" placeholder="Dosis">
            <button @click="removeMedication(index)" class="btn-remove">X</button>
          </div>
          <button @click="addMedication" class="btn-add">+ Añadir medicamento</button>
        </div>
        
        <!-- Sección 5: Alergias -->
        <div class="subsection">
          <h3>ALERGIAS A:</h3>
          <div class="allergy-grid">
            <label v-for="(alergia, index) in alergiasComunes" :key="'alergia-'+index">
              <input type="checkbox" v-model="alergiasSeleccionadas" :value="alergia.valor">
              {{ alergia.texto }}
            </label>
          </div>
          <div class="other-allergy">
            <label>Otras alergias:</label>
            <input type="text" v-model="otrasAlergias" placeholder="Especifique">
          </div>
        </div>
        
        <!-- Sección 6: Antecedentes ginecológicos -->
        <div class="subsection" v-if="paciente.sexo === 'Femenino'">
          <h3>SOLO SI ES MUJER</h3>
          <div class="form-group">
            <label>¿Está embarazada?</label>
            <div class="radio-group">
              <label><input type="radio" v-model="embarazo.estado" value="no"> No</label>
              <label><input type="radio" v-model="embarazo.estado" value="si"> Sí</label>
            </div>
            <div v-if="embarazo.estado === 'si'" class="pregnancy-details">
              <label>¿Cuántos meses?</label>
              <input type="number" v-model="embarazo.meses" min="1" max="9">
            </div>
          </div>
          
          <div class="form-group">
            <label>¿Toma algún método anticonceptivo?</label>
            <input type="text" v-model="anticonceptivos">
          </div>
          
          <div class="form-group">
            <label>¿Está lactando?</label>
            <div class="radio-group">
              <label><input type="radio" v-model="lactancia" value="no"> No</label>
              <label><input type="radio" v-model="lactancia" value="si"> Sí</label>
            </div>
          </div>
        </div>
        
        <!-- Sección 7: Dolor crónico -->
        <div class="subsection">
          <h3>DOLOR CRÓNICO</h3>
          <textarea v-model="dolorCronico" placeholder="Describa cualquier dolor crónico"></textarea>
        </div>
        
        <!-- Sección 8: Otros antecedentes -->
        <div class="subsection">
          <h3>VIII. ¿HA TENIDO:</h3>
          <QuestionItem 
            v-for="(q, index) in preguntasOtrosAntecedentes" 
            :key="'otros-'+index"
            :number="q.number"
            :question="q.text"
            v-model="q.response"
          />
        </div>
      </div>

      <!-- Botones de acción -->
      <div class="action-buttons">
        <button @click="guardarFormulario" class="btn-primary">Guardar</button>
        <button @click="limpiarFormulario" class="btn-secondary">Limpiar</button>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionItem from '@/components/student/QuestionItem.vue'

export default {
  name: 'PreguntasView',
  components: {
    QuestionItem
  },
  data() {
    return {
      paciente: {
        nombre: 'Juan Pérez',
        id: 'PT-001',
        edad: 35,
        sexo: 'Masculino'
      },
      motivoConsulta: '',
      enfermedadActual: '',
      
      // Sección 1: Estado general
      preguntasGenerales: [
        { number: 1, text: '¿Está en buen estado general de salud?', response: null },
        { number: 2, text: '¿Ha habido algún cambio en su salud en el último año?', response: null },
        { 
          number: 3, 
          text: '¿Ha sido atendido por un médico en los últimos dos años?', 
          response: null,
          hasObservations: true,
          observationLabel: 'Fecha del último examen médico/dental:',
          observations: ''
        },
        { number: 4, text: '¿Ha sido atendido por un psicólogo o psiquiatra en los últimos dos años?', response: null },
        { number: 5, text: '¿Ha sido hospitalizado en los últimos dos años?', response: null },
        { number: 6, text: '¿Se ha hecho análisis de sangre en los últimos dos años?', response: null },
        { number: 7, text: '¿Ha sido intervenido quirúrgicamente en alguna ocasión?', response: null },
        { number: 8, text: '¿Ha tenido alguna reacción o complicación con la anestesia?', response: null },
        { number: 9, text: '¿Ha tenido algún problema importante durante o después de un tratamiento dental anterior?', response: null },
        { number: 10, text: '¿Ha tenido alguna hemorragia importante?', response: null },
        { number: 11, text: '¿Sigue alguna dieta o régimen?', response: null },
        { number: 12, text: '¿Ha ganado o perdido más de 10 kilos en el último año?', response: null }
      ],
      
      // Sección 2: Síntomas experimentados
      preguntasSintomas: [
        { number: 13, text: 'Dolor en el pecho (angina)', response: null },
        { number: 14, text: 'Tobillos hinchados', response: null },
        { number: 15, text: 'Falta de aire', response: null },
        { number: 16, text: 'Pérdida reciente de peso, fiebre, sudores nocturnos', response: null },
        { number: 17, text: 'Tos persistente', response: null },
        { number: 18, text: 'Expectoración con sangre', response: null },
        { number: 19, text: 'Sangrado', response: null },
        { number: 20, text: 'Aparición fácil de moretones', response: null },
        { number: 21, text: 'Problemas sinusales', response: null },
        { number: 22, text: 'Dificultad al tragar', response: null },
        { number: 23, text: 'Diarrea', response: null },
        { number: 24, text: 'Estreñimiento', response: null },
        { number: 25, text: 'Sangre en las heces', response: null },
        { number: 26, text: 'Vómitos frecuentes, náuseas?', response: null },
        { number: 27, text: 'Dificultad para orinar', response: null },
        { number: 28, text: 'Sangre en la orina', response: null },
        { number: 29, text: 'Mareos', response: null },
        { number: 30, text: 'Zumbido en los oídos', response: null },
        { number: 31, text: 'Dolores de cabeza', response: null },
        { number: 32, text: 'Desmayos', response: null },
        { number: 33, text: 'Visión borrosa', response: null },
        { number: 34, text: 'Convulsiones', response: null },
        { number: 35, text: 'Sed excesiva', response: null },
        { number: 36, text: 'Orina con frecuencia', response: null },
        { number: 37, text: 'Boca seca', response: null },
        { number: 38, text: 'Piel u ojos amarillos', response: null },
        { number: 39, text: 'Dolor o rigidez en las articulaciones', response: null }
      ],
      
      // Sección 3: Antecedentes personales
      antecedentesFamiliares: null,
      preguntasAntecedentes: [
        { number: 40, text: 'Ataques cardíacos', response: null },
        { number: 41, text: 'Defectos cardíacos', response: null },
        { number: 42, text: 'Soplos cardíacos', response: null },
        { number: 43, text: 'Fiebre reumática', response: null },
        { number: 44, text: 'Endurecimiento de las arterias', response: null },
        { number: 45, text: 'Presión arterial alta', response: null },
        { number: 46, text: 'Otras enfermedades cardíacas', response: null },
        { number: 47, text: 'Asma', response: null },
        { number: 48, text: 'Enfisema', response: null },
        { number: 49, text: 'Otras enfermedades pulmonares', response: null },
        { number: 50, text: 'Gastritis', response: null },
        { number: 51, text: 'Colitis pseudomembranosa', response: null },
        { number: 52, text: 'Otras enfermedades gastrointestinales', response: null },
        { number: 53, text: 'Hepatitis', response: null },
        { number: 54, text: 'Cirrosis', response: null },
        { number: 55, text: 'Otras enfermedades hepáticas', response: null },
        { number: 56, text: 'Epilepsia', response: null },
        { number: 57, text: 'Otras enfermedades neurológicas', response: null },
        { number: 58, text: 'Osteoporosis', response: null },
        { number: 59, text: 'Artritis', response: null },
        { number: 60, text: 'Fiebre reumática', response: null },
        { number: 61, text: 'Otras enfermedades esqueléticas', response: null },
        { number: 62, text: 'Anemia', response: null },
        { number: 63, text: 'Trombocitopenia', response: null },
        { number: 64, text: 'Leucopenia', response: null },
        { number: 65, text: 'Otras enfermedades hematológicas', response: null },
        { number: 66, text: 'Hemofilia', response: null },
        { number: 67, text: 'Otras enfermedades de la coagulación', response: null },
        { number: 68, text: 'Herpes', response: null },
        { number: 69, text: 'VIH/SIDA', response: null },
        { number: 70, text: 'Sífilis', response: null },
        { number: 71, text: 'Gonorrea', response: null },
        { number: 72, text: 'Otras enfermedades venéreas', response: null },
        { number: 73, text: 'Enfermedades oculares', response: null },
        { number: 74, text: 'Enfermedades de la piel', response: null },
        { number: 75, text: 'Enfermedades tiroideas', response: null },
        { number: 76, text: 'Diabetes', response: null },
        { number: 77, text: 'Enfermedades suprarrenales', response: null },
        { number: 78, text: 'Otras enfermedades endocrinológicas', response: null },
        { number: 79, text: 'Enfermedad renal', response: null },
        { number: 80, text: 'Tumor o cáncer', response: null },
        { 
          number: 81, 
          text: 'Otros', 
          response: null,
          hasObservations: true,
          observationLabel: 'Nombre exacto de la condición o enfermedad',
          observations: ''
        }
      ],
      
      // Sección 4: Medicamentos
      bifosfonatos: null,
      anticoagulantes: null,
      medicamentos: [
        { nombre: '', dosis: '' }
      ],
      
      // Sección 5: Alergias
      alergiasComunes: [
        { valor: 'alimentos', texto: 'Alimentos' },
        { valor: 'enlatados', texto: 'Enlatados' },
        { valor: 'latex', texto: 'Látex' },
        { valor: 'anestesicos', texto: 'Anestésicos locales' },
        { valor: 'penicilina', texto: 'Penicilina' },
        { valor: 'sulfas', texto: 'Sulfas' },
        { valor: 'aspirina', texto: 'Aspirina' },
        { valor: 'yodo', texto: 'Yodo' },
        { valor: 'codeina', texto: 'Codeína' }
      ],
      alergiasSeleccionadas: [],
      otrasAlergias: '',
      
      // Sección 6: Antecedentes ginecológicos
      embarazo: {
        estado: 'no',
        meses: null
      },
      anticonceptivos: '',
      lactancia: 'no',
      
      // Sección 7: Dolor crónico
      dolorCronico: '',
      
      // Sección 8: Otros antecedentes
      preguntasOtrosAntecedentes: [
        { number: 1, text: 'Atención psiquiátrica', response: null },
        { number: 2, text: 'Radioterapia', response: null },
        { number: 3, text: 'Quimioterapia', response: null },
        { number: 4, text: 'Válvula cardíaca artificial', response: null },
        { number: 5, text: 'Articulación artificial', response: null },
        { number: 6, text: 'Hospitalizaciones', response: null },
        { number: 7, text: 'Transfusiones de sangre', response: null },
        { number: 8, text: 'Cirugías', response: null },
        { number: 9, text: 'Marcapasos', response: null },
        { number: 10, text: 'Lentes de contacto', response: null }
      ]
    }
  },
  methods: {
    addMedication() {
      this.medicamentos.push({ nombre: '', dosis: '' });
    },
    removeMedication(index) {
      if (this.medicamentos.length > 1) {
        this.medicamentos.splice(index, 1);
      }
    },
    guardarFormulario() {
      const datos = {
        paciente: this.paciente,
        motivoConsulta: this.motivoConsulta,
        enfermedadActual: this.enfermedadActual,
        estadoGeneral: this.preguntasGenerales,
        sintomas: this.preguntasSintomas,
        antecedentes: {
          familiares: this.antecedentesFamiliares,
          personales: this.preguntasAntecedentes
        },
        medicamentos: {
          bifosfonatos: this.bifosfonatos,
          anticoagulantes: this.anticoagulantes,
          lista: this.medicamentos.filter(m => m.nombre)
        },
        alergias: [...this.alergiasSeleccionadas, ...(this.otrasAlergias ? [this.otrasAlergias] : [])],
        ginecologicos: this.paciente.sexo === 'Femenino' ? {
          embarazo: this.embarazo,
          anticonceptivos: this.anticonceptivos,
          lactancia: this.lactancia
        } : null,
        dolorCronico: this.dolorCronico,
        otrosAntecedentes: this.preguntasOtrosAntecedentes
      };

      console.log('Datos del formulario:', datos);
      alert('Formulario guardado correctamente');
      // Aquí podrías agregar lógica para enviar los datos a un servidor
    },
    limpiarFormulario() {
      if (confirm('¿Está seguro que desea limpiar todo el formulario?')) {
        this.motivoConsulta = '';
        this.enfermedadActual = '';
        
        // Limpiar todas las preguntas
        const limpiarPreguntas = (arr) => arr.forEach(p => {
          p.response = null;
          if (p.hasObservations) p.observations = '';
        });
        
        limpiarPreguntas(this.preguntasGenerales);
        limpiarPreguntas(this.preguntasSintomas);
        limpiarPreguntas(this.preguntasAntecedentes);
        limpiarPreguntas(this.preguntasOtrosAntecedentes);
        
        this.antecedentesFamiliares = null;
        this.bifosfonatos = null;
        this.anticoagulantes = null;
        this.medicamentos = [{ nombre: '', dosis: '' }];
        this.alergiasSeleccionadas = [];
        this.otrasAlergias = '';
        
        if (this.paciente.sexo === 'Femenino') {
          this.embarazo = { estado: 'no', meses: null };
          this.anticonceptivos = '';
          this.lactancia = 'no';
        }
        
        this.dolorCronico = '';
      }
    }
  }
}
</script>
<style scoped src="@/assets/css/pages/student/PreguntasView.css"></style>