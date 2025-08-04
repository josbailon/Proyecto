// src/mocks/student/messaging.ts
import { delay } from '../utils'

// --- Tipos ---
export interface MessageAttachment {
  name: string
  type: string
  size: number
  url: string
}

export interface Message {
  id: number
  from: string
  to: string
  content: string
  timestamp: string
  read?: boolean
  attachments?: MessageAttachment[]
}

// --- Datos de ejemplo ---
const mockContacts = [
  'Dr. Pérez',
  'Dra. Gómez',
  'Dr. García',
  'Coordinación Académica',
  'Secretaría'
]

const mockMessages: Message[] = [
  {
    id: 1,
    from: 'Dr. Pérez',
    to: 'Estudiante',
    content: 'Hola, recuerda enviar el informe del caso clínico antes del viernes',
    timestamp: '2025-07-15T09:30:00',
    read: true
  },
  {
    id: 2,
    from: 'Estudiante',
    to: 'Dr. Pérez',
    content: 'Buenos días doctor, ya lo tengo casi listo. ¿Hay algún formato específico?',
    timestamp: '2025-07-15T10:15:00',
    read: true
  },
  {
    id: 3,
    from: 'Dra. Gómez',
    to: 'Estudiante',
    content: 'Tu cita de ortodoncia ha sido reprogramada para el próximo martes',
    timestamp: '2025-07-16T14:20:00',
    read: false,
    attachments: [
      {
        name: 'nueva-cita.pdf',
        type: 'application/pdf',
        size: 250000,
        url: '/uploads/nueva-cita.pdf'
      }
    ]
  }
]

// --- Funciones del Mock ---
let messages = [...mockMessages]

/**
 * Obtiene los mensajes entre dos usuarios
 */
export async function fetchMessagesMock(withUser: string, currentUser: string): Promise<Message[]> {
  await delay(300)
  
  const filteredMessages = messages.filter(m =>
    (m.from === withUser && m.to === currentUser) ||
    (m.to === withUser && m.from === currentUser)
  )

  // Ordenar mensajes por fecha (más antiguo primero)
  const sortedMessages = [...filteredMessages].sort((a: Message, b: Message) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  )

  return JSON.parse(JSON.stringify(sortedMessages))
}

/**
 * Obtiene la lista de contactos con mensajes
 */
export async function fetchContactsMock(currentUser: string): Promise<string[]> {
  await delay(200)
  
  const contactSet = new Set<string>()
  
  messages.forEach(m => {
    if (m.from === currentUser) contactSet.add(m.to)
    if (m.to === currentUser) contactSet.add(m.from)
  })

  // Combinar contactos predefinidos con nuevos contactos
  const combinedContacts = [
    ...mockContacts.filter(contact => contactSet.has(contact)),
    ...[...contactSet].filter(contact => !mockContacts.includes(contact))
  ]

  return combinedContacts
}

/**
 * Envía un nuevo mensaje
 */
export async function sendMessageMock(
  from: string,
  to: string,
  content: string,
  attachments?: MessageAttachment[]
): Promise<Message> {
  await delay(400)
  
  const newMessage: Message = {
    id: Math.max(0, ...messages.map(m => m.id)) + 1,
    from,
    to,
    content,
    timestamp: new Date().toISOString(),
    read: false,
    attachments
  }

  messages.push(newMessage)
  return JSON.parse(JSON.stringify(newMessage))
}

/**
 * Marca mensajes como leídos
 */
export async function markMessagesAsReadMock(
  contact: string,
  currentUser: string
): Promise<void> {
  await delay(150)
  messages = messages.map(m => 
    m.from === contact && m.to === currentUser && !m.read
      ? { ...m, read: true }
      : m
  )
}

/**
 * Elimina un mensaje
 */
export async function deleteMessageMock(id: number): Promise<void> {
  await delay(250)
  messages = messages.filter(m => m.id !== id)
}