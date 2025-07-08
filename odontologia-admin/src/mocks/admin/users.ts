import type { User } from './user';

export const initialUsers: User[] = [
  { id: 1, nombre: 'Admin Principal', email: 'admin@example.com', role: 'admin' },
  { id: 2, nombre: 'Jostin Estudiante', email: 'jostin@uni.edu', role: 'estudiante' },
  { id: 3, nombre: 'Profe Pérez',      email: 'perez@uni.edu',  role: 'profesor' },
  { id: 4, nombre: 'Sec. López',       email: 'lopez@uni.edu',  role: 'secretario' }
];
