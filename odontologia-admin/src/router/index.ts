import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

// Páginas públicas
import Login from '../views/Login.vue';

// Rutas de Admin
import HomeAdmin from '../views/admin/HomeAdmin.vue';
import AdminUsers from '../views/admin/AdminUsers.vue';
// Si creas esta vista, descoméntala y colócala en views/admin:
// import AdminSettings from '../views/admin/AdminSettings.vue';

// Rutas de Estudiante
import DashboardView from '../views/student/DashboardView.vue';
import ClinicalHistoryView from '../views/student/ClinicalHistoryView.vue';
import ClinicalCasesView from '../views/student/ClinicalCasesView.vue';
import AssignmentsView from '../views/student/AssignmentsView.vue';
import OdontogramView from '../views/student/OdontogramView.vue';
import CommunicationView from '../views/student/CommunicationView.vue';

const routes: RouteRecordRaw[] = [
  { path: '/login', name: 'Login', component: Login },

  // Admin
  {
    path: '/admin',
    name: 'HomeAdmin',
    component: HomeAdmin,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: AdminUsers,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  // Si implementas ajustes, descomenta:
  // {
  //   path: '/admin/settings',
  //   name: 'AdminSettings',
  //   component: AdminSettings,
  //   meta: { requiresAuth: true, roles: ['admin'] }
  // },

  // Estudiante
  {
    path: '/student/dashboard',
    name: 'StudentDashboard',
    component: DashboardView,
    meta: { requiresAuth: true, roles: ['estudiante'] }
  },
  {
    path: '/student/histories',
    name: 'StudentHistories',
    component: ClinicalHistoryView,
    meta: { requiresAuth: true, roles: ['estudiante'] }
  },
  {
    path: '/student/cases',
    name: 'StudentCases',
    component: ClinicalCasesView,
    meta: { requiresAuth: true, roles: ['estudiante'] }
  },
  {
    path: '/student/assignments',
    name: 'StudentAssignments',
    component: AssignmentsView,
    meta: { requiresAuth: true, roles: ['estudiante'] }
  },
  {
    path: '/student/odontogram',
    name: 'StudentOdontogram',
    component: OdontogramView,
    meta: { requiresAuth: true, roles: ['estudiante'] }
  },
  {
    path: '/student/messages',
    name: 'StudentMessages',
    component: CommunicationView,
    meta: { requiresAuth: true, roles: ['estudiante'] }
  },

  // Redirige cualquier otra ruta al login
  { path: '/:pathMatch(.*)*', redirect: '/login' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Guard global para autenticación y roles
router.beforeEach((to, _from, next) => {
  const userJson = localStorage.getItem('user');
  const user = userJson ? (JSON.parse(userJson) as { role?: string }) : null;

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
