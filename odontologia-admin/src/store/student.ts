// src/store/student.ts
import { defineStore } from 'pinia';
import { useAdminStore } from './admin';
import type { ClinicalHistory }   from '../mocks/student/clinicalHistories';
import type { ClinicalCase }      from '../mocks/student/clinicalCases';
import type { Assignment }        from '../mocks/student/assignments';
import type { OdontogramEntry }   from '../mocks/student/odontogram';
import type { Message }           from '../mocks/student/messaging';
import {
  fetchHistoriesMock,
  saveHistoryMock,
  deleteHistoryMock,
  fetchCasesMock,
  saveCaseMock,
  deleteCaseMock,
  fetchAssignmentsMock,
  saveAssignmentMock,
  deleteAssignmentMock,
  fetchOdontogramMock,
  saveOdontogramMock,
  fetchMessagesMock,
  sendMessageMock
} from '../mocks/api';

export const useStudentStore = defineStore('student', {
  state: () => ({
    histories:    [] as ClinicalHistory[],
    cases:        [] as ClinicalCase[],
    assignments:  [] as Assignment[],
    odontogram:   [] as OdontogramEntry[],
    messages:     [] as Message[],
    loading:      false,
    error:        '' as string
  }),

  getters: {
    /**
     * Nombre del usuario actualmente autenticado en el AdminStore,
     * para usar como remitente en los mensajes.
     */
    currentUserName(): string {
      const adminStore = useAdminStore();
      return adminStore.currentUser?.nombre || '';
    }
  },

  actions: {
    // --- Clinical Histories ---
    async loadHistories() {
      this.loading = true;
      try {
        this.histories = await fetchHistoriesMock();
      } finally {
        this.loading = false;
      }
    },
    async saveHistory(h: ClinicalHistory) {
      this.loading = true;
      try {
        await saveHistoryMock(h);
        await this.loadHistories();
      } finally {
        this.loading = false;
      }
    },
    async deleteHistory(id: number) {
      this.loading = true;
      try {
        await deleteHistoryMock(id);
        await this.loadHistories();
      } finally {
        this.loading = false;
      }
    },

    // --- Clinical Cases ---
    async loadCases() {
      this.loading = true;
      try {
        this.cases = await fetchCasesMock();
      } finally {
        this.loading = false;
      }
    },
    async saveCase(c: ClinicalCase) {
      this.loading = true;
      try {
        await saveCaseMock(c);
        await this.loadCases();
      } finally {
        this.loading = false;
      }
    },
    async deleteCase(id: number) {
      this.loading = true;
      try {
        await deleteCaseMock(id);
        await this.loadCases();
      } finally {
        this.loading = false;
      }
    },

    // --- Assignments ---
    async loadAssignments() {
      this.loading = true;
      try {
        this.assignments = await fetchAssignmentsMock();
      } finally {
        this.loading = false;
      }
    },
    async saveAssignment(a: Assignment) {
      this.loading = true;
      try {
        await saveAssignmentMock(a);
        await this.loadAssignments();
      } finally {
        this.loading = false;
      }
    },
    async deleteAssignment(id: number) {
      this.loading = true;
      try {
        await deleteAssignmentMock(id);
        await this.loadAssignments();
      } finally {
        this.loading = false;
      }
    },

    // --- Odontogram ---
    async loadOdontogram() {
      this.loading = true;
      try {
        this.odontogram = await fetchOdontogramMock();
      } finally {
        this.loading = false;
      }
    },
    async saveOdontogram(entries: OdontogramEntry[]) {
      this.loading = true;
      try {
        await saveOdontogramMock(entries);
        await this.loadOdontogram();
      } finally {
        this.loading = false;
      }
    },

    // --- Messaging ---
    async loadMessages(withUser: string) {
      this.loading = true;
      try {
        this.messages = await fetchMessagesMock(withUser);
      } finally {
        this.loading = false;
      }
    },
    async sendMessage(to: string, content: string) {
      this.loading = true;
      try {
        await sendMessageMock({
          from: this.currentUserName,
          to,
          content
        });
        await this.loadMessages(to);
      } finally {
        this.loading = false;
      }
    }
  }
});
