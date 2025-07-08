// src/store/admin.ts
import { defineStore } from 'pinia';
// Importamos el tipo User desde mocks/admin/user.ts
import type { User } from '../mocks/admin/user';
// Importamos las funciones de API simulada desde mocks/api.ts
import {
  loginMock,
  fetchUsersMock,
  saveUserMock,
  deleteUserMock
} from '../mocks/api';

export const useAdminStore = defineStore('admin', {
  state: () => ({
    currentUser: null as User | null,
    users: [] as User[],
    loading: false,
    error: '' as string
  }),
  actions: {
    async login(email: string, password: string) {
      this.loading = true;
      this.error = '';
      try {
        const user = await loginMock(email, password);
        this.currentUser = user;
        localStorage.setItem('user', JSON.stringify(user));
      } catch (err: any) {
        this.error = err.message || 'Error al autenticar';
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async fetchUsers() {
      this.loading = true;
      try {
        this.users = await fetchUsersMock();
      } finally {
        this.loading = false;
      }
    },
    async saveUser(u: User) {
      this.loading = true;
      try {
        await saveUserMock(u);
        await this.fetchUsers();
      } finally {
        this.loading = false;
      }
    },
    async deleteUser(id: number) {
      this.loading = true;
      try {
        await deleteUserMock(id);
        await this.fetchUsers();
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.currentUser = null;
      localStorage.removeItem('user');
    }
  }
});
