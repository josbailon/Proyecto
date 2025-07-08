// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

// Public views
import Login from '../views/Login.vue';

// Layouts
import AdminLayout     from '../components/layouts/AdminLayout.vue';
import StudentLayout   from '../components/layouts/StudentLayout.vue';
import ProfessorLayout from '../components/layouts/ProfessorLayout.vue';
import SecretaryLayout from '../components/layouts/SecretaryLayout.vue';

// Admin pages
import HomeAdmin    from '../views/admin/HomeAdmin.vue';
import AdminUsers   from '../views/admin/AdminUsers.vue';
import AdminSettings from '../views/admin/AdminSettings.vue';

// Student pages
import DashboardView        from '../views/student/DashboardView.vue';
import ClinicalHistoryView  from '../views/student/ClinicalHistoryView.vue';
import ClinicalCasesView    from '../views/student/ClinicalCasesView.vue';
import AssignmentsView      from '../views/student/AssignmentsView.vue';
import OdontogramView       from '../views/student/OdontogramView.vue';
import CommunicationView    from '../views/student/CommunicationView.vue';

// Professor pages
import ProfessorDashboardView     from '../views/professor/ProfessorDashboardView.vue';
import AssignmentsManagementView  from '../views/professor/AssignmentsManagementView.vue';
import StudentProgressView        from '../views/professor/StudentProgressView.vue';
import ProfileView                from '../views/professor/ProfileView.vue';

// Secretary pages
import SecretaryDashboardView  from '../views/secretary/SecretaryDashboardView.vue';
import PatientAssignmentView   from '../views/secretary/PatientAssignmentView.vue';
import WeeklyScheduleView      from '../views/secretary/WeeklyScheduleView.vue';

const routes: RouteRecordRaw[] = [
  // Public
  { path: '/login', name: 'Login', component: Login },

  // Admin
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, roles: ['admin'] },
    children: [
      { path: '',         name: 'HomeAdmin',     component: HomeAdmin     },
      { path: 'users',    name: 'AdminUsers',    component: AdminUsers    },
      { path: 'settings', name: 'AdminSettings', component: AdminSettings }
    ]
  },

  // Student
  {
    path: '/student',
    component: StudentLayout,
    meta: { requiresAuth: true, roles: ['estudiante'] },
    children: [
      { path: 'dashboard',   name: 'StudentDashboard',   component: DashboardView       },
      { path: 'histories',   name: 'StudentHistories',   component: ClinicalHistoryView },
      { path: 'cases',       name: 'StudentCases',       component: ClinicalCasesView   },
      { path: 'assignments', name: 'StudentAssignments', component: AssignmentsView     },
      { path: 'odontogram',  name: 'StudentOdontogram',  component: OdontogramView      },
      { path: 'messages',    name: 'StudentMessages',    component: CommunicationView   }
    ]
  },

  // Professor
  {
    path: '/professor',
    component: ProfessorLayout,
    meta: { requiresAuth: true, roles: ['profesor'] },
    children: [
      { path: 'dashboard',   name: 'ProfessorDashboard',        component: ProfessorDashboardView    },
      { path: 'assignments', name: 'ProfessorAssignments',      component: AssignmentsManagementView },
      { path: 'progress',    name: 'ProfessorProgress',         component: StudentProgressView       },
      { path: 'profile',     name: 'ProfessorProfile',          component: ProfileView               }
    ]
  },

  // Secretary
  {
    path: '/secretary',
    component: SecretaryLayout,
    meta: { requiresAuth: true, roles: ['secretario'] },
    children: [
      { path: 'dashboard',       name: 'SecretaryDashboard',       component: SecretaryDashboardView   },
      { path: 'assign-patients', name: 'PatientAssignment',        component: PatientAssignmentView    },
      { path: 'schedule',        name: 'WeeklySchedule',           component: WeeklyScheduleView       }
    ]
  },

  // Fallback
  { path: '/:pathMatch(.*)*', redirect: '/login' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Global guard: authentication & role check
router.beforeEach((to, _from, next) => {
  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) as { role?: string } : null;

  if (to.meta.requiresAuth) {
    if (!user) {
      return next({ name: 'Login' });
    }
    const allowed = to.meta.roles as string[] | undefined;
    if (allowed && !allowed.includes(user.role ?? '')) {
      return next({ name: 'Login' });
    }
  }
  next();
});

export default router;
