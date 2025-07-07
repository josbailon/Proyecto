import type { User } from './user';

export const users: User[] = [
  { id: 1, nombre: 'Admin Uno',       email: 'admin@example.com',      role: 'admin' },
  { id: 2, nombre: 'Estudiante Dos',  email: 'estudiante@example.com', role: 'estudiante', especialidad: 'Ortodoncia' },
  { id: 3, nombre: 'Secretario Tres', email: 'secretario@example.com', role: 'secretario' },
  { id: 4, nombre: 'Paciente Cuatro', email: 'paciente@example.com',   role: 'paciente',   historial: 'Sin alergias' },
  { id: 5, nombre: 'Profesor Cinco',  email: 'profesor@example.com',    role: 'profesor',   especialidad: 'Endodoncia' }
];
