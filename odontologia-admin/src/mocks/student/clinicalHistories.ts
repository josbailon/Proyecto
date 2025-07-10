import { delay } from '../utils';

export interface ClinicalHistory {
  id: number;
  patientId: number;
  generalData: string;
  dentalHistory: string;
  physicalExam: string;
  allergies: string[];
  medications: string[];
  systemicHistory: string;
  intraoralFindings: string;
  createdAt: string;
  updatedAt: string;
}

let histories: ClinicalHistory[] = [];

/** Obtiene todas las historias clínicas. */
export async function fetchHistoriesMock(): Promise<ClinicalHistory[]> {
  await delay();
  return histories.map(h => ({ ...h }));
}

/** Crea o actualiza una historia clínica. */
export async function saveHistoryMock(
  h: Partial<ClinicalHistory> & Omit<ClinicalHistory, 'id'|'createdAt'|'updatedAt'> & { id?: number }
): Promise<void> {
  await delay();
  if (h.id != null) {
    histories = histories.map(x =>
      x.id === h.id ? { ...x, ...h, updatedAt: new Date().toISOString() } : x
    );
  } else {
    const next = histories.length ? Math.max(...histories.map(x => x.id)) + 1 : 1;
    histories.push({
      id: next,
      ...h,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as ClinicalHistory);
  }
}

/** Elimina una historia clínica por ID. */
export async function deleteHistoryMock(id: number): Promise<void> {
  await delay();
  histories = histories.filter(h => h.id !== id);
}
