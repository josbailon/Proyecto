<!-- src/components/common/Sidebar.vue -->
<template>
  <nav class="app-sidebar" :class="{ 'show-mobile': showMobile }">
    <div class="brand">
      <div class="brand-logo-wrap">
        <img :src="logoSrc" alt="Logo" class="brand-logo" />
      </div>
      <div class="brand-text">
        <h2>{{ title }}</h2>
        <small>{{ subtitle }}</small>
      </div>
    </div>
    <ul class="nav-list">
      <li v-for="item in items" :key="item.name" class="nav-item">
        <RouterLink 
          :to="item.to" 
          class="nav-link" 
          active-class="active"
          @click="onNavClick"
        >
          <i :class="item.icon"></i>
          <span>{{ item.label }}</span>
        </RouterLink>
      </li>
    </ul>
    <div class="logout">
      <button @click="logout">
        <i class="fas fa-sign-out-alt"></i>
        <span>Cerrar Sesión</span>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import type { RouteLocationRaw } from 'vue-router'

const emit = defineEmits(['close-mobile'])
const props = defineProps<{
  title: string
  subtitle?: string
  logoSrc: string
  items: Array<{
    name: string
    label: string
    icon: string
    to: RouteLocationRaw
  }>
  showMobile?: boolean
}>()

const router = useRouter()
function logout() {
  localStorage.removeItem('user')
  router.replace({ name: 'Login' })
}
function onNavClick() {
  if (props.showMobile) emit('close-mobile')
}
</script>

<style scoped>
.app-sidebar {
  width: 240px;
  background: #e8f5e9;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 1.3rem 1rem 1rem 1rem;
  box-shadow: 2px 0 6px rgba(0,0,0,0.05);
  position: relative;
  z-index: 200;
  transition: left 0.35s cubic-bezier(.6,0,.45,1);
}

/* ---- Brand Mejorado ---- */
.brand {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  gap: 0.8rem;
  padding-bottom: 1.3rem;
  border-bottom: 2px solid #c8e6c9;
}

.brand-logo-wrap {
  background: #fff;
  border-radius: 1.1rem;
  box-shadow: 0 2px 12px #2e7d3240;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  width: 52px;
  height: 52px;
  margin-right: 0.15rem;
}
.brand-logo {
  width: 38px;
  height: 38px;
  border-radius: 0.8rem;
  object-fit: contain;
  display: block;
}

.brand-text {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  justify-content: center;
}
.brand-text h2 {
  margin: 0;
  color: #2e7d32;
  font-size: 1.22rem;
  font-weight: bold;
  letter-spacing: 0.5px;
}
.brand-text small {
  color: #388e3c;
  font-size: 0.98rem;
  font-weight: 500;
  margin-top: 2px;
  opacity: 0.92;
}

/* ---- Nav ---- */
.nav-list {
  flex: 1;
  list-style: none;
  padding: 0;
  margin: 0;
}
.nav-item + .nav-item {
  margin-top: 0.75rem;
}
.nav-link {
  display: flex;
  align-items: center;
  color: #2e7d32;
  text-decoration: none;
  padding: 0.52rem 0.6rem;
  border-radius: 0.29rem;
  transition: background 0.22s, color 0.18s;
  font-size: 1.01rem;
  font-weight: 500;
  gap: 0.65rem;
}
.nav-link i {
  width: 1.25rem;
  text-align: center;
  margin-right: 0.5rem;
  font-size: 1.18rem;
  opacity: 0.88;
}
.nav-link:hover,
.nav-link.active {
  background: #c8e6c9;
}

.logout {
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 2px solid #c8e6c9;
}
.logout button {
  width: 100%;
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #d32f2f;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem 0.6rem;
  border-radius: 0.25rem;
  gap: 0.5rem;
  font-size: 1rem;
  transition: background 0.13s;
}
.logout i {
  margin-right: 0.5rem;
}
.logout button:hover {
  background: rgba(211, 47, 47, 0.1);
  border-radius: 0.25rem;
}

/* ---- Responsive ---- */
@media (max-width: 992px) {
  .app-sidebar {
    position: fixed;
    top: 0;
    left: -100vw;
    height: 100vh;
    min-width: 65vw;
    max-width: 340px;
    border-radius: 0 1.1rem 1.1rem 0;
    box-shadow: 6px 0 24px rgba(30,58,138,0.13);
    transition: left 0.35s cubic-bezier(.6,0,.45,1);
  }
  .app-sidebar.show-mobile {
    left: 0;
  }
  .brand-logo-wrap {
    width: 46px;
    height: 46px;
    padding: 0.13rem;
  }
  .brand-logo {
    width: 32px;
    height: 32px;
    border-radius: 0.6rem;
  }
  .brand-text h2 {
    font-size: 1.07rem;
  }
  .brand-text small {
    font-size: 0.85rem;
  }
}
@media (max-width: 600px) {
  .app-sidebar {
    width: 86vw;
    min-width: 0;
    max-width: 98vw;
    padding: 0.65rem 0.32rem;
    border-radius: 0 0.85rem 0.85rem 0;
  }
}
</style>
