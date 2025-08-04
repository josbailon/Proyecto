<!-- src/views/student/ResourcesView.vue -->
<template>
  <div class="resources-view">
    <header class="rv-header">
      <h1>Recursos del Estudiante</h1>
      <p class="rv-subtitle">
        Encuentra documentos, guías, formularios y retroalimentaciones subidas por tus profesores.
      </p>
    </header>

    <section class="rv-filters">
      <input
        v-model="searchTerm"
        type="search"
        class="rv-input"
        placeholder="🔍 Buscar por título o categoría..."
      />
      <select v-model="typeFilter" class="rv-select">
        <option value="">Todos los tipos</option>
        <option v-for="t in resourceTypes" :key="t" :value="t">{{ t }}</option>
      </select>
    </section>

    <section class="rv-grid">
      <article
        v-for="r in filteredResources"
        :key="r.id"
        class="rv-card"
      >
        <div class="rv-card-body">
          <h2 class="rv-title">{{ r.title }}</h2>
          <p class="rv-meta">
            <span><strong>Categoría:</strong> {{ r.category }}</span><br/>
            <span><strong>Tipo:</strong> {{ r.type }}</span>
          </p>
          <p class="rv-desc">{{ r.description }}</p>
        </div>
        <footer class="rv-card-footer">
          <small class="rv-uploaded">
            Subido por {{ r.uploadedBy }} el {{ r.uploadDate }}
          </small>
          <a
            :href="r.fileUrl"
            target="_blank"
            class="rv-btn"
            @click.prevent="downloadResource(r)"
          >
            Descargar
          </a>
        </footer>
      </article>
      <p v-if="filteredResources.length === 0" class="rv-no-results">
        No se encontraron recursos.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  fetchResourcesMock,
  type Resource,
  getResourceTypesMock
} from '@/mocks/student/resources'

const searchTerm = ref('')
const typeFilter = ref<string>('')
const resourceTypes = getResourceTypesMock()
const resources = ref<Resource[]>([])

// Carga inicial de recursos
onMounted(async () => {
  resources.value = await fetchResourcesMock()
})

const filteredResources = computed(() =>
  resources.value.filter(r =>
    (r.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
     r.category.toLowerCase().includes(searchTerm.value.toLowerCase())) &&
    (!typeFilter.value || r.type === typeFilter.value)
  )
)

// Simula descarga y cuenta descargas
async function downloadResource(resource: Resource) {
  try {
    await import('@/mocks/student/resources').then(mod => mod.incrementDownloadCountMock(resource.id))
    window.open(resource.fileUrl, '_blank')
  } catch (err) {
    console.error('Error al incrementar descargas', err)
  }
}
</script>

<style scoped>
@import '@/assets/css/pages/student/Resources.css';
</style>
