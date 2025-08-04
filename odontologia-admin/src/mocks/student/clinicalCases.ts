// src/mocks/student/clinicalCases.ts
import { delay } from '../utils'

// --- Tipos ---
export type ClinicalCaseStatus =
  | 'pendiente_general'
  | 'pendiente_especialidad'
  | 'aprobado'
  | 'completado'

export type CaseStage = 
  | 'presentacion'
  | 'diagnostico'
  | 'plan'
  | 'procedimiento'
  | 'seguimiento'

export interface CaseQuestion {
  id: string
  label: string
  answer?: string
  approved?: boolean
  feedback?: string
}

export interface Procedure {
  code: string
  teeth?: string
  description: string
}

export interface Prescription {
  id: number
  drug: string
  dose: string
}

export interface CaseAppointment {
  id: number
  date: string
  status: 'pendiente' | 'confirmada' | 'cancelada'
  notes?: string
}

export interface CaseComment {
  by: string
  at: string
  text: string
}

export interface OdontogramEntry {
  tooth: string
  status: 'sano' | 'caries' | 'restaurado' | 'extraido'
  annotations?: string
}

export interface PeriodontogramEntry {
  tooth: string
  probingDepth: number
  attachmentLevel: number
}

export interface ClinicalCase {
  id: number
  patientId: number
  patientName: string
  title: string
  stage: CaseStage
  reason: string
  symptoms: string
  notes?: string
  specialist?: string
  generalQuestions: CaseQuestion[]
  specialistQuestions: CaseQuestion[]
  procedures: Procedure[]
  prescriptions: Prescription[]
  appointments: CaseAppointment[]
  comments: CaseComment[]
  odontogram: OdontogramEntry[]
  periodontogram: PeriodontogramEntry[]
  status: ClinicalCaseStatus
  createdAt: string
  updatedAt: string
}

// --- Datos de ejemplo ---
const mockCases: ClinicalCase[] = [
  {
    id: 1,
    patientId: 1,
    patientName: 'María González',
    title: 'Dolor en molar superior derecho',
    stage: 'diagnostico',
    reason: 'Dolor agudo al masticar',
    symptoms: 'Sensibilidad al frío y calor, dolor espontáneo',
    notes: 'Posible pulpitis irreversible',
    specialist: 'Dr. Pérez',
    generalQuestions: [
      { id: 'g1', label: 'Motivo de consulta', answer: 'Dolor molar superior derecho', approved: true },
      { id: 'g2', label: 'Pulso (lpm)', answer: '72', approved: true },
      { id: 'g3', label: 'Frecuencia respiratoria (rpm)', answer: '16', approved: false }
    ],
    specialistQuestions: [
      { id: 's1', label: 'Sensibilidad al frío', answer: 'Positiva', approved: true },
      { id: 's2', label: 'Sensibilidad al calor', answer: 'Positiva', approved: false }
    ],
    procedures: [
      { code: 'E123', teeth: '16', description: 'Endodoncia unirradicular' }
    ],
    prescriptions: [
      { id: 1, drug: 'Ibuprofeno 400mg', dose: 'Cada 8h por 3 días' }
    ],
    appointments: [
      { id: 1, date: '2025-07-22T09:00:00', status: 'confirmada', notes: 'Traer radiografías' }
    ],
    comments: [
      { by: 'Prof. López', at: '2025-07-21T10:15:00', text: 'Revisar radiografía antes del procedimiento' }
    ],
    odontogram: [
      { tooth: '16', status: 'caries', annotations: 'Lesión oclusal' }
    ],
    periodontogram: [
      { tooth: '16', probingDepth: 4, attachmentLevel: 3 }
    ],
    status: 'pendiente_general',
    createdAt: '2025-07-20T08:00:00',
    updatedAt: '2025-07-20T08:00:00'
  },
  {
    id: 2,
    patientId: 2,
    patientName: 'Carlos López',
    title: 'Revisión de brackets',
    stage: 'seguimiento',
    reason: 'Ajuste mensual de ortodoncia',
    symptoms: 'Sin dolor, molestias leves',
    specialist: 'Dra. Gómez',
    generalQuestions: [
      { id: 'g1', label: '¿Ha tenido sangrado de encías?', answer: 'No', approved: true }
    ],
    specialistQuestions: [
      { id: 's1', label: '¿Se siente presión en los alambres?', answer: 'Ligera presión', approved: true }
    ],
    procedures: [
      { code: 'O110', description: 'Ajuste de brackets' }
    ],
    prescriptions: [],
    appointments: [
      { id: 2, date: '2025-07-25T11:00:00', status: 'pendiente' }
    ],
    comments: [],
    odontogram: [],
    periodontogram: [],
    status: 'pendiente_especialidad',
    createdAt: '2025-06-20T09:00:00',
    updatedAt: '2025-07-20T09:00:00'
  }
]

// --- Funciones del Mock ---
let cases = [...mockCases]

/**
 * Obtiene todos los casos clínicos
 */
export async function fetchCasesMock(): Promise<ClinicalCase[]> {
  await delay(350)
  return [...cases]
}

/**
 * Obtiene un caso clínico por ID
 */
export async function fetchCaseByIdMock(id: number): Promise<ClinicalCase | undefined> {
  await delay(300)
  return cases.find(c => c.id === id)
}

/**
 * Guarda un caso clínico (crea o actualiza)
 */
export async function saveCaseMock(caseData: Partial<ClinicalCase>): Promise<ClinicalCase> {
  await delay(500)
  const now = new Date().toISOString()

  if (caseData.id) {
    // Actualización
    const index = cases.findIndex(c => c.id === caseData.id)
    if (index !== -1) {
      cases[index] = {
        ...cases[index],
        ...caseData,
        updatedAt: now
      } as ClinicalCase
      return { ...cases[index] }
    }
  }

  // Creación nueva
  const newId = Math.max(0, ...cases.map(c => c.id)) + 1
  const newCase: ClinicalCase = {
    ...caseData as ClinicalCase,
    id: newId,
    generalQuestions: [],
    specialistQuestions: [],
    procedures: [],
    prescriptions: [],
    appointments: [],
    comments: [],
    odontogram: [],
    periodontogram: [],
    status: 'pendiente_general',
    createdAt: now,
    updatedAt: now
  }

  cases.push(newCase)
  return { ...newCase }
}

/**
 * Actualiza el estado de un caso clínico
 */
export async function updateCaseStatusMock(id: number, status: ClinicalCaseStatus): Promise<ClinicalCase> {
  await delay(400)
  const index = cases.findIndex(c => c.id === id)
  if (index === -1) {
    throw new Error(`Caso clínico con ID ${id} no encontrado`)
  }

  const updatedCase = {
    ...cases[index],
    status,
    updatedAt: new Date().toISOString()
  }

  cases[index] = updatedCase
  return { ...updatedCase }
}

/**
 * Agrega un comentario a un caso clínico
 */
export async function addCaseCommentMock(caseId: number, comment: Omit<CaseComment, 'at'>): Promise<ClinicalCase> {
  await delay(300)
  const index = cases.findIndex(c => c.id === caseId)
  if (index === -1) {
    throw new Error(`Caso clínico con ID ${caseId} no encontrado`)
  }

  const newComment = {
    ...comment,
    at: new Date().toISOString()
  }

  const updatedCase = {
    ...cases[index],
    comments: [...cases[index].comments, newComment],
    updatedAt: new Date().toISOString()
  }

  cases[index] = updatedCase
  return { ...updatedCase }
}

/**
 * Elimina un caso clínico
 */
export async function deleteCaseMock(id: number): Promise<void> {
  await delay(300)
  cases = cases.filter(c => c.id !== id)
}