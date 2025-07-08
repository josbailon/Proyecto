import { delay } from '../utils';

export type AppointmentStatus = 'programada' | 'confirmada' | 'cancelada';

export interface Appointment {
  id: number;
  patientId: number;
  studentId: number;
  datetime: string;      // ISO timestamp
  status: AppointmentStatus;
  notes?: string;
}

let appointments: Appointment[] = [
  { id: 1, patientId: 101, studentId: 2, datetime: '2025-07-07T10:00:00Z', status: 'confirmada' },
  { id: 2, patientId: 103, studentId: 4, datetime: '2025-07-08T14:00:00Z', status: 'programada', notes: 'Revisión anual' }
];

/**
 * Obtiene todas las citas.
 */
export async function fetchAppointmentsMock(): Promise<Appointment[]> {
  await delay();
  return appointments.map(a => ({ ...a }));
}

/**
 * Crea o actualiza una cita.
 */
export async function saveAppointmentMock(a: Partial<Appointment> & { patientId: number; studentId: number; datetime: string; status: AppointmentStatus; }): Promise<void> {
  await delay();
  if (a.id) {
    appointments = appointments.map(x => x.id === a.id ? { ...x, ...a } : x);
  } else {
    const next = appointments.length ? Math.max(...appointments.map(x => x.id)) + 1 : 1;
    appointments.push({
      id: next,
      patientId: a.patientId,
      studentId: a.studentId,
      datetime: a.datetime,
      status: a.status,
      notes: a.notes
    });
  }
}

/**
 * Elimina una cita.
 */
export async function deleteAppointmentMock(id: number): Promise<void> {
  await delay();
  appointments = appointments.filter(x => x.id !== id);
}
