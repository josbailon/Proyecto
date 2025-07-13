// src/mocks/api.ts

// --------------------------------------------------
// Utility: simula latencia en las llamadas (delay)
// --------------------------------------------------
export function delay(ms: number = 300): Promise<void> {
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
  especialidad?: string;   // sólo para roles profesor/estudiante
  historial?: string;      // sólo para pacientes
}

const initialUsers: User[] = [
  { id: 1, nombre: 'Admin Uno',          email: 'admin@odontologia.com',        password: 'admin123', role: 'admin' },
  { id: 2, nombre: 'Estudiante Pérez',   email: 'estudiante@uni.edu',           password: 'est123',   role: 'estudiante', especialidad: 'Ortodoncia' },
  { id: 3, nombre: 'Profesor López',     email: 'profesor@uni.edu',             password: 'prof123',  role: 'profesor',  especialidad: 'Endodoncia' },
  { id: 4, nombre: 'Secretario Cruz',    email: 'secretario@odontologia.com',   password: 'sec123',   role: 'secretario' },
  { id: 5, nombre: 'Paciente González',  email: 'paciente@odontologia.com',     password: 'pac123',   role: 'estudiante', historial: 'Sin antecedentes' }
];

// --------------------------------------------------
// Admin / User API mocks
// --------------------------------------------------

/** Simula login: busca usuario por email + password */
export async function loginMock(email: string, password: string): Promise<User> {
  await delay();
  const user = initialUsers.find(u => u.email === email && u.password === password);
  if (!user) throw new Error('Credenciales inválidas');
  return { ...user };
}

/** Devuelve lista de usuarios (sin password) */
export async function fetchUsersMock(): Promise<User[]> {
  await delay();
  return initialUsers.map(u => ({ ...u, password: '' }));
}

/** Crea o edita un usuario. Si no existe id, lo añade. */
export async function saveUserMock(user: User): Promise<User> {
  await delay();
  const idx = initialUsers.findIndex(u => u.id === user.id);
  if (idx >= 0) {
    initialUsers[idx] = { ...user };
  } else {
    const newId = initialUsers.length
      ? Math.max(...initialUsers.map(u => u.id)) + 1
      : 1;
    user.id = newId;
    initialUsers.push({ ...user });
  }
  return { ...user };
}

/** Elimina un usuario por su ID */
export async function deleteUserMock(id: number): Promise<void> {
  await delay();
  const idx = initialUsers.findIndex(u => u.id === id);
  if (idx >= 0) initialUsers.splice(idx, 1);
}

// --------------------------------------------------
// Estudiante: Historias Clínicas
// --------------------------------------------------

export interface ClinicalHistory {
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
}

let histories: ClinicalHistory[] = [];

/** Lista todas las historias clínicas */
export async function fetchHistoriesMock(): Promise<ClinicalHistory[]> {
  await delay();
  return histories.map(h => ({ ...h }));
}

/** Crea o actualiza una historia clínica */
export async function saveHistoryMock(h: ClinicalHistory): Promise<ClinicalHistory> {
  await delay();
  const now = new Date().toISOString();
  if (h.id) {
    const idx = histories.findIndex(x => x.id === h.id);
    if (idx >= 0) {
      histories[idx] = { ...h, updatedAt: now };
      return { ...histories[idx] };
    }
  }
  const newEntry: ClinicalHistory = {
    ...h,
    id: histories.length + 1,
    createdAt: now,
    updatedAt: now
  };
  histories.push(newEntry);
  return { ...newEntry };
}

/** Elimina una historia clínica por ID */
export async function deleteHistoryMock(id: number): Promise<void> {
  await delay();
  histories = histories.filter(h => h.id !== id);
}

// --------------------------------------------------
// Estudiante: Casos Clínicos
// --------------------------------------------------

export interface ClinicalCase {
  id: number;
  patientId: number;
  title: string;
  description?: string;
  stage: string;
  createdAt: string;
  updatedAt: string;
}

let cases: ClinicalCase[] = [];

/** Lista casos clínicos */
export async function fetchCasesMock(): Promise<ClinicalCase[]> {
  await delay();
  return cases.map(c => ({ ...c }));
}

/** Crea o actualiza un caso clínico */
export async function saveCaseMock(c: ClinicalCase): Promise<ClinicalCase> {
  await delay();
  const now = new Date().toISOString();
  if (c.id) {
    const idx = cases.findIndex(x => x.id === c.id);
    if (idx >= 0) {
      cases[idx] = { ...c, updatedAt: now };
      return { ...cases[idx] };
    }
  }
  const newCase: ClinicalCase = {
    ...c,
    id: cases.length + 1,
    createdAt: now,
    updatedAt: now
  };
  cases.push(newCase);
  return { ...newCase };
}

/** Elimina un caso clínico */
export async function deleteCaseMock(id: number): Promise<void> {
  await delay();
  cases = cases.filter(c => c.id !== id);
}

// --------------------------------------------------
// Estudiante: Tareas Académicas
// --------------------------------------------------

export interface Assignment {
  id: number;
  studentId: number;
  title: string;
  dueDate: string;
  status: 'pendiente' | 'entregado' | 'corregido';
}

let assignments: Assignment[] = [];

/** Lista las tareas del estudiante */
export async function fetchAssignmentsMock(): Promise<Assignment[]> {
  await delay();
  return assignments.map(a => ({ ...a }));
}

/** Crea o edita una tarea académica */
export async function saveAssignmentMock(a: Assignment): Promise<Assignment> {
  await delay();
  if (a.id) {
    const idx = assignments.findIndex(x => x.id === a.id);
    if (idx >= 0) assignments[idx] = { ...a };
    return { ...a };
  }
  const newA: Assignment = { ...a, id: assignments.length + 1 };
  assignments.push(newA);
  return { ...newA };
}

/** Elimina una tarea académica */
export async function deleteAssignmentMock(id: number): Promise<void> {
  await delay();
  assignments = assignments.filter(a => a.id !== id);
}

// --------------------------------------------------
// Estudiante: Mensajería
// --------------------------------------------------

export interface Message {
  id: number;
  from: string;
  to: string;
  content: string;
  timestamp: string;
}

let messages: Message[] = [];

/** Recupera mensajes entre el usuario y su interlocutor */
export async function fetchMessagesMock(withUser: string): Promise<Message[]> {
  await delay();
  return messages.filter(m => m.from === withUser || m.to === withUser);
}

/** Envía un nuevo mensaje */
export async function sendMessageMock(msg: Omit<Message, 'id' | 'timestamp'>): Promise<void> {
  await delay();
  messages.push({
    ...msg,
    id: messages.length + 1,
    timestamp: new Date().toISOString()
  });
}

// --------------------------------------------------
// Estudiante: Odontograma
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

/** Recupera todos los registros del odontograma para un paciente */
export async function fetchOdontogramMock(patientId: number): Promise<OdontogramEntry[]> {
  await delay();
  return (odontograms[patientId] ?? []).map(e => ({ ...e }));
}

/** Crea o actualiza una sola entrada de odontograma */
export async function saveOdontogramEntryMock(
  patientId: number,
  entry: Partial<OdontogramEntry> & { tooth: string; status: ToothStatus }
): Promise<OdontogramEntry> {
  await delay();
  const now = new Date().toISOString();
  odontograms[patientId] = odontograms[patientId] ?? [];
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

/** Elimina una entrada de odontograma */
export async function deleteOdontogramEntryMock(patientId: number, id: string): Promise<void> {
  await delay();
  odontograms[patientId] = (odontograms[patientId] ?? []).filter(e => e.id !== id);
}

/** Reemplaza todo el odontograma de un paciente */
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
// Profesor: Gestión de Asignaciones
// --------------------------------------------------

export interface ProfessorAssignment {
  id: number;
  professorId: number;
  title: string;
  description: string;
}

let profAssignments: ProfessorAssignment[] = [];

/** Lista las asignaciones creadas por el profesor */
export async function fetchProfessorAssignmentsMock(): Promise<ProfessorAssignment[]> {
  await delay();
  return profAssignments.map(a => ({ ...a }));
}

/** Crea o edita una asignación del profesor */
export async function saveProfessorAssignmentMock(
  a: ProfessorAssignment
): Promise<ProfessorAssignment> {
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

/** Elimina una asignación del profesor */
export async function deleteProfessorAssignmentMock(id: number): Promise<void> {
  await delay();
  profAssignments = profAssignments.filter(a => a.id !== id);
}

// --------------------------------------------------
// Profesor: Progreso de Estudiantes
// --------------------------------------------------

export interface StudentProgress {
  id: number;
  studentId: number;
  professorId: number;
  progress: string;
}

let progressRecords: StudentProgress[] = [];

/** Lista registros de progreso de estudiantes */
export async function fetchProgressMock(): Promise<StudentProgress[]> {
  await delay();
  return progressRecords.map(r => ({ ...r }));
}

/** Crea o actualiza un registro de progreso */
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

/** Elimina un registro de progreso */
export async function deleteProgressMock(id: number): Promise<void> {
  await delay();
  progressRecords = progressRecords.filter(r => r.id !== id);
}

// --------------------------------------------------
// Profesor: Estudiantes por Curso
// --------------------------------------------------

export interface StudentInfo {
  id: number;
  name: string;
  course: string;
}

let studentsByCourse: StudentInfo[] = [];

/** Obtiene lista de estudiantes de un curso */
export async function fetchStudentsByCourseMock(course: string): Promise<StudentInfo[]> {
  await delay();
  return studentsByCourse.filter(s => s.course === course);
}

/** Añade un estudiante a un curso */
export async function addStudentToCourseMock(info: Omit<StudentInfo,'id'>): Promise<void> {
  await delay();
  studentsByCourse.push({ ...info, id: studentsByCourse.length + 1 });
}

/** Elimina un estudiante de un curso */
export async function removeStudentFromCourseMock(
  studentId: number,
  course: string
): Promise<void> {
  await delay();
  studentsByCourse = studentsByCourse.filter(
    s => !(s.id === studentId && s.course === course)
  );
}



// --------------------------------------------------
// Secretario: Citas
// --------------------------------------------------

export type AppointmentStatus = 'confirmada' | 'pendiente' | 'cancelada';

export interface Appointment {
  id: number;
  studentId: number;
  patientId: number;
  datetime: string;
  status: AppointmentStatus;
  notes?: string;
}

let appointments: Appointment[] = [];

/** Lista todas las citas programadas */
export async function fetchAppointmentsMock(): Promise<Appointment[]> {
  await delay();
  return appointments.map(a => ({ ...a }));
}

/** Crea o actualiza una cita */
export async function saveAppointmentMock(a: Appointment): Promise<Appointment> {
  await delay();
  if (a.id) {
    const idx = appointments.findIndex(x => x.id === a.id);
    if (idx > -1) appointments[idx] = { ...a };
    return { ...a };
  }
  const newA: Appointment = { ...a, id: appointments.length + 1 };
  appointments.push(newA);
  return { ...newA };
}

/** Elimina una cita */
export async function deleteAppointmentMock(id: number): Promise<void> {
  await delay();
  appointments = appointments.filter(a => a.id !== id);
}
