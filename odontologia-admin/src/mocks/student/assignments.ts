// src/mocks/student/assignments.ts
import { delay } from '../utils';

export interface Assignment {
  id: number;
  title: string;
  dueDate: string;     // ISO timestamp
  status: 'pendiente' | 'entregado' | 'corregido';
}

let tasks: Assignment[] = [];

/** Obtiene todas las tareas académicas. */
export async function fetchAssignmentsMock(): Promise<Assignment[]> {
  await delay();
  return tasks.map(t => ({ ...t }));
}

/** Crea o actualiza una tarea (nueva o existente). */
export async function saveAssignmentMock(
  a: Partial<Assignment> & Omit<Assignment, 'id'> & { id?: number }
): Promise<void> {
  await delay();
  if (a.id != null) {
    tasks = tasks.map(x => (x.id === a.id ? { ...x, ...a } : x));
  } else {
    const next = tasks.length ? Math.max(...tasks.map(x => x.id)) + 1 : 1;
    tasks.push({ id: next, ...a } as Assignment);
  }
}

/** Elimina una tarea por ID. */
export async function deleteAssignmentMock(id: number): Promise<void> {
  await delay();
  tasks = tasks.filter(t => t.id !== id);
}
