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
    id: 101,
    nombre: 'Carlos Zambrano',
    cedula: '1301234567',
    canton: 'Manta',
    parroquia: 'Tarqui',
    contacto: 'carlos.zambrano@gmail.com',
    telefono: '0991122334',
    enfermedades: ['diabetes'],
    medicamentos: ['metformina'],
    alergias: ['penicilina'],
    tipoSangre: 'O+',
    condiciones: ['diabetes'],
    createdAt: '2025-07-01T10:00:00Z',
    updatedAt: '2025-07-05T08:30:00Z',
  },
  {
    id: 102,
    nombre: 'María Cedeño',
    cedula: '1301987654',
    canton: 'Portoviejo',
    contacto: 'maria.cedeno@hotmail.com',
    telefono: '0987654321',
    enfermedades: ['hipertensión'],
    medicamentos: ['enalapril'],
    alergias: [],
    tipoSangre: 'A+',
    condiciones: ['hipertensión'],
    createdAt: '2025-06-28T14:20:00Z',
    updatedAt: '2025-07-02T09:00:00Z',
  },
  {
    id: 103,
    nombre: 'Luis Mendoza',
    cedula: '1310456789',
    canton: 'Jaramijó',
    contacto: 'luis.mendoza@yahoo.com',
    enfermedades: [],
    medicamentos: [],
    alergias: ['aspirina'],
    tipoSangre: 'B-',
    condiciones: [],
    createdAt: '2025-07-10T11:15:00Z',
    updatedAt: '2025-07-12T16:40:00Z',
  },
  {
    id: 104,
    nombre: 'Ana Moreira',
    cedula: '1309876543',
    canton: 'Montecristi',
    parroquia: 'Aníbal San Andrés',
    contacto: 'ana.moreira@uleam.edu.ec',
    enfermedades: ['asma'],
    medicamentos: ['salbutamol'],
    alergias: ['polvo', 'moho'],
    tipoSangre: 'AB+',
    condiciones: ['asma'],
    createdAt: '2025-07-03T13:45:00Z',
    updatedAt: '2025-07-13T08:10:00Z',
  }
];
