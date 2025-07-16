<!-- src/components/student/OdontogramView.vue -->

<template>
  <section class="odontogram container py-4">
    <!-- Sprint 4 – 2025-07-19 – Odontograma Interactivo -->
    <div class="card shadow-sm">
      <div class="card-header">
        <h5>Odontograma Digital</h5>
      </div>
      <div class="card-body">
        <OdontogramForm
          :entries="studentStore.odontogram"
          @save-entry="onSaveEntry"
          @delete-entry="onDeleteEntry"
          @save-full="onSaveFull"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useStudentStore } from '../../store/student';
import { useAdminStore }   from '../../store/admin';
import OdontogramForm      from '../../components/student/OdontogramForm.vue';

const studentStore = useStudentStore();
const adminStore   = useAdminStore();
const studentId    = computed(() => adminStore.currentUser?.id ?? 0);

onMounted(() => {
  studentStore.loadOdontogram(studentId.value);
});

async function onSaveEntry(entry: { tooth: string; status: any; annotations?: string; id?: string }) {
  await studentStore.saveOdontogramEntry(studentId.value, entry);
}

async function onDeleteEntry(entryId: string) {
  await studentStore.deleteOdontogramEntry(studentId.value, entryId);
}

async function onSaveFull(entries: Array<{ tooth: string; status: any; annotations?: string }>) {
  await studentStore.saveFullOdontogram(studentId.value, entries);
}
</script>

<style src="../../assets/css/pages/student/OdontogramView.css" scoped></style>
