// src/mocks/secretary/patientAssignments.ts

/**
 * Representa la asignación de un paciente a un estudiante
 */
export interface PatientAssignment {
  /** Identificador único de la asignación */
  id: number;
  /** ID del estudiante al que se asigna el paciente */
  studentId: number;
  /** ID del paciente asignado */
  patientId: number;
  /** Fecha y hora de la asignación en formato ISO8601 (YYYY-MM-DDThh:mm) */
  assignedAt: string;
  /** Notas o comentarios adicionales */
  notes?: string;
}

// Simulamos una base de datos en memoria
const _assignmentsDB: PatientAssignment[] = [
  {
    id: 1,
    studentId: 101,
    patientId: 201,
    assignedAt: '2025-07-15T09:30',
    notes: 'Revisión inicial odontológica.'
  },
  {
    id: 2,
    studentId: 102,
    patientId: 202,
    assignedAt: '2025-07-15T11:00',
    notes: ''
  },
  // …otros registros de ejemplo…
];

/** Retardo auxiliar para simular latencia */
function delay(ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}

/**
 * Devuelve todas las asignaciones actuales.
 */
export async function fetchPatientAssignmentsMock(): Promise<PatientAssignment[]> {
  await delay(200);
  // Devolvemos copias para evitar mutaciones exteriores
  return _assignmentsDB.map(a => ({ ...a }));
}

/**
 * Crea o actualiza una asignación.
 */
export async function savePatientAssignmentMock(
  assignment: PatientAssignment
): Promise<PatientAssignment> {
  await delay(200);
  const idx = _assignmentsDB.findIndex(a => a.id === assignment.id);
  if (idx >= 0) {
    // Actualizar existente
    _assignmentsDB[idx] = { ...assignment };
  } else {
    // Asignar nuevo ID incremental
    const nextId = Math.max(0, ..._assignmentsDB.map(a => a.id)) + 1;
    _assignmentsDB.push({ ...assignment, id: nextId });
    assignment.id = nextId;
  }
  return { ...assignment };
}

/**
 * Elimina una asignación por su ID.
 */
export async function deletePatientAssignmentMock(id: number): Promise<void> {
  await delay(200);
  const idx = _assignmentsDB.findIndex(a => a.id === id);
  if (idx >= 0) {
    _assignmentsDB.splice(idx, 1);
  }
}
