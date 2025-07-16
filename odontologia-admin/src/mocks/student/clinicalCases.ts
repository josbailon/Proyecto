// src/mocks/student/clinicalCases.ts
// Mock de datos de Casos Clínicos

export type Status = 'Borrador' | 'Pendiente' | 'Aprobado' | 'Completado';

export interface ClinicalCase {
  id: number;
  patientName: string;
  createdAt: string;
  status: Status;
  reason: string;
  description: string;
  treatment: string;
  prescriptions: string[];
  appointments: string[];
  comments: Comment[];
  procedures: Procedure[];
}

export interface Comment {
  by: string;
  at: string;
  text: string;
}

export interface Procedure {
  code: string;
  teeth: string;
  description: string;
  status: Status;
}

export const clinicalCasesMock: ClinicalCase[] = [
  {
    id: 1,
    patientName: 'María González',
    createdAt: '2025-07-15',
    status: 'Pendiente',
    reason: 'Dolor en molar superior derecho',
    description: 'Paciente presenta dolor agudo al masticar. Sospecha de caries profunda.',
    treatment: 'Obturación con resina compuesta en pieza 16.',
    prescriptions: ['Ibuprofeno 400mg cada 8h', 'Enjuague bucal con clorhexidina'],
    appointments: ['2025-07-20 10:00'],
    comments: [
      {
        by: 'Dr. Pérez',
        at: '2025-07-16',
        text: 'Revisar radiografía antes de proceder.'
      }
    ],
    procedures: [
      {
        code: 'K021',
        teeth: '16',
        description: 'Obturación de caries profunda en pieza 16',
        status: 'Pendiente'
      }
    ]
  },
  {
    id: 2,
    patientName: 'Luis Ramírez',
    createdAt: '2025-07-10',
    status: 'Aprobado',
    reason: 'Revisión de ortodoncia',
    description: 'Paciente en control mensual de brackets. Sin hallazgos relevantes.',
    treatment: 'Ajuste de alambres y revisión de higiene.',
    prescriptions: [],
    appointments: ['2025-07-25 09:30'],
    comments: [],
    procedures: [
      {
        code: 'O110',
        teeth: '',
        description: 'Ajuste mensual de brackets',
        status: 'Aprobado'
      }
    ]
  },
  {
    id: 3,
    patientName: 'Ana Torres',
    createdAt: '2025-06-28',
    status: 'Completado',
    reason: 'Limpieza dental',
    description: 'Profilaxis realizada sin complicaciones.',
    treatment: 'Limpieza profesional con ultrasonido y aplicación de flúor.',
    prescriptions: ['Enjuague bucal dos veces al día'],
    appointments: [],
    comments: [
      {
        by: 'Dr. López',
        at: '2025-06-29',
        text: 'Caso completado satisfactoriamente.'
      }
    ],
    procedures: [
      {
        code: 'L010',
        teeth: '',
        description: 'Profilaxis dental',
        status: 'Completado'
      }
    ]
  }
];
