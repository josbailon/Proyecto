// src/mocks/secretary/patientAssignments.ts
export interface PatientAssignment {
  id: number;
  pacienteId: number;
  estudianteId: number;
  fechaAsignacion: string;
  notas?: string;
  createdAt: string;
  updatedAt: string;
}

export const mockPatientAssignments: PatientAssignment[] = [
  {
    id: 1,
    pacienteId: 1,
    estudianteId: 2,
    fechaAsignacion: '2025-07-18',
    notas: 'Paciente asignado para caso clínico 1',
    createdAt: '2025-07-18',
    updatedAt: '2025-07-18',
  }
];

export async function fetchPatientAssignmentsMock(): Promise<PatientAssignment[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockPatientAssignments;
}

export async function savePatientAssignmentMock(a: PatientAssignment): Promise<void> {
  const index = mockPatientAssignments.findIndex(pa => pa.id === a.id);
  if (index >= 0) {
    mockPatientAssignments[index] = a;
  } else {
    mockPatientAssignments.push({ ...a, id: Date.now() });
  }
}

export async function deletePatientAssignmentMock(id: number): Promise<void> {
  const index = mockPatientAssignments.findIndex(a => a.id === id);
  if (index >= 0) {
    mockPatientAssignments.splice(index, 1);
  }
}
