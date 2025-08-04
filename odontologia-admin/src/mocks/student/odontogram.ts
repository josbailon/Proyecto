// odontologia-admin/src/mocks/student/odontogram.ts

// --- Tipos ---
export type ToothSurface = 'oclusal' | 'mesial' | 'distal' | 'vestibular' | 'lingual' | 'palatino';
export type ToothCondition = 'sano' | 'caries' | 'restauracion' | 'extraccion' | 'perdido' | 'fractura' | 'ausente' | 'protesis' | 'endodoncia' | 'movilidad' | 'mancha' | 'otro';

export interface ToothStatus {
  condition: ToothCondition;
  note?: string;
  surfaces: Partial<Record<ToothSurface, ToothCondition>>;
}

export interface OdontogramData {
  id: number;
  patientId: number;
  patientName: string;
  patientAge: number;
  dentist: string;
  consultationDate: string;
  teeth: Record<string, ToothStatus>;
  createdAt: string;
  updatedAt: string;
}

// --- Datos simulados ---
let odontogramMock: OdontogramData = {
  id: 1,
  patientId: 1001,
  patientName: 'Juan Pérez',
  patientAge: 29,
  dentist: 'Dra. Silvia Ruiz',
  consultationDate: '2025-08-01',
  teeth: {
    '11': {
      condition: 'caries',
      note: 'Lesión incipiente en vestibular',
      surfaces: { vestibular: 'caries', oclusal: 'sano' }
    },
    '12': { condition: 'sano', surfaces: { oclusal: 'sano' } },
    '13': { condition: 'restauracion', note: 'Resina palatino', surfaces: { palatino: 'restauracion' } },
    '14': { condition: 'sano', surfaces: {} },
    '15': { condition: 'sano', surfaces: {} },
    '16': { condition: 'fractura', note: 'Fractura mesio-distal', surfaces: { mesial: 'fractura', distal: 'fractura' } },
    '17': { condition: 'perdido', note: 'Extraído hace años', surfaces: {} },
    '18': { condition: 'ausente', surfaces: {} },
    // ... Puedes añadir todos los dientes necesarios ...
    '21': { condition: 'sano', surfaces: {} },
    '22': { condition: 'caries', note: 'Caries en oclusal', surfaces: { oclusal: 'caries' } },
    '23': { condition: 'mancha', note: 'Mancha blanca', surfaces: { vestibular: 'mancha' } },
    '24': { condition: 'sano', surfaces: {} },
    '25': { condition: 'sano', surfaces: {} },
    '26': { condition: 'protesis', note: 'Corona metálica', surfaces: { oclusal: 'protesis' } },
    '27': { condition: 'ausente', surfaces: {} },
    '28': { condition: 'ausente', surfaces: {} }
    // Agrega todos los dientes permanentes o temporales según necesites
  },
  createdAt: '2025-07-15T10:00:00Z',
  updatedAt: '2025-08-01T18:00:00Z'
};

// --- Funciones simuladas (mocks) ---
// Todas usan async para simular peticiones a backend

export async function fetchOdontogramMock(patientId: number): Promise<OdontogramData> {
  // Si en un futuro tienes varios pacientes, aquí puedes filtrar por patientId
  if (odontogramMock.patientId === patientId) return { ...odontogramMock };
  throw new Error('Odontograma no encontrado');
}

export async function saveOdontogramMock(data: OdontogramData): Promise<OdontogramData> {
  odontogramMock = { ...data, updatedAt: new Date().toISOString() };
  return { ...odontogramMock };
}

export async function updateToothStatusMock(
  patientId: number,
  toothNumber: string,
  surface: ToothSurface | 'all',
  condition: ToothCondition
): Promise<OdontogramData> {
  if (odontogramMock.patientId !== patientId) throw new Error('Odontograma no encontrado');
  const updated = { ...odontogramMock };
  if (!updated.teeth[toothNumber]) {
    updated.teeth[toothNumber] = { condition: 'sano', surfaces: {} };
  }
  if (surface === 'all') {
    updated.teeth[toothNumber].condition = condition;
    updated.teeth[toothNumber].surfaces = {};
  } else {
    updated.teeth[toothNumber].surfaces = {
      ...updated.teeth[toothNumber].surfaces,
      [surface]: condition
    };
    // Si cambias una superficie, también puedes actualizar el estado general del diente
    updated.teeth[toothNumber].condition = condition;
  }
  updated.updatedAt = new Date().toISOString();
  odontogramMock = updated;
  return { ...odontogramMock };
}

export async function updateToothNoteMock(
  patientId: number,
  toothNumber: string,
  note: string
): Promise<OdontogramData> {
  if (odontogramMock.patientId !== patientId) throw new Error('Odontograma no encontrado');
  const updated = { ...odontogramMock };
  if (!updated.teeth[toothNumber]) {
    updated.teeth[toothNumber] = { condition: 'sano', surfaces: {} };
  }
  updated.teeth[toothNumber].note = note;
  updated.updatedAt = new Date().toISOString();
  odontogramMock = updated;
  return { ...odontogramMock };
}
