import { delay } from '../utils';

export interface StudentProgress {
  studentId: number;
  studentName: string;
  course: string;
  assignmentId: number;
  status: 'pendiente' | 'entregado' | 'corregido';
  grade?: number;
  lastUpdated: string;
}

let progressRecords: StudentProgress[] = [
  { studentId: 2, studentName: 'Jostin Estudiante', course: 'Odontología General', assignmentId: 1, status: 'entregado', grade: 85, lastUpdated: '2025-07-15T14:30:00Z' },
  { studentId: 5, studentName: 'María Pérez',       course: 'Endodoncia',        assignmentId: 2, status: 'pendiente', lastUpdated: '2025-07-14T09:00:00Z' }
];

export async function fetchProgressMock(): Promise<StudentProgress[]> {
  await delay();
  return progressRecords.map(r => ({ ...r }));
}

export async function saveProgressMock(r: StudentProgress): Promise<void> {
  await delay();
  const idx = progressRecords.findIndex(x =>
    x.studentId === r.studentId &&
    x.assignmentId === r.assignmentId
  );
  if (idx > -1) {
    progressRecords[idx] = { ...r };
  } else {
    progressRecords.push({ ...r });
  }
}
