<template>
  <div id="app">
    <Header v-if="route.name !== 'Login'" @toggle-sidebar="collapsed = !collapsed" />
    <div class="app-body d-flex">
      <Sidebar v-if="route.name !== 'Login'" :collapsed="collapsed" />
      <main class="main-content flex-fill">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import Header  from './components/common/Header.vue';
import Sidebar from './components/common/Sidebar.vue';

export default defineComponent({
  name: 'App',
  components: { Header, Sidebar },
  setup() {
    const collapsed = ref(false);
    const route = useRoute();
    return { collapsed, route };
  }
});
</script>

<style>
:root {
  --header-height: 56px;
  --sidebar-width: 250px;
  --sidebar-collapsed: 80px;
  --spacing-md: 1rem;
}
* { box-sizing: border-box; }
body, html { margin: 0; padding: 0; height: 100%; }
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: var(--header-height);
  z-index: 200;
}
.app-body {
  display: flex;
  margin-top: var(--header-height);
  flex: 1;
  overflow: hidden;
}
.sidebar {
  width: var(--sidebar-width);
  transition: width .3s;
  overflow-y: auto;
}
.sidebar.collapsed { width: var(--sidebar-collapsed); }
.main-content {
  padding: var(--spacing-md);
  overflow-y: auto;
}
</style>
