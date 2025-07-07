import { createRouter, createWebHistory } from 'vue-router';
import Login      from '../views/Login.vue';
import HomeAdmin  from '../views/admin/HomeAdmin.vue';
import AdminUsers from '../views/admin/AdminUsers.vue';
import Settings from '../views/admin/Settings.vue';


const routes = [
  { path: '/login',        name: 'Login',      component: Login },
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
  {
    path: '/admin/settings',
    name: 'Settings',
    component: Settings,
    meta: { requiresAuth: true, roles: ['admin'] }    
  },
  { path: '/:pathMatch(.*)*', redirect: '/login' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, _from, next) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (to.meta.requiresAuth && !user) return next({ name: 'Login' });
  if (to.meta.roles && user?.role && !(to.meta.roles as string[]).includes(user.role)) {
    return next({ name: 'HomeAdmin' });
  }
  next();
});

export default router;
