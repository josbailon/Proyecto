// src/store/secretary.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  fetchPatientsMock,
  savePatientMock,
  deletePatientMock,
  fetchAppointmentsMock,
  saveAppointmentMock,
  deleteAppointmentMock,
  fetchStudentsByCourseMock,
  fetchHistoriesMock,
  saveHistoryMock
} from '@/mocks/api';

import type {
  Patient,
  Appointment,
  StudentInfo,
  ClinicalHistory
} from '@/mocks/api';

export const useSecretaryStore = defineStore('secretary', () => {
  // ----------------------------
  // Estado: pacientes
  // ----------------------------
  const patients = ref<Patient[]>([]);

  async function loadPatients() {
    patients.value = await fetchPatientsMock();
  }

  async function savePatient(p: Patient) {
    const saved = await savePatientMock(p);
    const index = patients.value.findIndex(x => x.id === saved.id);
    if (index >= 0) {
      patients.value[index] = saved;
    } else {
      patients.value.push(saved);
    }
  }

  async function deletePatient(id: number) {
    await deletePatientMock(id);
    patients.value = patients.value.filter(p => p.id !== id);
  }

  // ----------------------------
  // Estado: citas
  // ----------------------------
  const appointments = ref<Appointment[]>([]);

  async function loadAppointments() {
    appointments.value = await fetchAppointmentsMock();
  }

  async function addAppointment(a: Appointment) {
    const saved = await saveAppointmentMock(a);
    const index = appointments.value.findIndex(x => x.id === saved.id);
    if (index >= 0) {
      appointments.value[index] = saved;
    } else {
      appointments.value.push(saved);
    }
  }

  async function deleteAppointment(id: number) {
    await deleteAppointmentMock(id);
    appointments.value = appointments.value.filter(a => a.id !== id);
  }

  // ----------------------------
  // Estado: estudiantes
  // ----------------------------
  const students = ref<StudentInfo[]>([]);

  async function loadStudents(course: string = 'Odontología') {
    students.value = await fetchStudentsByCourseMock(course);
  }

  // ----------------------------
  // Estado: historias médicas (cuestionario)
  // ----------------------------
  const medicalHistories = ref<ClinicalHistory[]>([]);

  async function loadMedicalHistories() {
    medicalHistories.value = await fetchHistoriesMock();
  }

  async function addMedicalHistory(history: ClinicalHistory) {
    const saved = await saveHistoryMock(history);
    medicalHistories.value.push(saved);
  }

  // ----------------------------
  // Carga completa
  // ----------------------------
  async function loadAllData() {
    await Promise.all([
      loadPatients(),
      loadAppointments(),
      loadStudents(),
      loadMedicalHistories()
    ]);
  }

  return {
    patients,
    appointments,
    students,
    medicalHistories,
    loadPatients,
    savePatient,
    deletePatient,
    loadAppointments,
    addAppointment,
    deleteAppointment,
    loadStudents,
    loadMedicalHistories,
    addMedicalHistory,
    loadAllData
  };
});
