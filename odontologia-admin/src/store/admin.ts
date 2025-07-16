// src/store/admin.ts
import { defineStore } from 'pinia'
import type { User } from '../mocks/admin/user'
import {
  loginMock,
  fetchUsersMock,
  saveUserMock,
  deleteUserMock
} from '../mocks/api'

export const useAdminStore = defineStore('admin', {
  state: () => ({
    currentUser: null as User | null,
    users: [] as User[],
    loading: false,
    error: '' as string
  }),

  getters: {
    /** Devuelve true si hay usuario logueado */
    isAuthenticated: (state) => !!state.currentUser,

    /** Devuelve el nombre del admin logueado */
    adminName: (state) => state.currentUser?.nombre || ''
  },

  actions: {
    /** Autentica con email/password */
    async login(email: string, password: string) {
      this.loading = true
      this.error = ''
      try {
        const user = await loginMock(email, password)
        this.currentUser = user
        localStorage.setItem('user', JSON.stringify(user))
      } catch (err: unknown) {
        const error = err as { message?: string }
        this.error = error.message || 'Error al autenticar'
        throw err
      } finally {
        this.loading = false
      }
    },

    /** Carga todos los usuarios */
    async fetchUsers() {
      this.loading = true
      this.error = ''
      try {
        this.users = await fetchUsersMock()
      } catch (err: unknown) {
        const error = err as { message?: string }
        this.error = error.message || 'Error al obtener usuarios'
      } finally {
        this.loading = false
      }
    },

    /** Crea o actualiza un usuario */
    async saveUser(u: User) {
      this.loading = true
      this.error = ''
      try {
        await saveUserMock(u)
        await this.fetchUsers()
      } catch (err: unknown) {
        const error = err as { message?: string }
        this.error = error.message || 'Error al guardar usuario'
      } finally {
        this.loading = false
      }
    },

    /** Elimina un usuario por ID */
    async deleteUser(id: number) {
      this.loading = true
      this.error = ''
      try {
        await deleteUserMock(id)
        await this.fetchUsers()
      } catch (err: unknown) {
        const error = err as { message?: string }
        this.error = error.message || 'Error al eliminar usuario'
      } finally {
        this.loading = false
      }
    },

    /** Cierra la sesión del administrador */
    logout() {
      this.currentUser = null
      localStorage.removeItem('user')
    }
  }
})
