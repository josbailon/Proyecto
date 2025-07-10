// src/mocks/student/odontogram.ts

import { delay } from '../utils';

/**
 * Estado posible de un diente en el odontograma.
 */
export type ToothStatus =
  | 'sano'
  | 'caries'
  | 'restaurado'
  | 'extraido'
  | 'sellante'
  | 'tratado';

/**
 * Representa una entrada en el odontograma de un paciente.
 */
export interface OdontogramEntry {
  /** Identificador único de la entrada */
  id: string;
  /** ID del paciente al que pertenece */
  patientId: number;
  /** Notación del diente (FDI o similar) */
  tooth: string;
  /** Estado actual del diente */
  status: ToothStatus;
  /** Comentarios o anotaciones adicionales */
  annotations?: string;
  /** Fecha de creación */
  createdAt: string;
  /** Fecha de última modificación */
  updatedAt: string;
}

/**
 * Datos simulados: cada paciente tiene su array de entradas.
 */
const odontograms: Record<number, OdontogramEntry[]> = {};

/**
 * Genera un ID pseudo-único para las entradas.
 */
function generateId(patientId: number, tooth: string): string {
  return `${patientId}-${tooth}-${Date.now().toString(36)}`;
}

/**
 * Obtiene todas las entradas del odontograma para un paciente dado.
 * @param patientId ID del paciente
 */
export async function fetchOdontogramMock(patientId: number): Promise<OdontogramEntry[]> {
  await delay();
  // Devolver copia para evitar mutaciones externas
  return (odontograms[patientId] ?? []).map(entry => ({ ...entry }));
}

/**
 * Guarda una nueva entrada de odontograma o actualiza una existente.
 * Si `entry.id` existe, se actualiza; si no, se crea una nueva.
 * @param patientId ID del paciente
 * @param entry Datos parciales de la entrada (debe incluir tooth y status)
 */
export async function saveOdontogramEntryMock(
  patientId: number,
  entry: Partial<OdontogramEntry> & { tooth: string; status: ToothStatus }
): Promise<OdontogramEntry> {
  await delay();

  // Asegurar existencia del array para el paciente
  if (!odontograms[patientId]) {
    odontograms[patientId] = [];
  }

  // Actualizar si existe ID
  if (entry.id) {
    const list = odontograms[patientId];
    const idx = list.findIndex(e => e.id === entry.id);
    if (idx !== -1) {
      const updated = {
        ...list[idx],
        ...entry,
        updatedAt: new Date().toISOString()
      };
      list[idx] = updated;
      return { ...updated };
    }
  }

  // Crear nuevo
  const now = new Date().toISOString();
  const newEntry: OdontogramEntry = {
    id: generateId(patientId, entry.tooth),
    patientId,
    tooth: entry.tooth,
    status: entry.status,
    annotations: entry.annotations,
    createdAt: now,
    updatedAt: now
  };
  odontograms[patientId].push(newEntry);
  return { ...newEntry };
}

/**
 * Elimina una entrada del odontograma por su ID.
 * @param patientId ID del paciente
 * @param entryId ID de la entrada a eliminar
 */
export async function deleteOdontogramEntryMock(
  patientId: number,
  entryId: string
): Promise<void> {
  await delay();
  if (!odontograms[patientId]) return;
  odontograms[patientId] = odontograms[patientId].filter(e => e.id !== entryId);
}

/**
 * Reemplaza todo el odontograma de un paciente con un nuevo conjunto de entradas.
 * Útil para sincronización completa.
 * @param patientId ID del paciente
 * @param entries Lista completa de entradas (sin `id`, `createdAt`, `updatedAt`)
 */
export async function saveFullOdontogramMock(
  patientId: number,
  entries: Array<Partial<OdontogramEntry> & { tooth: string; status: ToothStatus; annotations?: string }>
): Promise<void> {
  await delay();

  // Mapear cada entrada recibida a una OdontogramEntry completa
  const now = new Date().toISOString();
  odontograms[patientId] = entries.map(e => ({
    id: generateId(patientId, e.tooth),
    patientId,
    tooth: e.tooth,
    status: e.status,
    annotations: e.annotations,
    createdAt: now,
    updatedAt: now
  }));
}
