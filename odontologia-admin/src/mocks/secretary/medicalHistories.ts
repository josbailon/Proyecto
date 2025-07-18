// src/mocks/secretary/medicalHistories.ts

// --------------------------------------------------
// Tipo: Historia médica inicial (cuestionario de tamizaje)
// --------------------------------------------------

export interface MedicalHistory {
  id: number;
  patientId: number;
  enfermedades: string[];
  medicamentos: string[];
  alergias: string[];
  tipoSangre: string;
  condiciones: string[];
  createdAt: string;
  updatedAt: string;
}

// --------------------------------------------------
// Datos simulados
// --------------------------------------------------

export const medicalHistories: MedicalHistory[] = [
  {
    id: 1,
    patientId: 1,
    enfermedades: ['Diabetes', 'Hipertensión'],
    medicamentos: ['Metformina', 'Losartán'],
    alergias: ['Penicilina'],
    tipoSangre: 'O+',
    condiciones: ['Problemas cardíacos'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    patientId: 2,
    enfermedades: [],
    medicamentos: [],
    alergias: [],
    tipoSangre: 'A-',
    condiciones: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
