// src/mocks/secretary/patients.ts

export interface Patient {
  id: number;
  nombre: string;
  cedula: string;
  canton: string;
  contacto: string;
  enfermedades?: string[];
  medicamentos?: string[];
  alergias?: string[];
  tipoSangre?: string;
  condiciones?: string[]; // Ej: ['diabetes', 'hipertensión']
  createdAt: string;
  updatedAt: string;
}

// Base de datos en memoria
let patientsDB: Patient[] = [
  {
    id: 1,
    nombre: "Carlos Mendoza",
    cedula: "1304567890",
    canton: "Portoviejo",
    contacto: "0987654321",
    enfermedades: ["asma"],
    medicamentos: ["salbutamol"],
    alergias: ["penicilina"],
    tipoSangre: "O+",
    condiciones: ["diabetes"],
    createdAt: "2025-07-01",
    updatedAt: "2025-07-01",
  },
  {
    id: 2,
    nombre: "Laura Vásquez",
    cedula: "1301122334",
    canton: "Manta",
    contacto: "laura@gmail.com",
    enfermedades: [],
    medicamentos: [],
    alergias: [],
    tipoSangre: "A-",
    condiciones: [],
    createdAt: "2025-07-02",
    updatedAt: "2025-07-02",
  },
];

// Simula latencia de red
function delay(ms = 300): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Fetch all patients
export async function fetchPatientsMock(): Promise<Patient[]> {
  await delay();
  return patientsDB.map(p => ({ ...p }));
}

// Save (create or update) patient
export async function savePatientMock(patient: Patient): Promise<Patient> {
  await delay();
  const idx = patientsDB.findIndex(p => p.id === patient.id);
  if (idx >= 0) {
    patientsDB[idx] = { ...patient, updatedAt: new Date().toISOString() };
  } else {
    patient.id = Math.max(0, ...patientsDB.map(p => p.id)) + 1;
    patient.createdAt = new Date().toISOString();
    patient.updatedAt = patient.createdAt;
    patientsDB.push(patient);
  }
  return { ...patient };
}

// Delete a patient by ID
export async function deletePatientMock(id: number): Promise<void> {
  await delay();
  patientsDB = patientsDB.filter(p => p.id !== id);
}
