import { delay } from '../utils';

export interface OdontogramEntry {
  tooth: string;      // e.g. "11", "12"
  status: 'sano' | 'caries' | 'restaurado' | 'extraido';
  date: string;       // ISO
}

let records: OdontogramEntry[] = [];

/** Obtiene el odontograma completo. */
export async function fetchOdontogramMock(): Promise<OdontogramEntry[]> {
  await delay();
  return records.map(r => ({ ...r }));
}

/** Guarda o actualiza el odontograma. */
export async function saveOdontogramMock(r: OdontogramEntry[]): Promise<void> {
  await delay();
  records = r.map(x => ({ ...x }));
}
