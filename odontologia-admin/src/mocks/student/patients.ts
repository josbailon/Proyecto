// src/mocks/student/patients.ts

export interface Patient {
  id: number;
  name: string;
  email: string;
  treatment: string;
  detail: string;
  state: 'Activo' | 'Completado';
  nextAppointment: string;
  progress: number; // porcentaje 0–100
  initials?: string; // se rellena en el Dashboard
}

/**
 * Simula la carga de pacientes asignados al estudiante.
 */
export async function fetchPatientsMock(): Promise<Patient[]> {
  // en un mock real harías un await delay(), aquí devolvemos directamente
  return [
    {
      id: 1,
      name: 'María García',
      email: 'maria.garcia@email.com',
      treatment: 'Endodoncia',
      detail: 'Tratamiento de conducto',
      state: 'Activo',
      nextAppointment: '15 Ene',
      progress: 75
    },
    {
      id: 2,
      name: 'Carlos López',
      email: 'carlos.lopez@email.com',
      treatment: 'Ortodoncia',
      detail: 'Brackets metálicos',
      state: 'Activo',
      nextAppointment: '16 Ene',
      progress: 45
    },
    {
      id: 3,
      name: 'Ana Martínez',
      email: 'ana.martinez@email.com',
      treatment: 'Limpieza',
      detail: 'Profilaxis dental',
      state: 'Completado',
      nextAppointment: '—',
      progress: 100
    }
  ]
}
