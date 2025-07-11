// src/mocks/admin/api.ts

import type { User } from './user'
import {
  users as _usersDB,
  fetchUsersMock as _fetchUsersDB,
  saveUserMock as _saveUserDB,
  deleteUserMock as _deleteUserDB
} from './users'

/** Retardo auxiliar para simular latencia de red */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Simula un login en el sistema.
 * Busca un usuario por email y contraseña en el mock de usuarios.
 * @throws Error si no encuentra credenciales válidas.
 */
export async function loginMock(
  email: string,
  password: string
): Promise<User> {
  await delay(300)
  const user = _usersDB.find((u: User) => u.email === email && u.password === password)
  if (!user) {
    throw new Error('Email o contraseña incorrectos')
  }
  // Devolvemos copia para evitar mutaciones externas
  return { ...user }
}

/**
 * Recupera la lista completa de usuarios registrados.
 */
export async function fetchUsersMock(): Promise<User[]> {
  await delay(200)
  return _fetchUsersDB()
}

/**
 * Crea un nuevo usuario o actualiza uno existente.
 */
export async function saveUserMock(user: User): Promise<User> {
  await delay(200)
  return _saveUserDB(user)
}

/**
 * Elimina un usuario por su identificador.
 */
export async function deleteUserMock(id: number): Promise<void> {
  await delay(200)
  return _deleteUserDB(id)
}
