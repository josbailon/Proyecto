// src/mocks/api.ts

// --------------------------------------------------
// Utility: Simula latencia en las llamadas
// --------------------------------------------------
export function delay(ms: number = 500): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// --------------------------------------------------
// Tipos y datos iniciales de Usuario (Admin)
// --------------------------------------------------
export type Role = 'admin' | 'estudiante' | 'profesor' | 'secretario';

export interface User {
  id: number;
  nombre: string;
  email: string;
  password: string;
  role: Role;
  especialidad?: string;   // sólo para profesore/estudiantes
  historial?: string;      // sólo para pacientes
}

const initialUsers: User[] = [
  { id: 1, nombre: 'Admin Uno',        email: 'admin@odontologia.com',   password: 'admin123',   role: 'admin' },
  { id: 2, nombre: 'Estudiante Pérez', email: 'estudiante@uni.edu',      password: 'est123',     role: 'estudiante', especialidad: 'Ortodoncia' },
  { id: 3, nombre: 'Profesor López',   email: 'profesor@uni.edu',        password: 'prof123',    role: 'profesor',  especialidad: 'Endodoncia' },
  { id: 4, nombre: 'Secretario Cruz',  email: 'secretario@odontologia.com', password: 'sec123',   role: 'secretario' }
];

// --------------------------------------------------
// Admin / Usuario
// --------------------------------------------------
export async function loginMock(email: string, password: string): Promise<User> {
  await delay();
  const user = initialUsers.find(u => u.email === email && u.password === password);
  if (!user) throw new Error('Credenciales inválidas');
  return { ...user };
}

export async function fetchUsersMock(): Promise<User[]> {
  await delay();
  return initialUsers.map(u => ({ ...u, password: '' })); // no devolver password
}

export async function saveUserMock(user: User): Promise<User> {
  await delay();
  const idx = initialUsers.findIndex(u => u.id === user.id);
  if (idx > -1) {
    initialUsers[idx] = { ...user };
  } else {
    const newId = initialUsers.length ? Math.max(...initialUsers.map(u => u.id)) + 1 : 1;
    initialUsers.push({ ...user, id: newId });
  }
  return { ...user };
}

export async function deleteUserMock(id: number): Promise<void> {
  await delay();
  const idx = initialUsers.findIndex(u => u.id === id);
  if (idx > -1) initialUsers.splice(idx, 1);
}

// --------------------------------------------------
// Estudiante: Historias Clínicas
// src/mocks/student/clinicalHistories.ts
// --------------------------------------------------
export type ClinicalHistory = {
  id: number;
  patientId: number;
  generalData: string;
  dentalHistory: string;
  intraoralFindings: string;
  allergies: string[];
  medications: string[];
  systemicHistory: string;
  createdAt: string;
  updatedAt: string;
};

let histories: ClinicalHistory[] = [];

export async function fetchHistoriesMock(): Promise<ClinicalHistory[]> {
  await delay();
  return histories.map(h => ({ ...h }));
}

export async function saveHistoryMock(h: ClinicalHistory): Promise<ClinicalHistory> {
  await delay();
  const now = new Date().toISOString();
  if (h.id) {
    const idx = histories.findIndex(x => x.id === h.id);
    if (idx > -1) {
      histories[idx] = { ...h, updatedAt: now };
      return { ...histories[idx] };
    }
  }
  const newEntry = { ...h, id: histories.length + 1, createdAt: now, updatedAt: now };
  histories.push(newEntry);
  return { ...newEntry };
}

export async function deleteHistoryMock(id: number): Promise<void> {
  await delay();
  histories = histories.filter(h => h.id !== id);
}

// --------------------------------------------------
// Estudiante: Casos Clínicos
// src/mocks/student/clinicalCases.ts
// --------------------------------------------------
export type ClinicalCase = {
  id: number;
  patientId: number;
  title: string;
  description?: string;
  stage: string;
  createdAt: string;
  updatedAt: string;
};

let cases: ClinicalCase[] = [];

export async function fetchCasesMock(): Promise<ClinicalCase[]> {
  await delay();
  return cases.map(c => ({ ...c }));
}

export async function saveCaseMock(c: ClinicalCase): Promise<ClinicalCase> {
  await delay();
  const now = new Date().toISOString();
  if (c.id) {
    const idx = cases.findIndex(x => x.id === c.id);
    if (idx > -1) {
      cases[idx] = { ...c, updatedAt: now };
      return { ...cases[idx] };
    }
  }
  const newCase = { ...c, id: cases.length + 1, createdAt: now, updatedAt: now };
  cases.push(newCase);
  return { ...newCase };
}

export async function deleteCaseMock(id: number): Promise<void> {
  await delay();
  cases = cases.filter(c => c.id !== id);
}

// --------------------------------------------------
// Estudiante: Tareas Académicas
// src/mocks/student/assignments.ts
// --------------------------------------------------
export type Assignment = {
  id: number;
  studentId: number;
  title: string;
  dueDate: string;
  status: 'pendiente' | 'entregado' | 'corregido';
};

let assignments: Assignment[] = [];

export async function fetchAssignmentsMock(): Promise<Assignment[]> {
  await delay();
  return assignments.map(a => ({ ...a }));
}

export async function saveAssignmentMock(a: Assignment): Promise<Assignment> {
  await delay();
  if (a.id) {
    const idx = assignments.findIndex(x => x.id === a.id);
    if (idx > -1) assignments[idx] = { ...a };
    return { ...a };
  }
  const newA = { ...a, id: assignments.length + 1 };
  assignments.push(newA);
  return { ...newA };
}

export async function deleteAssignmentMock(id: number): Promise<void> {
  await delay();
  assignments = assignments.filter(a => a.id !== id);
}

// --------------------------------------------------
// Estudiante: Odontograma
// src/mocks/student/odontogram.ts
// --------------------------------------------------
export type ToothStatus = 'sano' | 'caries' | 'restaurado' | 'extraido';

export interface OdontogramEntry {
  id: string;
  patientId: number;
  tooth: string;
  status: ToothStatus;
  annotations?: string;
  createdAt: string;
  updatedAt: string;
}

const odontograms: Record<number, OdontogramEntry[]> = {};

function genId(patientId: number, tooth: string): string {
  return `${patientId}-${tooth}-${Date.now()}`;
}

export async function fetchOdontogramMock(patientId: number): Promise<OdontogramEntry[]> {
  await delay();
  return (odontograms[patientId] ?? []).map(e => ({ ...e }));
}

export async function saveOdontogramEntryMock(
  patientId: number,
  entry: Partial<OdontogramEntry> & { tooth: string; status: ToothStatus }
): Promise<OdontogramEntry> {
  await delay();
  const now = new Date().toISOString();
  if (!odontograms[patientId]) odontograms[patientId] = [];
  if (entry.id) {
    const list = odontograms[patientId];
    const idx = list.findIndex(e => e.id === entry.id);
    if (idx > -1) {
      list[idx] = { ...list[idx], ...entry, updatedAt: now };
      return { ...list[idx] };
    }
  }
  const newE: OdontogramEntry = {
    id: genId(patientId, entry.tooth),
    patientId,
    tooth: entry.tooth,
    status: entry.status,
    annotations: entry.annotations,
    createdAt: now,
    updatedAt: now
  };
  odontograms[patientId].push(newE);
  return { ...newE };
}

export async function deleteOdontogramEntryMock(patientId: number, id: string): Promise<void> {
  await delay();
  odontograms[patientId] = (odontograms[patientId] ?? []).filter(e => e.id !== id);
}

export async function saveFullOdontogramMock(
  patientId: number,
  entries: Array<Partial<OdontogramEntry> & { tooth: string; status: ToothStatus }>
): Promise<void> {
  await delay();
  const now = new Date().toISOString();
  odontograms[patientId] = entries.map(e => ({
    id: genId(patientId, e.tooth),
    patientId,
    tooth: e.tooth,
    status: e.status,
    annotations: e.annotations,
    createdAt: now,
    updatedAt: now
  }));
}

// --------------------------------------------------
// Estudiante: Mensajería
// src/mocks/student/messaging.ts
// --------------------------------------------------
export interface Message {
  id: number;
  from: string;
  to: string;
  content: string;
  timestamp: string;
}

let messages: Message[] = [];

export async function fetchMessagesMock(withUser: string): Promise<Message[]> {
  await delay();
  return messages.filter(m => m.from === withUser || m.to === withUser);
}

export async function sendMessageMock(msg: Omit<Message, 'id' | 'timestamp'>): Promise<void> {
  await delay();
  messages.push({
    ...msg,
    id: messages.length + 1,
    timestamp: new Date().toISOString()
  });
}

// --------------------------------------------------
// Profesor
// src/mocks/professor/assignments.ts
// --------------------------------------------------
export type ProfessorAssignment = {
  id: number;
  professorId: number;
  title: string;
  description: string;
};

let profAssignments: ProfessorAssignment[] = [];

export async function fetchProfessorAssignmentsMock(): Promise<ProfessorAssignment[]> {
  await delay();
  return profAssignments.map(a => ({ ...a }));
}
export async function saveProfessorAssignmentMock(a: ProfessorAssignment): Promise<ProfessorAssignment> {
  await delay();
  if (a.id) {
    const idx = profAssignments.findIndex(x => x.id === a.id);
    if (idx > -1) profAssignments[idx] = { ...a };
    return { ...a };
  }
  const newA = { ...a, id: profAssignments.length + 1 };
  profAssignments.push(newA);
  return { ...newA };
}
export async function deleteProfessorAssignmentMock(id: number): Promise<void> {
  await delay();
  profAssignments = profAssignments.filter(a => a.id !== id);
}

// --------------------------------------------------
// Profesor: Progreso
// src/mocks/professor/progress.ts
// --------------------------------------------------
export interface StudentProgress {
  id: number;
  studentId: number;
  professorId: number;
  progress: string;
}

let progressRecords: StudentProgress[] = [];

export async function fetchProgressMock(): Promise<StudentProgress[]> {
  await delay();
  return progressRecords.map(r => ({ ...r }));
}
export async function saveProgressMock(r: StudentProgress): Promise<StudentProgress> {
  await delay();
  if (r.id) {
    const idx = progressRecords.findIndex(x => x.id === r.id);
    if (idx > -1) progressRecords[idx] = { ...r };
    return { ...r };
  }
  const newR = { ...r, id: progressRecords.length + 1 };
  progressRecords.push(newR);
  return { ...newR };
}

// --------------------------------------------------
// Profesor: Estudiantes por Curso
// src/mocks/professor/studentsByCourse.ts
// --------------------------------------------------
export interface StudentInfo {
  id: number;
  name: string;
  course: string;
}

let studentsByCourse: StudentInfo[] = [];

export async function fetchStudentsByCourseMock(course: string): Promise<StudentInfo[]> {
  await delay();
  return studentsByCourse.filter(s => s.course === course);
}
export async function addStudentToCourseMock(info: StudentInfo): Promise<void> {
  await delay();
  studentsByCourse.push({ ...info, id: studentsByCourse.length + 1 });
}
export async function removeStudentFromCourseMock(studentId: number, course: string): Promise<void> {
  await delay();
  studentsByCourse = studentsByCourse.filter(s => !(s.id === studentId && s.course === course));
}

// --------------------------------------------------
// Secretario: Asignación de pacientes
// src/mocks/secretary/patientAssignments.ts
// --------------------------------------------------
export type PatientAssignment = {
  id: number;
  studentId: number;
  patientId: number;
};

let patientAssignments: PatientAssignment[] = [];

export async function fetchPatientAssignmentsMock(): Promise<PatientAssignment[]> {
  await delay();
  return patientAssignments.map(pa => ({ ...pa }));
}
export async function savePatientAssignmentMock(a: PatientAssignment): Promise<PatientAssignment> {
  await delay();
  if (a.id) {
    const idx = patientAssignments.findIndex(x => x.id === a.id);
    if (idx > -1) patientAssignments[idx] = { ...a };
    return { ...a };
  }
  const newA = { ...a, id: patientAssignments.length + 1 };
  patientAssignments.push(newA);
  return { ...newA };
}
export async function deletePatientAssignmentMock(id: number): Promise<void> {
  await delay();
  patientAssignments = patientAssignments.filter(pa => pa.id !== id);
}

// --------------------------------------------------
// Secretario: Citas
// src/mocks/secretary/appointments.ts
// --------------------------------------------------
export type Appointment = {
  id: number;
  studentName: string;
  patientName: string;
  day: string;    // e.g. "Lunes"
  time: string;   // e.g. "10:30"
  status: 'confirmada' | 'pendiente' | 'cancelada';
};

let appointments: Appointment[] = [];

export async function fetchAppointmentsMock(): Promise<Appointment[]> {
  await delay();
  return appointments.map(a => ({ ...a }));
}
export async function saveAppointmentMock(a: Appointment): Promise<Appointment> {
  await delay();
  if (a.id) {
    const idx = appointments.findIndex(x => x.id === a.id);
    if (idx > -1) appointments[idx] = { ...a };
    return { ...a };
  }
  const newA = { ...a, id: appointments.length + 1 };
  appointments.push(newA);
  return { ...newA };
}
export async function deleteAppointmentMock(id: number): Promise<void> {
  await delay();
  appointments = appointments.filter(a => a.id !== id);
}
