import { delay } from '../utils';

export interface StudentInfo {
  studentId: number;
  studentName: string;
  email: string;
  course: string;
}

let studentsByCourse: StudentInfo[] = [
  { studentId: 2, studentName: 'Jostin Estudiante', email: 'jostin@uni.edu', course: 'Odontología General' },
  { studentId: 5, studentName: 'María Pérez',       email: 'maria@uni.edu',  course: 'Endodoncia' },
  { studentId: 6, studentName: 'Carlos Ruiz',      email: 'carlos@uni.edu', course: 'Ortodoncia' }
];

export async function fetchStudentsByCourseMock(course: string): Promise<StudentInfo[]> {
  await delay();
  return studentsByCourse
    .filter(s => s.course === course)
    .map(s => ({ ...s }));
}

export async function addStudentToCourseMock(info: StudentInfo): Promise<void> {
  await delay();
  studentsByCourse.push({ ...info });
}

export async function removeStudentFromCourseMock(studentId: number, course: string): Promise<void> {
  await delay();
  studentsByCourse = studentsByCourse.filter(
    s => !(s.studentId === studentId && s.course === course)
  );
}
