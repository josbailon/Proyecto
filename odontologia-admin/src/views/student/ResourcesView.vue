<!-- src/views/student/ResourcesView.vue -->
<template>
  <div class="resources">
    <h1>Recursos del Estudiante</h1>
    <p class="text-muted">Encuentra documentos, guías, formularios y retroalimentaciones subidas por tus profesores.</p>

    <div class="filters">
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Buscar por título o materia..."
      />
      <select v-model="typeFilter">
        <option value="">Todos los tipos</option>
        <option value="PDF">PDF</option>
        <option value="Guía">Guía</option>
        <option value="Retroalimentación">Retroalimentación</option>
        <option value="Formulario">Formulario</option>
      </select>
    </div>

    <div class="resources-grid">
      <div
        v-for="r in filteredResources"
        :key="r.id"
        class="resource-card"
      >
        <h4>{{ r.title }}</h4>
        <p class="subject"><strong>Materia:</strong> {{ r.subject }}</p>
        <p class="type"><strong>Tipo:</strong> {{ r.type }}</p>
        <p class="desc">{{ r.description }}</p>
        <p class="uploaded-by">
          Subido por: {{ r.uploadedBy }} <br />
          <small class="text-muted">{{ r.uploadedAt }}</small>
        </p>
        <a
          class="btn-download"
          :href="r.file"
          target="_blank"
        >
          Descargar
        </a>
      </div>
    </div>

    <div v-if="filteredResources.length === 0" class="no-results">
      <p>No se encontraron recursos.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { resourcesMock, type Resource, type ResourceType } from '../../mocks/student/resources';

const searchTerm = ref('');
const typeFilter = ref<ResourceType | ''>('');

const resources = ref<Resource[]>(resourcesMock);

const filteredResources = computed(() =>
  resources.value.filter(r =>
    (r.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
     r.subject.toLowerCase().includes(searchTerm.value.toLowerCase())) &&
    (!typeFilter.value || r.type === typeFilter.value)
  )
);
</script>

<style scoped src="@/assets/css/pages/student/Resources.css"></style>
