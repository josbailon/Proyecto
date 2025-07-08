// src/mocks/api.ts

// Utility
export { delay } from './utils';

// --- Admin Mocks ---
export {
  loginMock,
  fetchUsersMock,
  saveUserMock,
  deleteUserMock
} from './admin/api';

// --- Student Mocks ---
export {
  fetchHistoriesMock,
  saveHistoryMock,
  deleteHistoryMock
} from './student/clinicalHistories';
export {
  fetchCasesMock,
  saveCaseMock,
  deleteCaseMock
} from './student/clinicalCases';
export {
  fetchAssignmentsMock,
  saveAssignmentMock,
  deleteAssignmentMock
} from './student/assignments';
export {
  fetchOdontogramMock,
  saveOdontogramMock
} from './student/odontogram';
export {
  fetchMessagesMock,
  sendMessageMock
} from './student/messaging';

// --- Professor Mocks ---
export {
  fetchProfessorAssignmentsMock,
  saveProfessorAssignmentMock,
  deleteProfessorAssignmentMock
} from './professor/assignments';
export {
  fetchProgressMock,
  saveProgressMock
} from './professor/progress';
export {
  fetchStudentsByCourseMock,
  addStudentToCourseMock,
  removeStudentFromCourseMock
} from './professor/studentsByCourse';

// --- Secretary Mocks ---
export {
  fetchPatientAssignmentsMock,
  savePatientAssignmentMock,
  deletePatientAssignmentMock
} from './secretary/patientAssignments';
export {
  fetchAppointmentsMock,
  saveAppointmentMock,
  deleteAppointmentMock
} from './secretary/appointments';
