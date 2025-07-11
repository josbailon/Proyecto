<!-- src/views/professor/ProfileView.vue -->
<template>
  <section class="professor-profile container py-4">
    <!-- Sprint 3 – 2025-07-20 – Vista de Perfil de Profesor -->
    <h2 class="mb-4">Perfil del Profesor</h2>

    <div class="card shadow-sm mb-4">
      <div class="card-body">
        <div class="row align-items-center">
          <div class="col-md-3 text-center">
            <img
              src="@/assets/img/profesor.jpg"
              alt="Avatar Profesor"
              class="rounded-circle profile-avatar mb-2"
            />
          </div>
          <div class="col-md-9">
            <h4>{{ professor.nombre }}</h4>
            <p><strong>Email:</strong> {{ professor.email }}</p>
            <!-- Ahora TypeScript reconoce `.especialidad` -->
            <p v-if="professor.especialidad">
              <strong>Especialidad:</strong> {{ professor.especialidad }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-md-6">
        <div class="card text-center">
          <div class="card-body">
            <h5>Tareas Asignadas</h5>
            <h3>{{ assignmentsCount }}</h3>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card text-center">
          <div class="card-body">
            <h5>Estudiantes a Cargo</h5>
            <h3>{{ studentsCount }}</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
// Importamos el User corregido con `especialidad?`
import type { User } from '../../mocks/admin/user';
import { fetchUsersMock } from '../../mocks/api';

import type { ProfessorAssignment } from '../../mocks/professor/assignments';
import { fetchProfessorAssignmentsMock } from '../../mocks/professor/assignments';

import type { StudentInfo } from '../../mocks/professor/studentsByCourse';
import { fetchStudentsByCourseMock } from '../../mocks/professor/studentsByCourse';

const professor   = ref<User>({ id: 0, nombre: '', email: '', password: '', role: 'profesor' });
const assignments = ref<ProfessorAssignment[]>([]);
const students    = ref<StudentInfo[]>([]);

onMounted(async () => {
  const users = await fetchUsersMock();
  const prof  = users.find((u: User) => u.role === 'profesor');
  if (prof) {
    professor.value   = prof;
    assignments.value = await fetchProfessorAssignmentsMock();
    if (prof.especialidad) {
      students.value = await fetchStudentsByCourseMock(prof.especialidad);
    }
  }
});

const assignmentsCount = computed(() => assignments.value.length);
const studentsCount    = computed(() => students.value.length);
</script>

<style scoped>
.professor-profile .profile-avatar {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border: 3px solid var(--color-primary);
}
.professor-profile h2 {
  color: var(--color-primary);
  font-weight: 600;
}
.professor-profile .card {
  border-radius: var(--radius);
}
.professor-profile .card-body h5 {
  margin-bottom: 0.5rem;
}
.professor-profile .card-body h3 {
  color: var(--color-info);
  font-size: 2rem;
}
</style>
