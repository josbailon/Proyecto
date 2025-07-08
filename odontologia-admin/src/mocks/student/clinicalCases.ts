import { delay } from '../utils';

export interface ClinicalCase {
  id: number;
  patientId: number;
  title: string;
  description: string;
  stage: 'presentacion' | 'diagnostico' | 'plan' | 'procedimiento' | 'seguimiento';
  attachments: string[]; // URLs ficticias
  notes: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

let cases: ClinicalCase[] = [];

/** Obtiene todos los casos clínicos. */
export async function fetchCasesMock(): Promise<ClinicalCase[]> {
  await delay();
  return cases.map(c => ({ ...c }));
}

/** Crea o actualiza un caso clínico. */
export async function saveCaseMock(c: Partial<ClinicalCase> & Omit<ClinicalCase, 'id'|'createdAt'|'updatedAt'> & { id?: number }): Promise<void> {
  await delay();
  if (c.id != null) {
    cases = cases.map(x => x.id === c.id ? { ...x, ...c, updatedAt: new Date().toISOString() } : x);
  } else {
    const next = cases.length ? Math.max(...cases.map(x => x.id)) + 1 : 1;
    cases.push({
      id: next,
      ...c,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as ClinicalCase);
  }
}

/** Elimina un caso clínico por ID. */
export async function deleteCaseMock(id: number): Promise<void> {
  await delay();
  cases = cases.filter(c => c.id !== id);
}
