// src/mocks/secretary/appointments.ts

export interface Appointment {
  id: number;
  pacienteId: number;
  estudianteId: number;
  fecha: string; // formato ISO: '2025-07-18T10:30'
  hora: string;  // formato 'HH:mm'
  notas?: string;
  estado: 'pendiente' | 'confirmada' | 'cancelada';
  createdAt: string;
  updatedAt: string;
}

export const appointments: Appointment[] = [
  {
    id: 1,
    pacienteId: 101,
    estudianteId: 201,
    fecha: '2025-07-20',
    hora: '10:00',
    notas: 'Primera consulta de evaluación.',
    estado: 'pendiente',
    createdAt: '2025-07-15T09:00:00',
    updatedAt: '2025-07-15T09:00:00',
  },
  {
    id: 2,
    pacienteId: 102,
    estudianteId: 202,
    fecha: '2025-07-21',
    hora: '14:30',
    notas: 'Seguimiento de tratamiento de ortodoncia.',
    estado: 'confirmada',
    createdAt: '2025-07-15T09:30:00',
    updatedAt: '2025-07-16T10:15:00',
  },
  {
    id: 3,
    pacienteId: 103,
    estudianteId: 203,
    fecha: '2025-07-22',
    hora: '09:00',
    notas: 'Consulta cancelada por el paciente.',
    estado: 'cancelada',
    createdAt: '2025-07-15T10:00:00',
    updatedAt: '2025-07-17T08:00:00',
  }
]
