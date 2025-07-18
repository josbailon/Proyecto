// src/mocks/secretary/appointments.ts

import type { Appointment } from '../../mocks/api';

/**
 * Lista simulada de citas médicas para pruebas en el sistema.
 */
export const sampleAppointments: Appointment[] = [
  {
    id: 1,
    studentId: 2,
    patientId: 101,
    datetime: '2025-07-20T08:30:00Z',
    status: 'pendiente',
    notes: 'Primera evaluación general del paciente'
  },
  {
    id: 2,
    studentId: 2,
    patientId: 102,
    datetime: '2025-07-21T10:00:00Z',
    status: 'confirmada',
    notes: 'Control de ortodoncia'
  },
  {
    id: 3,
    studentId: 3,
    patientId: 103,
    datetime: '2025-07-22T14:00:00Z',
    status: 'cancelada',
    notes: 'Paciente no asistió a la cita'
  },
  {
    id: 4,
    studentId: 4,
    patientId: 104,
    datetime: '2025-07-23T09:45:00Z',
    status: 'pendiente',
    notes: 'Evaluación para tratamiento de endodoncia'
  },
  {
    id: 5,
    studentId: 3,
    patientId: 105,
    datetime: '2025-07-24T11:15:00Z',
    status: 'confirmada',
    notes: 'Revisión post-tratamiento'
  }
];
