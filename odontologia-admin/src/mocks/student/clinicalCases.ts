/**
 * src/mocks/student/clinicalCases.ts
 *
 * Mock de casos clínicos para módulo de odontología.
 */

export type Status = 'Pendiente' | 'Aprobado' | 'Completado';

export interface Procedure {
  code: string;
  teeth: string;
  description: string;
  status: Status;
}

export interface Prescription {
  id: number;
  drug: string;
  dose: string;
}

export interface Appointment {
  id: number;
  date: string;
  status: string;
}

export interface Comment {
  by: string;
  at: string;
  text: string;
}

export interface ClinicalCase {
  id: number;
  patientName: string;
  title: string;
  stage: string;
  reason: string;
  symptoms: string;
  notes: string;
  createdAt: string;
  status: Status;
  description: string;
  procedures: Procedure[];
  prescriptions: Prescription[];
  appointments: Appointment[];
  comments: Comment[];
}

export const clinicalCases: ClinicalCase[] = [
  {
    id: 1,
    patientName: 'María González',
    title: 'Caso Endodoncia Molar Superior',
    stage: 'diagnostico',
    reason: 'Dolor intenso en molar derecho',
    symptoms: 'Dolor agudo al masticar, sensibilidad al frío',
    notes: 'Posible endodoncia en diente 16.',
    createdAt: '2024-07-01',
    status: 'Pendiente',
    description: 'Paciente presenta síntomas típicos de pulpitis irreversible. Se recomienda tratamiento de conducto en el molar afectado.',
    procedures: [
      {
        code: 'E123',
        teeth: '16',
        description: 'Endodoncia unirradicular',
        status: 'Pendiente'
      }
    ],
    prescriptions: [
      {
        id: 1,
        drug: 'Ibuprofeno 400mg',
        dose: 'Cada 8h durante 3 días'
      }
    ],
    appointments: [
      {
        id: 1,
        date: '2024-07-10 09:00',
        status: 'Programada'
      }
    ],
    comments: [
      {
        by: 'Dr. Pérez',
        at: '2024-07-02',
        text: 'Revisar diagnóstico con radiografía.'
      }
    ]
  },
  {
    id: 2,
    patientName: 'Carlos López',
    title: 'Seguimiento Ortodoncia Ajuste Mensual',
    stage: 'seguimiento',
    reason: 'Seguimiento de ortodoncia',
    symptoms: 'Sin dolor, solo molestias leves.',
    notes: 'Paciente en fase de ajuste mensual.',
    createdAt: '2024-06-20',
    status: 'Aprobado',
    description: 'Control rutinario de ortodoncia. No se presentan complicaciones, paciente tolera bien el tratamiento.',
    procedures: [
      {
        code: 'O110',
        teeth: '',
        description: 'Ajuste de brackets',
        status: 'Aprobado'
      }
    ],
    prescriptions: [],
    appointments: [
      {
        id: 1,
        date: '2024-07-15 11:00',
        status: 'Confirmada'
      }
    ],
    comments: [
      {
        by: 'Dra. Gómez',
        at: '2024-06-21',
        text: 'Buen progreso, seguir revisiones mensuales.'
      }
    ]
  },
  {
    id: 3,
    patientName: 'Ana Torres',
    title: 'Limpieza Dental y Evaluación de Encías',
    stage: 'procedimiento',
    reason: 'Limpieza dental y control de encías',
    symptoms: 'Sangrado leve al cepillar.',
    notes: 'Signos de gingivitis leve.',
    createdAt: '2024-06-10',
    status: 'Completado',
    description: 'Se realiza profilaxis con ultrasonido. Se indican medidas de higiene bucal. Gingivitis controlada.',
    procedures: [
      {
        code: 'P200',
        teeth: '',
        description: 'Profilaxis con ultrasonido',
        status: 'Completado'
      }
    ],
    prescriptions: [
      {
        id: 1,
        drug: 'Enjuague con clorhexidina 0.12%',
        dose: '2 veces al día por 7 días'
      }
    ],
    appointments: [],
    comments: [
      {
        by: 'Dr. López',
        at: '2024-06-11',
        text: 'Encías mejoraron tras profilaxis.'
      }
    ]
  }
];
