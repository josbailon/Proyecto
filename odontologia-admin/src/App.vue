<!-- src/App.vue -->
<template>
  <!-- El único propósito de App.vue es servir de contenedor al router -->
  <div id="app">
    <router-view/>
  </div>
</template>

<script setup lang="ts">
// No hace falta lógica adicional aquí:
// todo el renderizado se gestiona a través de los layouts y las vistas hijas.
</script>

<style>
/* Importa aquí tus estilos globales (si prefieres hacerlo en App.vue) */
@import "@/assets/css/globals/reset.css";
@import "@/assets/css/globals/variables.css";
@import "@/assets/css/layout.css"; /* estilos comunes de layout */

/* Bootstrap ya se importa en main.ts, así que no es necesario repetirlo aquí */

/* Puedes añadir aquí reglas globales adicionales */
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
