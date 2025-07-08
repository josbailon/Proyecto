// src/mocks/student/assignments.ts
export interface Assignment {
  id: number;
  title: string;
  dueDate: string;
  status: 'pendiente' | 'entregado' | 'corregido';
}

export const fetchAssignmentsMock = async (): Promise<Assignment[]> => {
  return [
    { id:1, title:'Caso clínico 1', dueDate:'2025-07-15', status:'pendiente' },
    { id:2, title:'Reporte de investigación', dueDate:'2025-07-20', status:'entregado' }
  ];
};
