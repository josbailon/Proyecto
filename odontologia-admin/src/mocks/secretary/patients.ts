// src/mocks/secretary/patients.ts

export interface Patient {
  id: number;
  nombre: string;
  cedula: string;
  canton: string;
  parroquia?: string;
  contacto: string;
  telefono?: string;
  enfermedades?: string[];
  medicamentos?: string[];
  alergias?: string[];
  tipoSangre?: string;
  condiciones?: string[];
  createdAt: string;
  updatedAt: string;
}

export const mockPatients: Patient[] = [
  {
    id: 1,
    nombre: 'Carlos Martínez',
    cedula: '1304523123',
    canton: 'Manta',
    parroquia: 'Tarqui',
    contacto: 'carlos@gmail.com',
    telefono: '0999999999',
    enfermedades: ['Diabetes'],
    medicamentos: ['Metformina'],
    alergias: ['Penicilina'],
    tipoSangre: 'O+',
    condiciones: ['Hipertensión'],
    createdAt: '2025-07-01',
    updatedAt: '2025-07-10',
  }
];

// Simula una llamada asíncrona para obtener pacientes
export async function fetchPatientsMock(): Promise<Patient[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockPatients;
}

// Guarda (crea o edita) un paciente
export async function savePatientMock(newPatient: Patient): Promise<void> {
  const index = mockPatients.findIndex(p => p.id === newPatient.id);
  if (index >= 0) {
    mockPatients[index] = newPatient;
  } else {
    mockPatients.push({ ...newPatient, id: Date.now() });
  }
}

// Elimina un paciente por ID
export async function deletePatientMock(id: number): Promise<void> {
  const index = mockPatients.findIndex(p => p.id === id);
  if (index >= 0) {
    mockPatients.splice(index, 1);
  }
}
