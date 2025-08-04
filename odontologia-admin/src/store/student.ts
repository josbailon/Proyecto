// odontologia-admin/src/store/student.ts
import { defineStore } from 'pinia'
import { useAdminStore } from './admin'

// Tipos e imports de mocks
import type { ClinicalHistory } from '@/mocks/student/clinicalHistories'
import {
  fetchClinicalHistoriesMock,
  fetchClinicalHistoryByIdMock,
  saveClinicalHistoryMock,
  deleteClinicalHistoryMock
} from '@/mocks/student/clinicalHistories'

import type { ClinicalCase } from '@/mocks/student/clinicalCases'
import {
  fetchCasesMock,
  fetchCaseByIdMock,
  saveCaseMock,
  deleteCaseMock
} from '@/mocks/student/clinicalCases'

import type { Assignment } from '@/mocks/student/assignments'
import {
  fetchAssignmentsMock,
  saveAssignmentMock,
  deleteAssignmentMock
} from '@/mocks/student/assignments'

import type { OdontogramData, ToothCondition, ToothSurface } from '@/mocks/student/odontogram'
import {
  fetchOdontogramMock,
  saveOdontogramMock,
  updateToothStatusMock,
  updateToothNoteMock
} from '@/mocks/student/odontogram'

import type { PeriodontogramData, PeriodontalMeasurement } from '@/mocks/student/periodontogram'
import {
  fetchPeriodontogramMock,
  savePeriodontogramMock,
  updateToothMeasurementsMock,
  updateGeneralNotesMock
} from '@/mocks/student/periodontogram'

import type { Message } from '@/mocks/student/messaging'
import {
  fetchMessagesMock,
  sendMessageMock,
  markMessagesAsReadMock,
  deleteMessageMock
} from '@/mocks/student/messaging'

export const useStudentStore = defineStore('student', {
  state: () => ({
    // Historias clínicas
    histories: [] as ClinicalHistory[],
    currentHistory: null as ClinicalHistory | null,
    
    // Casos clínicos
    cases: [] as ClinicalCase[],
    currentCase: null as ClinicalCase | null,
    
    // Tareas académicas
    assignments: [] as Assignment[],
    currentAssignment: null as Assignment | null,
    
    // Odontograma
    odontogram: null as OdontogramData | null,
    
    // Periodontograma
    periodontogram: null as PeriodontogramData | null,
    
    // Mensajería
    messages: [] as Message[],
    currentContact: null as string | null,
    
    // Estado general
    loading: false,
    error: null as string | null
  }),

  getters: {
    currentUserName(): string {
      const admin = useAdminStore()
      return admin.currentUser?.nombre || 'Estudiante'
    },
    
    patientsWithPeriodontalRecords(): Array<{id: number, name: string}> {
      if (!this.periodontogram) return []
      return [{
        id: this.periodontogram.patient.id,
        name: this.periodontogram.patient.name
      }]
    },
    
    unreadMessagesCount(): number {
      return this.messages.filter(m => !m.read && m.to === this.currentUserName).length
    },
    
    // Nuevo getter para dientes con problemas
    problematicTeeth(): string[] {
      if (!this.odontogram) return []
      return Object.entries(this.odontogram.teeth)
        .filter(([_, status]) => status.condition !== 'sano')
        .map(([tooth]) => tooth)
    }
  },

  actions: {
    // --- Historias clínicas ---
    async loadHistories() {
      try {
        this.loading = true
        this.error = null
        this.histories = await fetchClinicalHistoriesMock()
      } catch (err) {
        this.error = 'Error al cargar historias clínicas'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    
    async loadHistoryById(id: number) {
      try {
        this.loading = true
        this.error = null
        const history = await fetchClinicalHistoryByIdMock(id)
        this.currentHistory = history || null
      } catch (err) {
        this.error = 'Error al cargar historia clínica'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    
    async saveHistory(history: ClinicalHistory) {
      try {
        this.loading = true
        this.error = null
        await saveClinicalHistoryMock(history)
        await this.loadHistories()
      } catch (err) {
        this.error = 'Error al guardar historia clínica'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    
    async deleteHistory(id: number) {
      try {
        this.loading = true
        this.error = null
        await deleteClinicalHistoryMock(id)
        await this.loadHistories()
      } catch (err) {
        this.error = 'Error al eliminar historia clínica'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    // --- Casos clínicos ---
    async loadCases() {
      try {
        this.loading = true
        this.error = null
        this.cases = await fetchCasesMock()
      } catch (err) {
        this.error = 'Error al cargar casos clínicos'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    
    async loadCaseById(id: number) {
      try {
        this.loading = true
        this.error = null
        const caseData = await fetchCaseByIdMock(id)
        this.currentCase = caseData || null
      } catch (err) {
        this.error = 'Error al cargar caso clínico'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    
    async saveCase(caseData: ClinicalCase) {
      try {
        this.loading = true
        this.error = null
        await saveCaseMock(caseData)
        await this.loadCases()
      } catch (err) {
        this.error = 'Error al guardar caso clínico'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    
    async deleteCase(id: number) {
      try {
        this.loading = true
        this.error = null
        await deleteCaseMock(id)
        await this.loadCases()
      } catch (err) {
        this.error = 'Error al eliminar caso clínico'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    // --- Tareas académicas ---
    async loadAssignments() {
      try {
        this.loading = true
        this.error = null
        this.assignments = await fetchAssignmentsMock()
      } catch (err) {
        this.error = 'Error al cargar tareas académicas'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    
    async saveAssignment(assignment: Assignment) {
      try {
        this.loading = true
        this.error = null
        await saveAssignmentMock(assignment)
        await this.loadAssignments()
      } catch (err) {
        this.error = 'Error al guardar tarea académica'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    
    async deleteAssignment(id: number) {
      try {
        this.loading = true
        this.error = null
        await deleteAssignmentMock(id)
        await this.loadAssignments()
      } catch (err) {
        this.error = 'Error al eliminar tarea académica'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    // --- Odontograma ---
    async loadOdontogram(patientId: number) {
      try {
        this.loading = true
        this.error = null
        const data = await fetchOdontogramMock(patientId)
        this.odontogram = data || null
      } catch (err) {
        this.error = 'Error al cargar odontograma'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    
    async saveOdontogram(data: OdontogramData) {
      try {
        this.loading = true
        this.error = null
        const savedData = await saveOdontogramMock(data)
        this.odontogram = savedData
      } catch (err) {
        this.error = 'Error al guardar odontograma'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    
    async updateToothStatus(toothNumber: string, surface: ToothSurface | 'all', condition: ToothCondition) {
      try {
        if (!this.odontogram) throw new Error('No hay odontograma cargado')
        
        this.loading = true
        this.error = null
        const updatedData = await updateToothStatusMock(
          this.odontogram.patientId,
          toothNumber,
          surface,
          condition
        )
        this.odontogram = updatedData
      } catch (err) {
        this.error = 'Error al actualizar estado del diente'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    
    async updateToothNote(toothNumber: string, note: string) {
      try {
        if (!this.odontogram) throw new Error('No hay odontograma cargado')
        
        this.loading = true
        this.error = null
        const updatedData = await updateToothNoteMock(
          this.odontogram.patientId,
          toothNumber,
          note
        )
        this.odontogram = updatedData
      } catch (err) {
        this.error = 'Error al actualizar nota del diente'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    // --- Periodontograma ---
    async loadPeriodontogram(patientId: number) {
      try {
        this.loading = true
        this.error = null
        const data = await fetchPeriodontogramMock(patientId)
        this.periodontogram = data || null
      } catch (err) {
        this.error = 'Error al cargar periodontograma'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    
    async savePeriodontogram(data: PeriodontogramData) {
      try {
        this.loading = true
        this.error = null
        const savedData = await savePeriodontogramMock(data)
        this.periodontogram = savedData
      } catch (err) {
        this.error = 'Error al guardar periodontograma'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    
    async updatePeriodontalMeasurements(toothNumber: string, measurements: Partial<PeriodontalMeasurement>) {
      try {
        if (!this.periodontogram) throw new Error('No hay periodontograma cargado')
        
        this.loading = true
        this.error = null
        const updatedData = await updateToothMeasurementsMock(
          this.periodontogram.patient.id,
          toothNumber,
          measurements
        )
        this.periodontogram = updatedData
      } catch (err) {
        this.error = 'Error al actualizar mediciones periodontales'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    
    async updatePeriodontalNotes(notes: string) {
      try {
        if (!this.periodontogram) throw new Error('No hay periodontograma cargado')
        
        this.loading = true
        this.error = null
        const updatedData = await updateGeneralNotesMock(
          this.periodontogram.patient.id,
          notes
        )
        this.periodontogram = updatedData
      } catch (err) {
        this.error = 'Error al actualizar notas periodontales'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    // --- Mensajería ---
    async loadMessages(withUser: string) {
      try {
        this.loading = true
        this.error = null
        this.currentContact = withUser
        this.messages = await fetchMessagesMock(withUser, this.currentUserName)
      } catch (err) {
        this.error = 'Error al cargar mensajes'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    
    async sendMessage(content: string) {
      try {
        if (!this.currentContact) throw new Error('No hay contacto seleccionado')
        
        this.loading = true
        this.error = null
        await sendMessageMock(this.currentUserName, this.currentContact, content)
        await this.loadMessages(this.currentContact)
      } catch (err) {
        this.error = 'Error al enviar mensaje'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    
    async markMessagesAsRead() {
      try {
        if (!this.currentContact) return
        
        this.loading = true
        this.error = null
        await markMessagesAsReadMock(this.currentContact, this.currentUserName)
        await this.loadMessages(this.currentContact)
      } catch (err) {
        this.error = 'Error al marcar mensajes como leídos'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    
    async deleteMessage(id: number) {
      try {
        this.loading = true
        this.error = null
        await deleteMessageMock(id)
        if (this.currentContact) {
          await this.loadMessages(this.currentContact)
        }
      } catch (err) {
        this.error = 'Error al eliminar mensaje'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    // --- Métodos de utilidad ---
    clearCurrentData() {
      this.currentHistory = null
      this.currentCase = null
      this.currentAssignment = null
      this.odontogram = null
      this.periodontogram = null
      this.currentContact = null
      this.error = null
    },
    
    // Nuevo método para cargar todos los datos de un paciente
    async loadPatientData(patientId: number) {
      try {
        this.loading = true
        this.error = null
        await Promise.all([
          this.loadOdontogram(patientId),
          this.loadPeriodontogram(patientId)
        ])
      } catch (err) {
        this.error = 'Error al cargar datos del paciente'
        console.error(err)
      } finally {
        this.loading = false
      }
    }
  }
})
