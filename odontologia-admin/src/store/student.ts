// src/store/student.ts
import { defineStore } from 'pinia';
import { useAdminStore } from './admin';

import type { ClinicalHistory } from '../mocks/student/clinicalHistories';
import {
  fetchHistoriesMock,
  saveHistoryMock,
  deleteHistoryMock
} from '../mocks/student/clinicalHistories';

import type { ClinicalCase } from '../mocks/student/clinicalCases';
import {
  fetchCasesMock,
  saveCaseMock,
  deleteCaseMock
} from '../mocks/student/clinicalCases';

import type { Assignment } from '../mocks/student/assignments';
import {
  fetchAssignmentsMock,
  saveAssignmentMock,
  deleteAssignmentMock
} from '../mocks/student/assignments';

import type {
  OdontogramEntry,
  ToothStatus
} from '../mocks/student/odontogram';
import {
  fetchOdontogramMock,
  saveOdontogramEntryMock,
  deleteOdontogramEntryMock,
  saveFullOdontogramMock
} from '../mocks/student/odontogram';

import type { Message } from '../mocks/student/messaging';
import {
  fetchMessagesMock,
  sendMessageMock
} from '../mocks/student/messaging';

export const useStudentStore = defineStore('student', {
  state: () => ({
    histories:   [] as ClinicalHistory[],
    cases:       [] as ClinicalCase[],
    assignments: [] as Assignment[],
    odontogram:  [] as OdontogramEntry[],
    messages:    [] as Message[],
    loading:     false,
    error:       '' as string
  }),

  getters: {
    currentUserName(): string {
      const adminStore = useAdminStore();
      return adminStore.currentUser?.nombre || '';
    }
  },

  actions: {
    // --- Historias clínicas ---
    async loadHistories() {
      this.loading = true;
      this.histories = await fetchHistoriesMock();
      this.loading = false;
    },
    async saveHistory(h: ClinicalHistory) {
      this.loading = true;
      await saveHistoryMock(h);
      await this.loadHistories();
      this.loading = false;
    },
    async deleteHistory(id: number) {
      this.loading = true;
      await deleteHistoryMock(id);
      await this.loadHistories();
      this.loading = false;
    },

    // --- Casos clínicos ---
    async loadCases() {
      this.loading = true;
      this.cases = await fetchCasesMock();
      this.loading = false;
    },
    async saveCase(c: ClinicalCase) {
      this.loading = true;
      await saveCaseMock(c);
      await this.loadCases();
      this.loading = false;
    },
    async deleteCase(id: number) {
      this.loading = true;
      await deleteCaseMock(id);
      await this.loadCases();
      this.loading = false;
    },

    // --- Tareas académicas ---
    async loadAssignments() {
      this.loading = true;
      this.assignments = await fetchAssignmentsMock();
      this.loading = false;
    },
    async saveAssignment(a: Assignment) {
      this.loading = true;
      await saveAssignmentMock(a);
      await this.loadAssignments();
      this.loading = false;
    },
    async deleteAssignment(id: number) {
      this.loading = true;
      await deleteAssignmentMock(id);
      await this.loadAssignments();
      this.loading = false;
    },

    // --- Odontograma ---
    async loadOdontogram(patientId: number) {
      this.loading = true;
      this.odontogram = await fetchOdontogramMock(patientId);
      this.loading = false;
    },
    async saveOdontogramEntry(
      patientId: number,
      entry: { tooth: string; status: ToothStatus; annotations?: string; id?: string }
    ) {
      this.loading = true;
      await saveOdontogramEntryMock(patientId, entry);
      await this.loadOdontogram(patientId);
      this.loading = false;
    },
    async deleteOdontogramEntry(patientId: number, entryId: string) {
      this.loading = true;
      await deleteOdontogramEntryMock(patientId, entryId);
      await this.loadOdontogram(patientId);
      this.loading = false;
    },
    async saveFullOdontogram(
      patientId: number,
      entries: Array<{ tooth: string; status: ToothStatus; annotations?: string }>
    ) {
      this.loading = true;
      await saveFullOdontogramMock(patientId, entries);
      await this.loadOdontogram(patientId);
      this.loading = false;
    },

    // --- Mensajería ---
    async loadMessages(withUser: string) {
      this.loading = true;
      this.messages = await fetchMessagesMock(withUser);
      this.loading = false;
    },
    async sendMessage(to: string, content: string) {
      this.loading = true;
      await sendMessageMock({ from: this.currentUserName, to, content });
      await this.loadMessages(to);
      this.loading = false;
    }
  }
});
