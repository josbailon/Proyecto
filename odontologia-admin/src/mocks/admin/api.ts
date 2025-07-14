// src/mocks/admin/api.ts

// --------------------------------------------------
// Utility: simulación de latencia en las llamadas
// --------------------------------------------------
export function delay(ms: number = 300): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// --------------------------------------------------
// Tipos y datos iniciales de Usuario (Admin)
// --------------------------------------------------
export type Role = 'admin' | 'estudiante' | 'profesor' | 'secretario';

export interface User {
  id: number;
  nombre: string;
  email: string;
  password: string;
  role: Role;
  especialidad?: string;   // solo para profes/estudiantes
  historial?: string;       // opcional, si se modela
}

// Datos iniciales
const initialUsers: User[] = [
  { id: 1, nombre: 'Admin Uno',        email: 'admin@odontologia.com',    password: 'admin123', role: 'admin' },
  { id: 2, nombre: 'Estudiante Pérez', email: 'estudiante@uni.edu',       password: 'est123',   role: 'estudiante', especialidad: 'Ortodoncia' },
  { id: 3, nombre: 'Profesor López',   email: 'profesor@uni.edu',         password: 'prof123',  role: 'profesor',  especialidad: 'Endodoncia' },
  { id: 4, nombre: 'Secretario Cruz',  email: 'secretario@odontologia.com', password: 'sec123', role: 'secretario' }
];

// --------------------------------------------------
// 1) Login & gestión de usuarios
// --------------------------------------------------

/** Simula un login: busca usuario por email+password */
export async function loginMock(email: string, password: string): Promise<User> {
  await delay();
  const usuario = initialUsers.find(u => u.email === email && u.password === password);
  if (!usuario) throw new Error('Credenciales inválidas');
  return { ...usuario };
}

/** Devuelve la lista de usuarios (sin password) */
export async function fetchUsersMock(): Promise<User[]> {
  await delay();
  return initialUsers.map(u => ({ ...u, password: '' }));
}

/**
 * Crea o actualiza un usuario.
 * Si `user.id` existe, lo actualiza; si no, lo añade con nuevo id.
 */
export async function saveUserMock(user: User): Promise<User> {
  await delay();
  const idx = initialUsers.findIndex(u => u.id === user.id);
  if (idx >= 0) {
    initialUsers[idx] = { ...user };
  } else {
    const newId = initialUsers.length ? Math.max(...initialUsers.map(u => u.id)) + 1 : 1;
    user.id = newId;
    initialUsers.push({ ...user });
  }
  return { ...user, password: '' };
}

/** Elimina un usuario por su ID */
export async function deleteUserMock(id: number): Promise<void> {
  await delay();
  const idx = initialUsers.findIndex(u => u.id === id);
  if (idx >= 0) initialUsers.splice(idx, 1);
}

// --------------------------------------------------
// 2) Mock de estadísticas para HomeAdmin.vue
// --------------------------------------------------

export interface Stats {
  users: number;
  appointments: number;
  patients: number;
  messages: number;
}

/** Simula la carga de estadísticas en el dashboard admin */
export async function fetchStatsMock(): Promise<Stats> {
  await delay();
  return {
    users: initialUsers.length,
    appointments: 58,   // valores de ejemplo
    patients: 124,
    messages: 37
  };
}
