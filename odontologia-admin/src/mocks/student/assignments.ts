// src/mocks/student/assignments.ts
import { delay } from '../utils'

// --- Tipos ---
export type AssignmentStatus = 'Pendiente' | 'En progreso' | 'Completada'

export interface Assignment {
  id: number
  subject: string
  title: string
  description: string
  professor: string
  deadline: string
  status: AssignmentStatus
  progress: number
  files: string[]
  instructions?: string
  evaluationCriteria?: string
}

// --- Datos de ejemplo ---
const mockData: Assignment[] = [
  {
    id: 1,
    subject: 'Endodoncia',
    title: 'Informe de caso clínico',
    description: 'Desarrollar un informe detallado sobre un tratamiento de conducto.',
    professor: 'Dra. Pérez',
    deadline: '2025-07-30',
    status: 'Pendiente',
    progress: 0,
    files: [],
    instructions: 'Incluir fotos pre y post tratamiento, radiografías y descripción paso a paso.',
    evaluationCriteria: 'Originalidad (20%), Profundidad (30%), Presentación (20%), Corrección técnica (30%)'
  },
  {
    id: 2,
    subject: 'Ortodoncia',
    title: 'Presentación PowerPoint',
    description: 'Crear presentación sobre técnicas modernas de ortodoncia.',
    professor: 'Dr. García',
    deadline: '2025-07-20',
    status: 'En progreso',
    progress: 50,
    files: ['uploads/ppt_ortodoncia.pdf'],
    instructions: 'Mínimo 15 diapositivas, incluir casos clínicos reales.',
    evaluationCriteria: 'Contenido (40%), Diseño (30%), Presentación oral (30%)'
  },
  {
    id: 3,
    subject: 'Periodoncia',
    title: 'Registro fotográfico',
    description: 'Subir fotografías clínicas antes y después de limpieza profunda.',
    professor: 'Dra. Moreno',
    deadline: '2025-07-15',
    status: 'Completada',
    progress: 100,
    files: ['uploads/fotos_caso1.jpg', 'uploads/informe_periodontal.pdf'],
    instructions: 'Incluir sondajes, índices periodontales y plan de tratamiento.',
    evaluationCriteria: 'Calidad fotográfica (30%), Documentación (40%), Análisis (30%)'
  }
]

// --- Funciones del Mock ---
let assignments = [...mockData]

/**
 * Obtiene todas las asignaciones
 */
export async function fetchAssignmentsMock(): Promise<Assignment[]> {
  await delay(300) // Simula retardo de red
  return [...assignments] // Devuelve copia
}

/**
 * Guarda una asignación (crea o actualiza)
 */
export async function saveAssignmentMock(assignment: Assignment): Promise<Assignment> {
  await delay(500)
  
  if (assignment.id) {
    // Actualización
    const index = assignments.findIndex(a => a.id === assignment.id)
    if (index !== -1) {
      assignments[index] = assignment
      return {...assignment}
    }
  }

  // Creación nueva
  const newId = Math.max(0, ...assignments.map(a => a.id)) + 1
  const newAssignment: Assignment = {
    ...assignment,
    id: newId,
    status: 'Pendiente',
    progress: 0,
    files: []
  }
  
  assignments.push(newAssignment)
  return {...newAssignment}
}

/**
 * Cambia el estado de una asignación
 */
export async function updateAssignmentStatusMock(id: number, status: AssignmentStatus): Promise<Assignment> {
  await delay(300)
  
  const assignment = assignments.find(a => a.id === id)
  if (!assignment) {
    throw new Error(`Asignación con id ${id} no encontrada`)
  }

  // Actualizar progreso según estado
  let progress = assignment.progress
  if (status === 'Pendiente') progress = 0
  else if (status === 'En progreso') progress = Math.max(50, progress)
  else if (status === 'Completada') progress = 100

  const updated = {
    ...assignment,
    status,
    progress
  }

  assignments = assignments.map(a => a.id === id ? updated : a)
  return {...updated}
}

/**
 * Agrega un archivo a una asignación
 */
export async function addAssignmentFileMock(assignmentId: number, filename: string): Promise<Assignment> {
  await delay(400)
  
  const assignment = assignments.find(a => a.id === assignmentId)
  if (!assignment) {
    throw new Error(`Asignación con id ${assignmentId} no encontrada`)
  }

  const updated = {
    ...assignment,
    files: [...assignment.files, filename],
    status: assignment.status === 'Pendiente' ? 'En progreso' : assignment.status,
    progress: Math.min(assignment.progress + 25, 100)
  }

  assignments = assignments.map(a => a.id === assignmentId ? updated : a)
  return {...updated}
}

/**
 * Elimina una asignación
 */
export async function deleteAssignmentMock(id: number): Promise<void> {
  await delay(300)
  assignments = assignments.filter(a => a.id !== id)
}