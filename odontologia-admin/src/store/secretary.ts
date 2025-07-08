// src/store/secretary.ts
import { defineStore } from 'pinia';
import type { PatientAssignment } from '../mocks/secretary/patientAssignments';
import type { Appointment }       from '../mocks/secretary/appointments';
import {
  fetchPatientAssignmentsMock,
  savePatientAssignmentMock,
  deletePatientAssignmentMock,
  fetchAppointmentsMock,
  saveAppointmentMock,
  deleteAppointmentMock
} from '../mocks/api';

export const useSecretaryStore = defineStore('secretary', {
  state: () => ({
    patientAssignments: [] as PatientAssignment[],
    appointments:       [] as Appointment[],
    loading: false,
    error:   '' as string
  }),
  actions: {
    // Patient Assignments
    async loadPatientAssignments() {
      this.loading = true;
      this.patientAssignments = await fetchPatientAssignmentsMock();
      this.loading = false;
    },
    async savePatientAssignment(a: Partial<PatientAssignment> & { studentId: number; patientId: number }) {
      this.loading = true;
      await savePatientAssignmentMock(a);
      await this.loadPatientAssignments();
      this.loading = false;
    },
    async deletePatientAssignment(id: number) {
      this.loading = true;
      await deletePatientAssignmentMock(id);
      await this.loadPatientAssignments();
      this.loading = false;
    },

    // Appointments
    async loadAppointments() {
      this.loading = true;
      this.appointments = await fetchAppointmentsMock();
      this.loading = false;
    },
    async saveAppointment(a: Partial<Appointment> & { patientId: number; studentId: number; datetime: string; status: string }) {
      this.loading = true;
      await saveAppointmentMock(a);
      await this.loadAppointments();
      this.loading = false;
    },
    async deleteAppointment(id: number) {
      this.loading = true;
      await deleteAppointmentMock(id);
      await this.loadAppointments();
      this.loading = false;
    }
  }
});
