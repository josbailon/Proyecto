// src/router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// PUBLIC VIEWS
import Login from '@/views/Login.vue'

// LAYOUTS
import AdminLayout from '@/components/layouts/AdminLayout.vue'
import ProfessorLayout from '@/components/layouts/ProfessorLayout.vue'
import SecretaryLayout from '@/components/layouts/SecretaryLayout.vue'
import StudentLayout from '@/components/layouts/StudentLayout.vue'

// ADMIN VIEWS
import HomeAdmin from '@/views/admin/HomeAdmin.vue'
import AdminUsers from '@/views/admin/AdminUsers.vue'
import AdminSettings from '@/views/admin/AdminSettings.vue'

// PROFESSOR VIEWS
import ProfessorDashboardView from '@/views/professor/ProfessorDashboardView.vue'
import AssignmentsManagementView from '@/views/professor/AssignmentsManagementView.vue'
import ProfileView from '@/views/professor/ProfileView.vue'
import StudentProgressView from '@/views/professor/StudentProgressView.vue'

// SECRETARY VIEWS
import SecretaryDashboardView from '@/views/secretary/SecretaryDashboardView.vue'
import PatientAssignmentView from '@/views/secretary/PatientAssignmentView.vue'
import WeeklyScheduleView from '@/views/secretary/WeeklyScheduleView.vue'

// STUDENT VIEWS
import DashboardView from '@/views/student/DashboardView.vue'
import ClinicalHistoryView from '@/views/student/ClinicalHistoryView.vue'
import ClinicalCasesView from '@/views/student/ClinicalCasesView.vue'
import AssignmentsView from '@/views/student/AssignmentsView.vue'
import CommunicationView from '@/views/student/CommunicationView.vue'
import OdontogramView from '@/views/student/OdontogramView.vue'

const routes: RouteRecordRaw[] = [
  // Public
  {
    path: '/login',
    name: 'Login',
    component: Login
  },

  // Admin
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, roles: ['admin'] },
    children: [
      { path: '', name: 'AdminHome', component: HomeAdmin },
      { path: 'users', name: 'AdminUsers', component: AdminUsers },
      { path: 'settings', name: 'AdminSettings', component: AdminSettings }
    ]
  },

  // Professor
  {
    path: '/professor',
    component: ProfessorLayout,
    meta: { requiresAuth: true, roles: ['profesor'] },
    children: [
      { path: '', name: 'ProfessorDashboard', component: ProfessorDashboardView },
      { path: 'assignments', name: 'ProfessorAssignments', component: AssignmentsManagementView },
      { path: 'profile', name: 'ProfessorProfile', component: ProfileView },
      { path: 'progress', name: 'StudentProgress', component: StudentProgressView }
    ]
  },

  // Secretary
  {
    path: '/secretary',
    component: SecretaryLayout,
    meta: { requiresAuth: true, roles: ['secretario'] },
    children: [
      { path: '', name: 'SecretaryDashboard', component: SecretaryDashboardView },
      { path: 'patients', name: 'PatientAssignment', component: PatientAssignmentView },
      { path: 'schedule', name: 'WeeklySchedule', component: WeeklyScheduleView }
    ]
  },

  // Student
  {
    path: '/student',
    component: StudentLayout,
    meta: { requiresAuth: true, roles: ['estudiante'] },
    children: [
      { path: '', name: 'StudentDashboard', component: DashboardView },
      { path: 'history', name: 'ClinicalHistory', component: ClinicalHistoryView },
      { path: 'cases', name: 'ClinicalCases', component: ClinicalCasesView },
      { path: 'assignments', name: 'Assignments', component: AssignmentsView },
      { path: 'communication', name: 'Communication', component: CommunicationView },
      { path: 'odontogram', name: 'Odontogram', component: OdontogramView }
    ]
  },

  // Fallback
  { path: '/:pathMatch(.*)*', redirect: '/login' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Global guard: auth + role check
router.beforeEach((to, _from, next) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  if (to.meta.requiresAuth) {
    if (!user) {
      return next({ name: 'Login' })
    }
    const allowedRoles = (to.meta.roles || []) as string[]
    if (!allowedRoles.includes(user.role)) {
      return next({ name: 'Login' })
    }
  }
  next()
})

export default router
