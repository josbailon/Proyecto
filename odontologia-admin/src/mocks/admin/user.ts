// src/mocks/admin/user.ts
export type Role = 'admin' | 'estudiante' | 'secretario' | 'paciente' | 'profesor'

export interface User {
  id: number
  nombre: string
  email: string
  role: Role
  password?: string
}
