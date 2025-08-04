// src/mocks/student/patients.ts
import { delay } from '../utils'
import type { Treatment } from './clinicalHistories'


// --- Tipos ---
export interface Patient {
  id: number
  name: string
  age: number
  gender: 'Masculino' | 'Femenino' | 'Otro' | 'No especificado'
  identification: string
  phone: string
  email?: string
  address?: string
  bloodType?: string
  occupation?: string
  allergies: string[]
  medications: string[]
  medicalConditions: string[]
  lastVisit?: string
  nextAppointment?: string
  treatments: Treatment[]
  notes?: string
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
    address: 'Av. Principal 123, Ciudad',
    bloodType: 'A+',
    occupation: 'Ingeniera',
    allergies: ['Penicilina', 'Metronidazol'],
    medications: ['Ibuprofeno 400mg'],
    medicalConditions: ['Hipertensión controlada'],
    lastVisit: '2025-07-15',
    nextAppointment: '2025-08-20',
    treatments: [
      {
        id: 1,
        title: 'Limpieza dental',
        description: 'Profilaxis completa con aplicación de flúor',
        date: '2025-07-10',
        supervisor: 'Dr. García',
        observations: 'Encías levemente inflamadas en sector anterior'
      }
    ],
    notes: 'Paciente requiere seguimiento por sensibilidad dental'
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
    occupation: 'Arquitecto',
    allergies: [],
    medications: ['Metformina 500mg'],
    medicalConditions: ['Diabetes tipo II'],
    lastVisit: '2025-07-18',
    nextAppointment: '2025-08-25',
    treatments: [
      {
        id: 2,
        title: 'Ortodoncia',
        description: 'Colocación de brackets metálicos',
        date: '2025-07-15',
        supervisor: 'Dra. Pérez',
        observations: 'Paciente tolera bien la aparatología'
      }
    ]
  },
  {
    id: 3,
    name: 'Ana Rodríguez',
    age: 42,
    gender: 'Femenino',
    identification: '1122334455',
    phone: '0987654322',
    email: 'ana.rodriguez@example.com',
    address: 'Calle Secundaria 456, Ciudad',
    bloodType: 'B-',
    occupation: 'Docente',
    allergies: ['Latex'],
    medications: ['Paracetamol'],
    medicalConditions: [],
    lastVisit: '2025-07-20',
    treatments: [
      {
        id: 3,
        title: 'Extracción dental',
        description: 'Extracción de molar inferior derecho',
        date: '2025-07-20',
        supervisor: 'Dr. Martínez',
        observations: 'Procedimiento sin complicaciones'
      }
    ],
    notes: 'Volver para control post-extracción en 1 semana'
  }
]

// --- Funciones del Mock ---
let patients = [...mockPatients]

/**
 * Obtiene todos los pacientes
 */
export async function fetchPatientsMock(): Promise<Patient[]> {
  await delay(400)
  return JSON.parse(JSON.stringify(patients))
}

/**
 * Busca pacientes por término
 */
export async function searchPatientsMock(term: string): Promise<Patient[]> {
  await delay(350)
  const lowerTerm = term.toLowerCase()
  return JSON.parse(JSON.stringify(
    patients.filter(p =>
      p.name.toLowerCase().includes(lowerTerm) ||
      p.identification.includes(term) ||
      p.phone.includes(term) ||
      p.email?.toLowerCase().includes(lowerTerm)
    )
  ))
}

/**
 * Obtiene un paciente por ID
 */
export async function fetchPatientByIdMock(id: number): Promise<Patient | undefined> {
  await delay(300)
  const patient = patients.find(p => p.id === id)
  return patient ? JSON.parse(JSON.stringify(patient)) : undefined
}

/**
 * Crea un nuevo paciente
 */
export async function createPatientMock(patientData: Omit<Patient, 'id' | 'treatments'> & { treatments?: Treatment[] }): Promise<Patient> {
  await delay(500)
  const newId = Math.max(0, ...patients.map(p => p.id)) + 1
  const now = new Date().toISOString().split('T')[0]
  
  const newPatient: Patient = {
    ...patientData,
    id: newId,
    lastVisit: now,
    treatments: patientData.treatments || []
  }

  patients.push(newPatient)
  return JSON.parse(JSON.stringify(newPatient))
}

/**
 * Actualiza un paciente existente
 */
export async function updatePatientMock(id: number, patientData: Partial<Patient>): Promise<Patient> {
  await delay(450)
  const index = patients.findIndex(p => p.id === id)
  
  if (index === -1) {
    throw new Error(`Paciente con ID ${id} no encontrado`)
  }

  const updatedPatient = {
    ...patients[index],
    ...patientData
  }

  patients[index] = updatedPatient
  return JSON.parse(JSON.stringify(updatedPatient))
}

/**
 * Elimina un paciente
 */
export async function deletePatientMock(id: number): Promise<void> {
  await delay(400)
  patients = patients.filter(p => p.id !== id)
}

/**
 * Obtiene los tratamientos de un paciente
 */
export async function fetchPatientTreatmentsMock(patientId: number): Promise<Treatment[]> {
  await delay(350)
  const patient = patients.find(p => p.id === patientId)
  if (!patient) {
    throw new Error(`Paciente con ID ${patientId} no encontrado`)
  }
  return JSON.parse(JSON.stringify(patient.treatments))
}

/**
 * Agrega un tratamiento a un paciente
 */
export async function addPatientTreatmentMock(patientId: number, treatment: Omit<Treatment, 'id'>): Promise<Treatment> {
  await delay(400)
  const index = patients.findIndex(p => p.id === patientId)
  
  if (index === -1) {
    throw new Error(`Paciente con ID ${patientId} no encontrado`)
  }

  const newTreatment = {
    ...treatment,
    id: Math.max(0, ...patients[index].treatments.map(t => t.id)) + 1
  }

  patients[index].treatments.push(newTreatment)
  return JSON.parse(JSON.stringify(newTreatment))
}

/**
 * Actualiza la última visita de un paciente
 */
export async function updateLastVisitMock(patientId: number, date: string): Promise<Patient> {
  await delay(300)
  const index = patients.findIndex(p => p.id === patientId)
  
  if (index === -1) {
    throw new Error(`Paciente con ID ${patientId} no encontrado`)
  }

  patients[index].lastVisit = date
  return JSON.parse(JSON.stringify(patients[index]))
}

/**
 * Programa una próxima cita
 */
export async function scheduleAppointmentMock(patientId: number, date: string): Promise<Patient> {
  await delay(350)
  const index = patients.findIndex(p => p.id === patientId)
  
  if (index === -1) {
    throw new Error(`Paciente con ID ${patientId} no encontrado`)
  }

  patients[index].nextAppointment = date
  return JSON.parse(JSON.stringify(patients[index]))
}