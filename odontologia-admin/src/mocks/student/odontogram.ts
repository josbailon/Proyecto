/** 
 * MOCK - src/mocks/student/odontogram.ts
 * -------------------------------------------
 * Datos de prueba para odontogramas.
 * Incluye dientes, opciones de daños y tratamientos,
 * y la relación de odontogramas con pacientes.
 */

// Tipos de odontogramas posibles
export type OdontogramType = "Adulto" | "Niño" | "Mixto";

// Diagnósticos (daños) que puede registrar el odontólogo
export type ToothStatus =
  | "Sano"
  | "Caries"
  | "Fractura"
  | "Restaurado"
  | "Ausente"
  | "Endodoncia"
  | "Prótesis"
  | "Sellado"
  | "Otros";

// Opciones de tratamientos que puede aplicar el odontólogo
export interface TreatmentOption {
  code: string;       // Ej.: "T001"
  name: string;       // Ej.: "Obturación"
  cost?: number;      // Costo estimado en USD
}

// Representa un diente individual
export interface Tooth {
  id: string;                // Número odontológico, ej. "11"
  name: string;              // Nombre descriptivo, ej. "Incisivo Central Superior Derecho"
  type: "Permanente" | "Temporal";
  status: ToothStatus;
  treatment?: string;        // Nombre de tratamiento asignado
  notes?: string;            // Notas clínicas adicionales
}

// Odontograma de un paciente
export interface Odontogram {
  id: number;
  patientId: number;
  type: OdontogramType;
  teeth: Tooth[];
  createdAt: string;
  updatedAt?: string;
}

// Pacientes de ejemplo (para asociar odontogramas)
export interface PatientOdontogram {
  id: number;
  name: string;
  odontograms: Odontogram[];
}

/* ---------------------------------------------
   LISTAS DE OPCIONES
---------------------------------------------- */

export const damageOptions: ToothStatus[] = [
  "Sano",
  "Caries",
  "Fractura",
  "Restaurado",
  "Ausente",
  "Endodoncia",
  "Prótesis",
  "Sellado",
  "Otros"
];

export const treatmentOptions: TreatmentOption[] = [
  { code: "T001", name: "Obturación", cost: 50 },
  { code: "T002", name: "Endodoncia", cost: 150 },
  { code: "T003", name: "Extracción", cost: 30 },
  { code: "T004", name: "Profilaxis", cost: 20 },
  { code: "T005", name: "Colocación Prótesis", cost: 200 },
  { code: "T006", name: "Sellante", cost: 25 },
  { code: "T007", name: "Control", cost: 0 },
];

/* ---------------------------------------------
   EJEMPLO DE PACIENTES Y ODONTOGRAMAS
---------------------------------------------- */

export const patientsOdontograms: PatientOdontogram[] = [
  {
    id: 1,
    name: "María González",
    odontograms: [
      {
        id: 101,
        patientId: 1,
        type: "Adulto",
        createdAt: "2025-07-20",
        teeth: [
          {
            id: "11",
            name: "Incisivo Central Superior Derecho",
            type: "Permanente",
            status: "Caries",
            treatment: "Obturación",
            notes: "Pequeña caries en cara vestibular."
          },
          {
            id: "21",
            name: "Incisivo Central Superior Izquierdo",
            type: "Permanente",
            status: "Sano"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Carlos López",
    odontograms: [
      {
        id: 102,
        patientId: 2,
        type: "Niño",
        createdAt: "2025-07-19",
        teeth: [
          {
            id: "51",
            name: "Incisivo Central Superior Derecho Temporal",
            type: "Temporal",
            status: "Fractura",
            treatment: "Endodoncia",
            notes: "Fractura complicada con exposición pulpar."
          }
        ]
      }
    ]
  }
];
