import { delay } from '../utils';

export interface ProfessorAssignment {
  id: number;
  title: string;
  description: string;
  course: string;
  dueDate: string;
  createdAt: string;
}

let assignments: ProfessorAssignment[] = [
  { id: 1, title: 'Informe Caso 1', description: 'Analizar radiografía', course: 'Odontología General', dueDate: '2025-07-20', createdAt: '2025-06-30T10:00:00Z' },
  { id: 2, title: 'Presentación Seminario', description: 'Definir plan de tratamiento', course: 'Endodoncia', dueDate: '2025-07-25', createdAt: '2025-07-01T11:00:00Z' }
];

export async function fetchProfessorAssignmentsMock(): Promise<ProfessorAssignment[]> {
  await delay();
  return assignments.map(a => ({ ...a }));
}

export async function saveProfessorAssignmentMock(a: ProfessorAssignment): Promise<void> {
  await delay();
  if (a.id) {
    assignments = assignments.map(x => x.id === a.id ? { ...a } : x);
  } else {
    const next = assignments.length ? Math.max(...assignments.map(x => x.id)) + 1 : 1;
    assignments.push({ ...a, id: next, createdAt: new Date().toISOString() });
  }
}

export async function deleteProfessorAssignmentMock(id: number): Promise<void> {
  await delay();
  assignments = assignments.filter(a => a.id !== id);
}
