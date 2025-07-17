// src/store/secretary.ts
import { defineStore } from 'pinia'
import type { PatientAssignment } from '../mocks/secretary/patientAssignments'
import type { Appointment } from '../mocks/secretary/appointments'
import type { Patient } from '../mocks/secretary/patients'

import {
  fetchPatientAssignmentsMock,
  savePatientAssignmentMock,
  deletePatientAssignmentMock,
  fetchAppointmentsMock,
  saveAppointmentMock,
  deleteAppointmentMock,
  fetchPatientsMock,
  savePatientMock,
  deletePatientMock
} from '../mocks/api'

export const useSecretaryStore = defineStore('secretary', {
  state: () => ({
    patientAssignments: [] as PatientAssignment[],
    appointments: [] as Appointment[],
    patients: [] as Patient[],
    loading: false,
    error: '' as string | null
  }),

  actions: {
    // ---------------------------
    // 1. GESTIÓN DE PACIENTES
    // ---------------------------
    async loadPatients() {
      this.loading = true
      try {
        this.patients = await fetchPatientsMock()
        this.error = null
      } catch (e) {
        this.error = 'Error al cargar pacientes'
      } finally {
        this.loading = false
      }
    },

    async savePatient(p: Patient) {
      this.loading = true
      try {
        await savePatientMock(p)
        await this.loadPatients()
        this.error = null
      } catch (e) {
        this.error = 'Error al guardar paciente'
      } finally {
        this.loading = false
      }
    },

    async deletePatient(id: number) {
      this.loading = true
      try {
        await deletePatientMock(id)
        await this.loadPatients()
        this.error = null
      } catch (e) {
        this.error = 'Error al eliminar paciente'
      } finally {
        this.loading = false
      }
    },

    // ---------------------------
    // 2. ASIGNACIÓN DE PACIENTES
    // ---------------------------
    async loadPatientAssignments() {
      this.loading = true
      try {
        this.patientAssignments = await fetchPatientAssignmentsMock()
        this.error = null
      } catch (e) {
        this.error = 'Error al cargar asignaciones'
      } finally {
        this.loading = false
      }
    },

    async savePatientAssignment(a: Partial<PatientAssignment> & { studentId: number; patientId: number }) {
      this.loading = true
      try {
        await savePatientAssignmentMock(a)
        await this.loadPatientAssignments()
        this.error = null
      } catch (e) {
        this.error = 'Error al guardar asignación'
      } finally {
        this.loading = false
      }
    },

    async deletePatientAssignment(id: number) {
      this.loading = true
      try {
        await deletePatientAssignmentMock(id)
        await this.loadPatientAssignments()
        this.error = null
      } catch (e) {
        this.error = 'Error al eliminar asignación'
      } finally {
        this.loading = false
      }
    },

    // ---------------------------
    // 3. GESTIÓN DE CITAS
    // ---------------------------
    async loadAppointments() {
      this.loading = true
      try {
        this.appointments = await fetchAppointmentsMock()
        this.error = null
      } catch (e) {
        this.error = 'Error al cargar citas'
      } finally {
        this.loading = false
      }
    },

    async saveAppointment(a: Partial<Appointment> & { patientId: number; studentId: number; datetime: string; status: string }) {
      this.loading = true
      try {
        await saveAppointmentMock(a)
        await this.loadAppointments()
        this.error = null
      } catch (e) {
        this.error = 'Error al guardar cita'
      } finally {
        this.loading = false
      }
    },

    async deleteAppointment(id: number) {
      this.loading = true
      try {
        await deleteAppointmentMock(id)
        await this.loadAppointments()
        this.error = null
      } catch (e) {
        this.error = 'Error al eliminar cita'
      } finally {
        this.loading = false
      }
    }
  }
})
