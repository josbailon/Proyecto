export type Role = 'admin' | 'estudiante' | 'secretario' | 'paciente'| 'profesor';

export interface User {
  id?: number;
  nombre: string;
  email: string;
  password?: string;
  role: Role;
  especialidad?: string;
  historial?: string;
}
