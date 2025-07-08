export type Role = 'admin' | 'estudiante' | 'profesor' | 'secretario';

export interface User {
  id: number;
  nombre: string;
  email: string;
  role: Role;
  password?: string;
}
