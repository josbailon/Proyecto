// src/mocks/student/resources.ts
import { delay } from '../utils'

// --- Tipos ---
export type ResourceType = 
  | 'PDF'
  | 'Guía'
  | 'Retroalimentación' 
  | 'Formulario'
  | 'Presentación'
  | 'Video'
  | 'Plantilla'

export type ResourceCategory =
  | 'Endodoncia'
  | 'Ortodoncia'
  | 'Periodoncia'
  | 'Cirugía'
  | 'Odontopediatría'
  | 'Radiología'
  | 'Materiales'

export interface Resource {
  id: number
  title: string
  description: string
  type: ResourceType
  category: ResourceCategory
  fileUrl: string
  fileSize: string
  fileType: string
  uploadDate: string
  uploadedBy: string
  lastUpdated?: string
  relatedSubjects?: string[]
  isFavorite?: boolean
  downloads?: number
}

// --- Datos de ejemplo ---
const mockResources: Resource[] = [
  {
    id: 1,
    title: 'Protocolo de Endodoncia Paso a Paso',
    description: 'Guía completa para procedimientos endodónticos con imágenes ilustrativas',
    type: 'PDF',
    category: 'Endodoncia',
    fileUrl: '/resources/protocolo-endodoncia.pdf',
    fileSize: '2.4 MB',
    fileType: 'application/pdf',
    uploadDate: '2025-07-10',
    uploadedBy: 'Dr. Pérez',
    lastUpdated: '2025-07-12',
    relatedSubjects: ['Endodoncia I', 'Técnicas Quirúrgicas'],
    downloads: 124
  },
  {
    id: 2,
    title: 'Guía de Ortodoncia Interceptiva',
    description: 'Manual completo sobre técnicas de ortodoncia interceptiva en adolescentes',
    type: 'Guía',
    category: 'Ortodoncia',
    fileUrl: '/resources/guia-ortodoncia-interceptiva.pdf',
    fileSize: '3.1 MB',
    fileType: 'application/pdf',
    uploadDate: '2025-07-15',
    uploadedBy: 'Dra. Gómez',
    downloads: 87
  },
  {
    id: 3,
    title: 'Formulario de Consentimiento Informado',
    description: 'Documento estándar para procedimientos quirúrgicos odontológicos',
    type: 'Formulario',
    category: 'Cirugía',
    fileUrl: '/resources/consentimiento-quirurgico.docx',
    fileSize: '0.5 MB',
    fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    uploadDate: '2025-06-20',
    uploadedBy: 'Departamento Legal',
    downloads: 215
  },
  {
    id: 4,
    title: 'Presentación: Nuevos Materiales Dentales',
    description: 'Resumen de los últimos avances en materiales de restauración dental',
    type: 'Presentación',
    category: 'Materiales',
    fileUrl: '/resources/nuevos-materiales.pptx',
    fileSize: '5.2 MB',
    fileType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    uploadDate: '2025-07-05',
    uploadedBy: 'Dr. Hernández',
    downloads: 56
  },
  {
    id: 5,
    title: 'Retroalimentación Caso Clínico #45',
    description: 'Evaluación detallada del caso clínico presentado el 10/07/2025',
    type: 'Retroalimentación',
    category: 'Periodoncia',
    fileUrl: '/resources/retro-caso-45.pdf',
    fileSize: '1.8 MB',
    fileType: 'application/pdf',
    uploadDate: '2025-07-18',
    uploadedBy: 'Dra. Ramírez',
    downloads: 34
  },
  {
    id: 6,
    title: 'Técnicas de Anestesia Local',
    description: 'Video demostrativo de las técnicas más efectivas de anestesia local',
    type: 'Video',
    category: 'Cirugía',
    fileUrl: '/resources/tecnicas-anestesia.mp4',
    fileSize: '45.7 MB',
    fileType: 'video/mp4',
    uploadDate: '2025-06-30',
    uploadedBy: 'Dr. Castro',
    downloads: 189
  },
  {
    id: 7,
    title: 'Plantilla de Historia Clínica',
    description: 'Formato estándar para registro de historias clínicas odontológicas',
    type: 'Plantilla',
    category: 'Odontopediatría',
    fileUrl: '/resources/plantilla-historia-clinica.docx',
    fileSize: '0.8 MB',
    fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    uploadDate: '2025-07-01',
    uploadedBy: 'Coordinación Académica',
    downloads: 142
  }
]

// --- Funciones del Mock ---
let resources = [...mockResources]

/**
 * Obtiene todos los recursos
 */
export async function fetchResourcesMock(): Promise<Resource[]> {
  await delay(400)
  return JSON.parse(JSON.stringify(resources))
}

/**
 * Busca recursos por término
 */
export async function searchResourcesMock(term: string): Promise<Resource[]> {
  await delay(350)
  const lowerTerm = term.toLowerCase()
  return JSON.parse(JSON.stringify(
    resources.filter(r =>
      r.title.toLowerCase().includes(lowerTerm) ||
      r.description.toLowerCase().includes(lowerTerm) ||
      r.category.toLowerCase().includes(lowerTerm) ||
      r.uploadedBy.toLowerCase().includes(lowerTerm)
    )
  ))
}

/**
 * Filtra recursos por tipo y categoría
 */
export async function filterResourcesMock(
  type?: ResourceType,
  category?: ResourceCategory
): Promise<Resource[]> {
  await delay(300)
  let result = [...resources]
  
  if (type) {
    result = result.filter(r => r.type === type)
  }
  
  if (category) {
    result = result.filter(r => r.category === category)
  }
  
  return JSON.parse(JSON.stringify(result))
}

/**
 * Obtiene un recurso por ID
 */
export async function fetchResourceByIdMock(id: number): Promise<Resource | undefined> {
  await delay(250)
  const resource = resources.find(r => r.id === id)
  return resource ? JSON.parse(JSON.stringify(resource)) : undefined
}

/**
 * Agrega un recurso a favoritos
 */
export async function toggleFavoriteMock(id: number): Promise<Resource> {
  await delay(200)
  const index = resources.findIndex(r => r.id === id)
  
  if (index === -1) {
    throw new Error(`Recurso con ID ${id} no encontrado`)
  }

  const updatedResource = {
    ...resources[index],
    isFavorite: !resources[index].isFavorite
  }

  resources[index] = updatedResource
  return JSON.parse(JSON.stringify(updatedResource))
}

/**
 * Incrementa el contador de descargas
 */
export async function incrementDownloadCountMock(id: number): Promise<void> {
  await delay(150)
  const index = resources.findIndex(r => r.id === id)
  
  if (index === -1) {
    throw new Error(`Recurso con ID ${id} no encontrado`)
  }

  resources[index].downloads = (resources[index].downloads || 0) + 1
}

/**
 * Obtiene los tipos de recursos disponibles
 */
export function getResourceTypesMock(): ResourceType[] {
  return ['PDF', 'Guía', 'Retroalimentación', 'Formulario', 'Presentación', 'Video', 'Plantilla']
}

/**
 * Obtiene las categorías de recursos disponibles
 */
export function getResourceCategoriesMock(): ResourceCategory[] {
  return ['Endodoncia', 'Ortodoncia', 'Periodoncia', 'Cirugía', 'Odontopediatría', 'Radiología', 'Materiales']
}

/**
 * Agrega un nuevo recurso
 */
export async function addResourceMock(resource: Omit<Resource, 'id' | 'downloads'>): Promise<Resource> {
  await delay(500)
  const newId = Math.max(0, ...resources.map(r => r.id)) + 1
  const now = new Date().toISOString().split('T')[0]
  
  const newResource: Resource = {
    ...resource,
    id: newId,
    uploadDate: now,
    downloads: 0
  }

  resources.push(newResource)
  return JSON.parse(JSON.stringify(newResource))
}

/**
 * Actualiza un recurso existente
 */
export async function updateResourceMock(id: number, updates: Partial<Resource>): Promise<Resource> {
  await delay(450)
  const index = resources.findIndex(r => r.id === id)
  
  if (index === -1) {
    throw new Error(`Recurso con ID ${id} no encontrado`)
  }

  const updatedResource = {
    ...resources[index],
    ...updates,
    lastUpdated: new Date().toISOString().split('T')[0]
  }

  resources[index] = updatedResource
  return JSON.parse(JSON.stringify(updatedResource))
}

/**
 * Elimina un recurso
 */
export async function deleteResourceMock(id: number): Promise<void> {
  await delay(400)
  resources = resources.filter(r => r.id !== id)
}