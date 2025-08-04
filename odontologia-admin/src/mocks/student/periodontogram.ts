// src/mocks/student/periodontogram.ts
//ESTE HAY QUE MEJORALO Y HAY QUE HACER PRUEBAS 
// Tipos
export type PeriodontalMeasurement = {
  tooth: string // número o nombre del diente, ej: '11'
  mesial: { pd: number; gi: number }
  distal: { pd: number; gi: number }
  buccal: { pd: number; gi: number }
  lingual: { pd: number; gi: number }
  lastModified?: string // fecha de última edición
}

export type PeriodontogramData = {
  patient: {
    id: number
    name: string
    age: number
    gender: 'Masculino' | 'Femenino' | 'Otro'
    lastVisit: string // fecha ISO
  }
  dentist: string
  consultationDate: string // fecha ISO
  measurements: PeriodontalMeasurement[]
  createdAt: string
  updatedAt: string
  generalNotes?: string
}

// MOCK DATA
let periodontogramMock: PeriodontogramData = {
  patient: {
    id: 101,
    name: 'Carlos Pérez López',
    age: 27,
    gender: 'Masculino',
    lastVisit: '2024-06-22',
  },
  dentist: 'Dra. Ana Ríos',
  consultationDate: '2024-07-01',
  measurements: [
    {
      tooth: '11',
      mesial: { pd: 2, gi: 0 },
      distal: { pd: 2, gi: 0 },
      buccal: { pd: 1, gi: 0 },
      lingual: { pd: 1, gi: 0 },
      lastModified: '2024-07-01T09:00:00Z',
    },
    {
      tooth: '12',
      mesial: { pd: 3, gi: 1 },
      distal: { pd: 2, gi: 0 },
      buccal: { pd: 2, gi: 0 },
      lingual: { pd: 2, gi: 0 },
      lastModified: '2024-07-01T09:05:00Z',
    },
    // ...añade más dientes según necesidad
  ],
  createdAt: '2024-07-01T08:55:00Z',
  updatedAt: '2024-07-01T09:10:00Z',
  generalNotes: 'Leve inflamación gingival en el cuadrante superior derecho.',
}

// --- Funciones Mock ---

/**
 * Devuelve el periodontograma para un paciente dado
 */
export async function fetchPeriodontogramMock(patientId: number): Promise<PeriodontogramData | null> {
  // En un sistema real aquí filtrarías por patientId, aquí solo se compara con el mock
  if (periodontogramMock.patient.id === patientId) {
    return JSON.parse(JSON.stringify(periodontogramMock))
  }
  return null
}

/**
 * Guarda un periodontograma (mock)
 */
export async function savePeriodontogramMock(data: PeriodontogramData): Promise<PeriodontogramData> {
  periodontogramMock = JSON.parse(JSON.stringify(data))
  return periodontogramMock
}

/**
 * Actualiza mediciones de un diente específico
 */
export async function updateToothMeasurementsMock(
  patientId: number,
  toothNumber: string,
  measurements: Partial<PeriodontalMeasurement>
): Promise<PeriodontogramData> {
  if (periodontogramMock.patient.id !== patientId) throw new Error('Paciente no encontrado')

  const idx = periodontogramMock.measurements.findIndex(m => m.tooth === toothNumber)
  if (idx === -1) {
    // Si no existe el diente, lo añade
    periodontogramMock.measurements.push({
      tooth: toothNumber,
      mesial: { pd: 0, gi: 0 },
      distal: { pd: 0, gi: 0 },
      buccal: { pd: 0, gi: 0 },
      lingual: { pd: 0, gi: 0 },
      ...measurements,
      lastModified: new Date().toISOString(),
    })
  } else {
    periodontogramMock.measurements[idx] = {
      ...periodontogramMock.measurements[idx],
      ...measurements,
      lastModified: new Date().toISOString(),
    }
  }
  periodontogramMock.updatedAt = new Date().toISOString()
  return JSON.parse(JSON.stringify(periodontogramMock))
}

/**
 * Actualiza notas generales
 */
export async function updateGeneralNotesMock(
  patientId: number,
  notes: string
): Promise<PeriodontogramData> {
  if (periodontogramMock.patient.id !== patientId) throw new Error('Paciente no encontrado')
  periodontogramMock.generalNotes = notes
  periodontogramMock.updatedAt = new Date().toISOString()
  return JSON.parse(JSON.stringify(periodontogramMock))
}
