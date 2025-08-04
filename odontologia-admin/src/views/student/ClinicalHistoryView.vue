<!-- src/views/student/ClinicalCasesView.vue -->

<template>
  <div class="clinical-history-view">
    <!-- Header -->
    <div class="history-header">
      <div class="header-content">
        <h1 class="page-title">
          <i class="fas fa-file-medical me-3"></i>Historias Clínicas
        </h1>
        <p class="page-subtitle">Gestión integral de historias médicas dentales</p>
      </div>
      
      <div class="header-actions">
        <button class="btn btn-primary" @click="openNewPatientModal">
          <i class="fas fa-plus-circle me-2"></i>Nuevo Paciente
        </button>
      </div>
    </div>

    <!-- Panel de búsqueda -->
    <div class="search-panel">
      <div class="search-container">
        <div class="search-input-group">
          <span class="search-icon">
            <i class="fas fa-search"></i>
          </span>
          <input
            v-model="searchTerm"
            type="text"
            class="form-control search-field"
            placeholder="Buscar por nombre, cédula o teléfono..."
          >
          <button class="btn btn-clear" @click="clearSearch">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="filter-group">
          <select v-model="filterStatus" class="form-select filter-select">
            <option value="">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </select>
          
          <select v-model="filterLastVisit" class="form-select filter-select">
            <option value="">Última visita</option>
            <option value="week">Última semana</option>
            <option value="month">Último mes</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Contenido principal -->
    <div class="main-content">
      <!-- Estado de carga -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Cargando historias clínicas...</p>
      </div>

      <!-- Estado vacío -->
      <div v-else-if="!filteredPatients.length" class="empty-state">
        <i class="fas fa-folder-open"></i>
        <h4>No se encontraron pacientes</h4>
        <p>Intenta ajustar tus criterios de búsqueda o agrega un nuevo paciente</p>
        <button class="btn btn-primary" @click="openNewPatientModal">
          <i class="fas fa-plus-circle me-2"></i>Agregar Paciente
        </button>
      </div>

      <!-- Lista de pacientes -->
      <div v-else class="patient-grid">
        <div v-for="patient in filteredPatients" :key="patient.id" class="patient-card">
          <div class="card-header">
            <span class="status-badge" :class="getStatusClass(patient.status)">
              {{ getStatusText(patient.status) }}
            </span>
            <div class="card-actions">
              <button class="btn-action" @click="editPatient(patient)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn-action" @click="confirmDelete(patient)">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
          
          <div class="card-body">
            <div class="patient-info">
              <div class="patient-avatar">
                {{ getInitials(patient.name) }}
              </div>
              <div class="patient-details">
                <h3>{{ patient.name }}</h3>
                <p>{{ patient.age }} años · {{ patient.gender }}</p>
              </div>
            </div>
            
            <div class="patient-meta">
              <div class="meta-item">
                <i class="fas fa-id-card"></i>
                <span>{{ patient.identification }}</span>
              </div>
              <div class="meta-item">
                <i class="fas fa-phone"></i>
                <span>{{ patient.phone }}</span>
              </div>
              <div class="meta-item">
                <i class="fas fa-calendar-day"></i>
                <span>Últ. visita: {{ formatDate(patient.lastVisit) }}</span>
              </div>
            </div>
            
            <div class="patient-stats">
              <div class="stat-item">
                <span class="stat-value">{{ patient.treatments.length }}</span>
                <span class="stat-label">Tratamientos</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ patient.allergies.length }}</span>
                <span class="stat-label">Alergias</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ patient.medications.length }}</span>
                <span class="stat-label">Medicamentos</span>
              </div>
            </div>
          </div>
          
          <div class="card-footer">
            <button class="btn btn-view" @click="openPatientHistory(patient)">
              <i class="fas fa-file-medical me-2"></i>Ver Historia
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Historia Clínica -->
    <div v-if="selectedPatient" class="modal-overlay" @click.self="closeModal">
      <div class="modal-container">
        <div class="modal-header">
          <h2>
            <i class="fas fa-file-medical me-2"></i>
            Historia Clínica de {{ selectedPatient.name }}
          </h2>
          <button class="btn-close" @click="closeModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="patient-profile">
            <div class="profile-avatar">
              {{ getInitials(selectedPatient.name) }}
            </div>
            <div class="profile-info">
              <h3>{{ selectedPatient.name }}</h3>
              <p>{{ selectedPatient.age }} años · {{ selectedPatient.gender }}</p>
              <p class="text-muted">
                <i class="fas fa-calendar-plus me-2"></i>
                Registrado el {{ formatDate(selectedPatient.createdAt) }}
              </p>
            </div>
          </div>
          
          <div class="tabs">
            <button 
              class="tab-btn" 
              :class="{ active: activeTab === 'general' }"
              @click="activeTab = 'general'"
            >
              Información General
            </button>
            <button 
              class="tab-btn" 
              :class="{ active: activeTab === 'medical' }"
              @click="activeTab = 'medical'"
            >
              Historial Médico
            </button>
            <button 
              class="tab-btn" 
              :class="{ active: activeTab === 'treatments' }"
              @click="activeTab = 'treatments'"
            >
              Tratamientos
            </button>
          </div>
          
          <div class="tab-content">
            <!-- Información General -->
            <div v-if="activeTab === 'general'" class="general-info">
              <div class="info-section">
                <h4><i class="fas fa-info-circle me-2"></i>Datos Personales</h4>
                <div class="info-grid">
                  <div class="info-item">
                    <label>Identificación:</label>
                    <span>{{ selectedPatient.identification }}</span>
                  </div>
                  <div class="info-item">
                    <label>Teléfono:</label>
                    <span>{{ selectedPatient.phone }}</span>
                  </div>
                  <div class="info-item">
                    <label>Email:</label>
                    <span>{{ selectedPatient.email || 'No especificado' }}</span>
                  </div>
                  <div class="info-item">
                    <label>Dirección:</label>
                    <span>{{ selectedPatient.address || 'No especificada' }}</span>
                  </div>
                  <div class="info-item">
                    <label>Ocupación:</label>
                    <span>{{ selectedPatient.occupation || 'No especificada' }}</span>
                  </div>
                  <div class="info-item">
                    <label>Tipo de Sangre:</label>
                    <span>{{ selectedPatient.bloodType || 'No especificado' }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Historial Médico -->
            <div v-if="activeTab === 'medical'" class="medical-info">
              <div class="info-section">
                <h4><i class="fas fa-allergies me-2"></i>Alergias</h4>
                <div v-if="selectedPatient.allergies.length" class="info-list">
                  <div v-for="(allergy, index) in selectedPatient.allergies" :key="index" class="info-item">
                    <span>{{ allergy }}</span>
                  </div>
                </div>
                <div v-else class="empty-info">
                  No se han registrado alergias
                </div>
              </div>
              
              <div class="info-section">
                <h4><i class="fas fa-pills me-2"></i>Medicamentos</h4>
                <div v-if="selectedPatient.medications.length" class="info-list">
                  <div v-for="(med, index) in selectedPatient.medications" :key="index" class="info-item">
                    <span>{{ med }}</span>
                  </div>
                </div>
                <div v-else class="empty-info">
                  No se han registrado medicamentos
                </div>
              </div>
              
              <div class="info-section">
                <h4><i class="fas fa-file-medical-alt me-2"></i>Condiciones Médicas</h4>
                <div v-if="selectedPatient.conditions.length" class="info-list">
                  <div v-for="(condition, index) in selectedPatient.conditions" :key="index" class="info-item">
                    <span>{{ condition }}</span>
                  </div>
                </div>
                <div v-else class="empty-info">
                  No se han registrado condiciones médicas
                </div>
              </div>
            </div>
            
            <!-- Tratamientos -->
            <div v-if="activeTab === 'treatments'" class="treatments-info">
              <div class="info-section">
                <div class="treatment-list">
                  <div v-for="treatment in selectedPatient.treatments" :key="treatment.id" class="treatment-item">
                    <div class="treatment-header">
                      <h5>{{ treatment.title }}</h5>
                      <span class="treatment-date">{{ formatDate(treatment.date) }}</span>
                    </div>
                    <div class="treatment-body">
                      <p>{{ treatment.description }}</p>
                      <div class="treatment-meta">
                        <span><i class="fas fa-user-md me-2"></i>{{ treatment.supervisor }}</span>
                        <span v-if="treatment.notes"><i class="fas fa-sticky-note me-2"></i>{{ treatment.notes }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeModal">
            Cerrar
          </button>
          <button class="btn btn-primary" @click="startNewTreatment">
            <i class="fas fa-plus me-2"></i>Nuevo Tratamiento
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de Nuevo Paciente -->
    <div v-if="showNewPatientModal" class="modal-overlay" @click.self="closeNewPatientModal">
      <div class="modal-container">
        <div class="modal-header">
          <h2><i class="fas fa-user-plus me-2"></i>Nuevo Paciente</h2>
          <button class="btn-close" @click="closeNewPatientModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <form @submit.prevent="saveNewPatient">
            <div class="form-grid">
              <div class="form-group">
                <label>Nombre Completo *</label>
                <input v-model="newPatient.name" type="text" required>
              </div>
              
              <div class="form-group">
                <label>Identificación *</label>
                <input v-model="newPatient.identification" type="text" required>
              </div>
              
              <div class="form-group">
                <label>Edad *</label>
                <input v-model="newPatient.age" type="number" min="0" required>
              </div>
              
              <div class="form-group">
                <label>Género *</label>
                <select v-model="newPatient.gender" required>
                  <option value="">Seleccionar</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              
              <div class="form-group">
                <label>Teléfono *</label>
                <input v-model="newPatient.phone" type="tel" required>
              </div>
              
              <div class="form-group">
                <label>Email</label>
                <input v-model="newPatient.email" type="email">
              </div>
              
              <div class="form-group">
                <label>Dirección</label>
                <input v-model="newPatient.address" type="text">
              </div>
              
              <div class="form-group">
                <label>Tipo de Sangre</label>
                <select v-model="newPatient.bloodType">
                  <option value="">Desconocido</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              
              <div class="form-group">
                <label>Ocupación</label>
                <input v-model="newPatient.occupation" type="text">
              </div>
            </div>
            
            <div class="form-actions">
              <button type="button" class="btn btn-outline" @click="closeNewPatientModal">
                Cancelar
              </button>
              <button type="submit" class="btn btn-primary">
                Guardar Paciente
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal de Confirmación -->
    <div v-if="showConfirmModal" class="modal-overlay" @click.self="cancelDelete">
      <div class="confirm-modal">
        <div class="confirm-header">
          <h3><i class="fas fa-exclamation-triangle me-2"></i>Confirmar Eliminación</h3>
        </div>
        
        <div class="confirm-body">
          <p>¿Estás seguro de eliminar el paciente <strong>{{ patientToDelete?.name }}</strong>?</p>
          <p class="text-muted">Esta acción no se puede deshacer.</p>
        </div>
        
        <div class="confirm-footer">
          <button class="btn btn-outline" @click="cancelDelete">
            Cancelar
          </button>
          <button class="btn btn-danger" @click="deletePatient">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      searchTerm: '',
      filterStatus: '',
      filterLastVisit: '',
      activeTab: 'general',
      selectedPatient: null,
      showNewPatientModal: false,
      showConfirmModal: false,
      patientToDelete: null,
      newPatient: {
        name: '',
        identification: '',
        age: '',
        gender: '',
        phone: '',
        email: '',
        address: '',
        bloodType: '',
        occupation: '',
        allergies: [],
        medications: [],
        conditions: [],
        treatments: []
      },
      patients: [
        {
          id: 1,
          name: 'María González Pérez',
          age: 35,
          gender: 'Femenino',
          identification: '1234567890',
          phone: '0991234567',
          email: 'maria.gonzalez@example.com',
          address: 'Av. Principal 123, Ciudad',
          bloodType: 'A+',
          occupation: 'Ingeniera',
          status: 'active',
          lastVisit: '2024-01-15',
          createdAt: '2023-10-05',
          allergies: ['Penicilina', 'Metronidazol'],
          medications: ['Ibuprofeno 400mg'],
          conditions: ['Hipertensión controlada'],
          treatments: [
            {
              id: 1,
              date: '2024-01-15',
              title: 'Limpieza dental',
              description: 'Profilaxis completa con aplicación de flúor',
              supervisor: 'Dr. García',
              notes: 'Encías levemente inflamadas en sector anterior'
            },
            {
              id: 2,
              date: '2023-12-14',
              title: 'Obturación',
              description: 'Restauración de caries en molar superior derecho',
              supervisor: 'Dr. García',
              notes: 'Paciente toleró bien el procedimiento'
            }
          ]
        },
        {
          id: 2,
          name: 'Carlos López Mendez',
          age: 28,
          gender: 'Masculino',
          identification: '0987654321',
          phone: '0997654321',
          email: 'carlos.lopez@example.com',
          bloodType: 'O+',
          occupation: 'Arquitecto',
          status: 'active',
          lastVisit: '2024-01-10',
          createdAt: '2023-11-15',
          allergies: [],
          medications: ['Metformina 500mg'],
          conditions: ['Diabetes tipo II'],
          treatments: [
            {
              id: 1,
              date: '2024-01-10',
              title: 'Ortodoncia',
              description: 'Colocación de brackets metálicos',
              supervisor: 'Dra. Pérez',
              notes: 'Paciente tolera bien la aparatología'
            }
          ]
        }
      ]
    }
  },
  computed: {
    filteredPatients() {
      let filtered = this.patients
      
      // Filtrar por término de búsqueda
      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase()
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(term) ||
          p.identification.includes(term) ||
          p.phone.includes(term) ||
          (p.email && p.email.toLowerCase().includes(term))
        )
      }
      
      // Filtrar por estado
      if (this.filterStatus) {
        filtered = filtered.filter(p => p.status === this.filterStatus)
      }
      
      // Filtrar por última visita
      if (this.filterLastVisit) {
        const now = new Date()
        filtered = filtered.filter(p => {
          const lastVisit = new Date(p.lastVisit)
          const diffTime = now.getTime() - lastVisit.getTime()
          const diffDays = diffTime / (1000 * 60 * 60 * 24)
          
          switch (this.filterLastVisit) {
            case 'week': return diffDays <= 7
            case 'month': return diffDays <= 30
            default: return true
          }
        })
      }
      
      return filtered
    }
  },
  methods: {
    getInitials(name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase()
    },
    getStatusText(status) {
      const statusMap = {
        active: 'Activo',
        inactive: 'Inactivo'
      }
      return statusMap[status] || status
    },
    getStatusClass(status) {
      const classMap = {
        active: 'active',
        inactive: 'inactive'
      }
      return classMap[status] || ''
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return new Date(dateString).toLocaleDateString('es-ES', options)
    },
    openPatientHistory(patient) {
      this.selectedPatient = JSON.parse(JSON.stringify(patient))
    },
    closeModal() {
      this.selectedPatient = null
      this.activeTab = 'general'
    },
    openNewPatientModal() {
      this.showNewPatientModal = true
      this.resetNewPatientForm()
    },
    closeNewPatientModal() {
      this.showNewPatientModal = false
    },
    saveNewPatient() {
      const newId = Math.max(...this.patients.map(p => p.id)) + 1
      const newPatient = {
        id: newId,
        ...this.newPatient,
        status: 'active',
        lastVisit: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString().split('T')[0],
        allergies: [],
        medications: [],
        conditions: [],
        treatments: []
      }
      
      this.patients.push(newPatient)
      this.showNewPatientModal = false
      this.resetNewPatientForm()
    },
    resetNewPatientForm() {
      this.newPatient = {
        name: '',
        identification: '',
        age: '',
        gender: '',
        phone: '',
        email: '',
        address: '',
        bloodType: '',
        occupation: '',
        allergies: [],
        medications: [],
        conditions: [],
        treatments: []
      }
    },
    editPatient(patient) {
      this.selectedPatient = JSON.parse(JSON.stringify(patient))
    },
    confirmDelete(patient) {
      this.patientToDelete = patient
      this.showConfirmModal = true
    },
    cancelDelete() {
      this.patientToDelete = null
      this.showConfirmModal = false
    },
    deletePatient() {
      if (this.patientToDelete) {
        this.patients = this.patients.filter(p => p.id !== this.patientToDelete.id)
        this.showConfirmModal = false
        this.patientToDelete = null
      }
    },
    startNewTreatment() {
      alert(`Iniciando nuevo tratamiento para ${this.selectedPatient.name}`)
    },
    clearSearch() {
      this.searchTerm = ''
      this.filterStatus = ''
      this.filterLastVisit = ''
    }
  },
  mounted() {
    // Simular carga de datos
    this.loading = true
    setTimeout(() => {
      this.loading = false
    }, 800)
  }
}
</script>

<style scoped src="@/assets/css/pages/student/ClinicalHistoryView.css"></style>