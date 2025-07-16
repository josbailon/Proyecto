<template>
  <section class="container py-4">
    <h1 class="mb-4">Biblioteca de Recursos</h1>
    <ResourcesLibrary :resources="resources" />
  </section>
</template>

<script setup lang="ts">
import ResourcesLibrary from '../../components/student/ResourcesLibrary.vue'
import { ref } from 'vue'

interface Resource {
  title: string
  description: string
  url: string
}

const resources = ref<Resource[]>([
  {
    title: 'Guía de procedimientos básicos',
    description: 'Documento PDF con técnicas odontológicas fundamentales.',
    url: 'https://example.com/procedimientos.pdf'
  },
  {
    title: 'Video: higiene y esterilización',
    description: 'Tutorial en video sobre prácticas de higiene en el consultorio.',
    url: 'https://example.com/higiene.mp4'
  },
  {
    title: 'Plantilla de historial clínico',
    description: 'Formato descargable para registrar datos de pacientes.',
    url: 'https://example.com/historial.docx'
  }
])
</script>

<style scoped>
h1 {
  font-size: 1.5rem;
  font-weight: 600;
}
</style>
