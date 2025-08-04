// src/mocks/student/clinicalHistories.ts
import { delay } from '../utils'

// --- Tipos ---
export interface Treatment {
  id: number
  title: string
  description: string
  date: string
  supervisor: string
  observations?: string
}

export interface Patient {
  id: number
  name: string
  age: number
  gender: 'Masculino' | 'Femenino' | 'Otro'
  identification: string
  phone: string
  email?: string
  address?: string
  bloodType?: string
  occupation?: string
}

export interface MedicalHistory {
  allergies: string[]
  medications: string[]
  chronicConditions: string[]
  surgeries: string[]
  familyHistory: string[]
}

export interface DentalHistory {
  lastVisit?: string
  previousTreatments: string[]
  hygieneHabits: string
  complains?: string
}

export interface ClinicalHistory {
  id: number
  patientId: number
  patient: Patient
  medicalHistory: MedicalHistory
  dentalHistory: DentalHistory
  treatments: Treatment[]
  createdAt: string
  updatedAt: string
}

// --- Datos de ejemplo ---
const mockPatients: Patient[] = [
  {
    id: 1,
    name: 'María González',
    age: 35,
    gender: 'Femenino',
    identification: '1234567890',
    phone: '0991234567',
    email: 'maria.gonzalez@example.com',
    bloodType: 'A+',
    occupation: 'Ingeniera'
  },
  {
    id: 2,
    name: 'Carlos López',
    age: 28,
    gender: 'Masculino',
    identification: '0987654321',
    phone: '0997654321',
    email: 'carlos.lopez@example.com',
    bloodType: 'O+',
    occupation: 'Arquitecto'
  }
]

const mockHistories: ClinicalHistory[] = [
  {
    id: 1,
    patientId: 1,
    patient: mockPatients[0],
    medicalHistory: {
      allergies: ['Penicilina', 'Metronidazol'],
      medications: ['Ibuprofeno 400mg'],
      chronicConditions: ['Hipertensión controlada'],
      surgeries: ['Apendicectomía 2010'],
      familyHistory: ['Padre diabético', 'Madre con hipertensión']
    },
    dentalHistory: {
      lastVisit: '2025-06-15',
      previousTreatments: ['Obturaciones en piezas 14 y 15'],
      hygieneHabits: 'Cepillado 2 veces al día, no usa hilo dental',
      complains: 'Sensibilidad en dientes anteriores'
    },
    treatments: [
      {
        id: 1,
        title: 'Limpieza dental',
        description: 'Profilaxis completa con aplicación de flúor',
        date: '2025-07-10',
        supervisor: 'Dr. García',
        observations: 'Encías levemente inflamadas en sector anterior'
      },
      {
        id: 2,
        title: 'Obturación',
        description: 'Restauración de caries en molar superior derecho',
        date: '2025-07-12',
        supervisor: 'Dr. García'
      }
    ],
    createdAt: '2025-07-10T09:30:00',
    updatedAt: '2025-07-12T14:15:00'
  },
  {
    id: 2,
    patientId: 2,
    patient: mockPatients[1],
    medicalHistory: {
      allergies: [],
      medications: ['Metformina 500mg'],
      chronicConditions: ['Diabetes tipo II'],
      surgeries: [],
      familyHistory: ['Madre con diabetes']
    },
    dentalHistory: {
      lastVisit: '2025-06-20',
      previousTreatments: ['Extracción de molar 36'],
      hygieneHabits: 'Cepillado 3 veces al día, usa enjuague bucal',
      complains: 'Ninguna en particular'
    },
    treatments: [
      {
        id: 3,
        title: 'Ortodoncia',
        description: 'Colocación de brackets metálicos',
        date: '2025-07-15',
        supervisor: 'Dra. Pérez',
        observations: 'Paciente tolera bien la aparatología'
      }
    ],
    createdAt: '2025-07-12T11:15:00',
    updatedAt: '2025-07-15T16:30:00'
  }
]

// --- Funciones del Mock ---
let histories = [...mockHistories]

/**
 * Obtiene todas las historias clínicas
 */
export async function fetchClinicalHistoriesMock(): Promise<ClinicalHistory[]> {
  await delay(400)
  return JSON.parse(JSON.stringify(histories)) // Deep clone
}

/**
 * Obtiene una historia clínica por ID
 */
export async function fetchClinicalHistoryByIdMock(id: number): Promise<ClinicalHistory | undefined> {
  await delay(350)
  const history = histories.find(h => h.id === id)
  return history ? JSON.parse(JSON.stringify(history)) : undefined
}

/**
 * Obtiene historias clínicas por ID de paciente
 */
export async function fetchHistoriesByPatientMock(patientId: number): Promise<ClinicalHistory[]> {
  await delay(300)
  return histories
    .filter(h => h.patientId === patientId)
    .map(h => JSON.parse(JSON.stringify(h))) // Deep clone
}

/**
 * Guarda una historia clínica (crea o actualiza)
 */
export async function saveClinicalHistoryMock(
  historyData: Omit<Partial<ClinicalHistory>, 'patientId' | 'patient'> & { 
    patientId: number 
    patient?: Patient
  }
): Promise<ClinicalHistory> {
  await delay(500)
  const now = new Date().toISOString()

  // Extraemos los datos necesarios
  const { patientId, patient, ...restData } = historyData

  if (historyData.id) {
    // Actualización
    const index = histories.findIndex(h => h.id === historyData.id)
    if (index !== -1) {
      const updatedHistory = {
        ...histories[index],
        ...restData,
        patientId,
        patient: patient || histories[index].patient,
        updatedAt: now
      }
      
      histories[index] = updatedHistory
      return JSON.parse(JSON.stringify(updatedHistory))
    }
  }

  // Creación nueva
  const newId = Math.max(0, ...histories.map(h => h.id)) + 1
  const resolvedPatient = patient || mockPatients.find(p => p.id === patientId) || mockPatients[0]

  const newHistory: ClinicalHistory = {
    id: newId,
    patientId,
    patient: resolvedPatient,
    medicalHistory: restData.medicalHistory || {
      allergies: [],
      medications: [],
      chronicConditions: [],
      surgeries: [],
      familyHistory: []
    },
    dentalHistory: restData.dentalHistory || {
      previousTreatments: [],
      hygieneHabits: ''
    },
    treatments: restData.treatments || [],
    createdAt: now,
    updatedAt: now,
    ...restData
  }

  histories.push(newHistory)
  return JSON.parse(JSON.stringify(newHistory))
}

/**
 * Agrega un tratamiento a una historia clínica
 */
export async function addTreatmentToHistoryMock(
  historyId: number,
  treatment: Omit<Treatment, 'id'>
): Promise<ClinicalHistory> {
  await delay(450)
  const index = histories.findIndex(h => h.id === historyId)
  if (index === -1) {
    throw new Error(`Historia clínica con ID ${historyId} no encontrada`)
  }

  const newTreatment = {
    ...treatment,
    id: Math.max(0, ...histories[index].treatments.map(t => t.id)) + 1
  }

  const updatedHistory = {
    ...histories[index],
    treatments: [...histories[index].treatments, newTreatment],
    updatedAt: new Date().toISOString()
  }

  histories[index] = updatedHistory
  return JSON.parse(JSON.stringify(updatedHistory))
}

/**
 * Elimina una historia clínica
 */
export async function deleteClinicalHistoryMock(id: number): Promise<void> {
  await delay(300)
  histories = histories.filter(h => h.id !== id)
}