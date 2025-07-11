// src/mocks/admin/users.ts

import type { User } from './user';

export const users: User[] = [
  { id: 1, nombre: 'Admin Uno',   email: 'admin@ejemplo.com',     password: 'admin',    role: 'admin' },
  { id: 2, nombre: 'Profe Pérez', email: 'perez@universidad.edu', password: 'profe123', role: 'profesor', especialidad: 'Ortodoncia' },
  // ... otros usuarios
];
