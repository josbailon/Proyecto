import { delay } from '../utils';
import type { User } from './user';
import { initialUsers } from './users';

let users = [...initialUsers];

export async function loginMock(email: string, password: string): Promise<User> {
  await delay();
  const user = users.find(u => u.email === email);
  if (!user || password !== 'password') {
    throw new Error('Credenciales inválidas');
  }
  // retornamos copia para evitar mutaciones externas
  return { ...user };
}

export async function fetchUsersMock(): Promise<User[]> {
  await delay();
  return users.map(u => ({ ...u }));
}

export async function saveUserMock(u: User): Promise<void> {
  await delay();
  if (u.id) {
    // actualizar usuario existente
    users = users.map(x => x.id === u.id ? { ...u } : x);
  } else {
    // crear nuevo usuario
    const nextId = Math.max(0, ...users.map(x => x.id)) + 1;
    users.push({ ...u, id: nextId });
  }
}

export async function deleteUserMock(id: number): Promise<void> {
  await delay();
  users = users.filter(u => u.id !== id);
}
