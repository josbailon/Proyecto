import { delay } from '../utils';

export interface PatientAssignment {
  id: number;
  studentId: number;
  patientId: number;
  assignedAt: string;    // ISO timestamp
  notes?: string;
}

let assignments: PatientAssignment[] = [
  { id: 1, studentId: 2, patientId: 101, assignedAt: '2025-07-01T09:00:00Z', notes: 'Caso de endodoncia' },
  { id: 2, studentId: 3, patientId: 102, assignedAt: '2025-07-02T11:30:00Z' }
];

/**
 * Obtiene todas las asignaciones de pacientes.
 */
export async function fetchPatientAssignmentsMock(): Promise<PatientAssignment[]> {
  await delay();
  return assignments.map(a => ({ ...a }));
}

/**
 * Crea o actualiza una asignación de paciente.
 */
export async function savePatientAssignmentMock(a: Partial<PatientAssignment> & { studentId: number; patientId: number; }): Promise<void> {
  await delay();
  if (a.id) {
    assignments = assignments.map(x => x.id === a.id ? { ...x, ...a, assignedAt: new Date().toISOString() } : x);
  } else {
    const next = assignments.length ? Math.max(...assignments.map(x => x.id)) + 1 : 1;
    assignments.push({
      id: next,
      studentId: a.studentId,
      patientId: a.patientId,
      assignedAt: new Date().toISOString(),
      notes: a.notes
    });
  }
}

/**
 * Elimina una asignación de paciente.
 */
export async function deletePatientAssignmentMock(id: number): Promise<void> {
  await delay();
  assignments = assignments.filter(x => x.id !== id);
}
