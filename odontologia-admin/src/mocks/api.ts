import type { User } from './user';
import { users } from './users';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const loginMock = async (email: string, password: string): Promise<User> => {
  await delay(300);
  const u = users.find(x => x.email === email && password === 'password');
  if (!u) throw new Error('Credenciales inválidas');
  return { ...u };
};

export const fetchUsersMock = async (): Promise<User[]> => {
  await delay(300);
  return [...users];
};

export const saveUserMock = async (user: User): Promise<User> => {
  await delay(300);
  if (user.id) {
    const i = users.findIndex(x => x.id === user.id);
    users[i] = { ...user };
  } else {
    user.id = users.length + 1;
    users.push(user);
  }
  return { ...user };
};

export const deleteUserMock = async (id: number): Promise<void> => {
  await delay(300);
  const i = users.findIndex(x => x.id === id);
  if (i >= 0) users.splice(i, 1);
};
