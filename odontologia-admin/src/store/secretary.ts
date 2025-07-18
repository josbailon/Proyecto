// src/store/secretary.ts

import { defineStore } from 'pinia';
import type { PatientAssignment } from '../mocks/api';
import type { Appointment } from '../mocks/api';
import type { Patient } from '../mocks/api';

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
} from '../mocks/api';

export const useSecretaryStore = defineStore('secretary', {
  state: () => ({
    patients: [] as Patient[],
    patientAssignments: [] as PatientAssignment[],
    appointments: [] as Appointment[],
    loading: false,
    error: '' as string
  }),

  actions: {
    // -----------------------------
    // PACIENTES
    // -----------------------------
    async loadPatients() {
      this.loading = true;
      try {
        this.patients = await fetchPatientsMock();
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async savePatient(p: Patient) {
      this.loading = true;
      try {
        await savePatientMock(p);
        await this.loadPatients();
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async deletePatient(id: number) {
      this.loading = true;
      try {
        await deletePatientMock(id);
        await this.loadPatients();
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    // -----------------------------
    // ASIGNACIÓN DE PACIENTES
    // -----------------------------
    async loadPatientAssignments() {
      this.loading = true;
      try {
        this.patientAssignments = await fetchPatientAssignmentsMock();
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async savePatientAssignment(a: PatientAssignment) {
      this.loading = true;
      try {
        await savePatientAssignmentMock(a);
        await this.loadPatientAssignments();
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async deletePatientAssignment(id: number) {
      this.loading = true;
      try {
        await deletePatientAssignmentMock(id);
        await this.loadPatientAssignments();
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    // -----------------------------
    // CITAS MÉDICAS
    // -----------------------------
    async loadAppointments() {
      this.loading = true;
      try {
        this.appointments = await fetchAppointmentsMock();
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async saveAppointment(a: Appointment) {
      this.loading = true;
      try {
        await saveAppointmentMock(a);
        await this.loadAppointments();
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async deleteAppointment(id: number) {
      this.loading = true;
      try {
        await deleteAppointmentMock(id);
        await this.loadAppointments();
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  }
});
