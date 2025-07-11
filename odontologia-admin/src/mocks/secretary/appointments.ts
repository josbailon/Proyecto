// src/mocks/secretary/appointments.ts

/**
 * Estados posibles de una cita.
 */
export type AppointmentStatus =
  | 'programada'
  | 'confirmada'
  | 'pendiente'
  | 'cancelada'

/**
 * Representa una cita de paciente gestionada por el secretario.
 */
export interface Appointment {
  id: number
  patientId: number
  studentId: number
  datetime: string       // ISO timestamp o 'YYYY-MM-DDTHH:mm'
  status: AppointmentStatus
  notes?: string
}

/**
 * Base de datos en memoria para las citas.
 */
const appointmentsDB: Appointment[] = [
  {
    id: 1,
    patientId: 101,
    studentId: 201,
    datetime: '2025-07-28T09:00',
    status: 'programada',
    notes: 'Revisión inicial'
  },
  {
    id: 2,
    patientId: 102,
    studentId: 202,
    datetime: '2025-07-28T10:30',
    status: 'confirmada',
    notes: 'Limpieza dental'
  },
  {
    id: 3,
    patientId: 103,
    studentId: 203,
    datetime: '2025-07-29T14:00',
    status: 'pendiente',
    notes: ''
  }
]

/** Simula latencia de red */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Devuelve todas las citas programadas.
 */
export async function fetchAppointmentsMock(): Promise<Appointment[]> {
  await delay(200)
  // Retornamos copias para evitar mutaciones externas
  return appointmentsDB.map(a => ({ ...a }))
}

/**
 * Crea o actualiza una cita.
 */
export async function saveAppointmentMock(
  appt: Appointment
): Promise<Appointment> {
  await delay(200)
  const idx = appointmentsDB.findIndex(a => a.id === appt.id)
  if (idx >= 0) {
    appointmentsDB[idx] = { ...appt }
  } else {
    const nextId = Math.max(0, ...appointmentsDB.map(a => a.id)) + 1
    appt.id = nextId
    appointmentsDB.push({ ...appt })
  }
  return { ...appt }
}

/**
 * Elimina una cita por su ID.
 */
export async function deleteAppointmentMock(id: number): Promise<void> {
  await delay(200)
  const idx = appointmentsDB.findIndex(a => a.id === id)
  if (idx >= 0) appointmentsDB.splice(idx, 1)
}
