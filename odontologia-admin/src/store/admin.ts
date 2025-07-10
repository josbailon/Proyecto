// src/store/admin.ts
import { defineStore } from 'pinia';
// Importa el tipo User desde mocks/admin/user.ts
import type { User } from '../mocks/admin/user';
// Importa las funciones mock de API
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
    /** Autentica con email/password */
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

    /** Carga todos los usuarios */
    async fetchUsers() {
      this.loading = true;
      try {
        this.users = await fetchUsersMock();
      } catch (err: any) {
        this.error = err.message || 'Error al obtener usuarios';
      } finally {
        this.loading = false;
      }
    },

    /** Crea o actualiza un usuario */
    async saveUser(u: User) {
      this.loading = true;
      try {
        await saveUserMock(u);
        await this.fetchUsers();
      } catch (err: any) {
        this.error = err.message || 'Error al guardar usuario';
      } finally {
        this.loading = false;
      }
    },

    /** Elimina un usuario por ID */
    async deleteUser(id: number) {
      this.loading = true;
      try {
        await deleteUserMock(id);
        await this.fetchUsers();
      } catch (err: any) {
        this.error = err.message || 'Error al eliminar usuario';
      } finally {
        this.loading = false;
      }
    },

    /** Cierra la sesión del administrador */
    logout() {
      this.currentUser = null;
      localStorage.removeItem('user');
    }
  }
});
