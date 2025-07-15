<!-- src/views/student/ClinicalCasesView.vue -->
<template>
  <div class="ccv">
    <!-- Barra superior con título y acciones -->
    <div class="ccv-header">
      <div class="ccv-header__title">
        <i class="fas fa-file-medical-alt"></i>
        <h1>Mis Casos Clínicos</h1>
      </div>
      <div class="ccv-header__actions">
        <div class="ccv-search">
          <i class="fas fa-search"></i>
          <input
            v-model="filterTerm"
            @keyup.enter="applyFilter"
            placeholder="Buscar por paciente o ID…"
          />
        </div>
        <button class="btn ccv-btn ccv-btn--filter" @click="applyFilter">
          <i class="fas fa-filter"></i>
        </button>
        <button class="btn ccv-btn ccv-btn--add" @click="createCase">
          <i class="fas fa-plus"></i> Nuevo caso
        </button>
      </div>
    </div>

    <!-- Grid de tarjetas -->
    <div v-if="filteredCases.length" class="ccv-grid">
      <div
        v-for="c in filteredCases"
        :key="c.id"
        class="ccv-card"
      >
        <div class="ccv-card__stripe" :class="stripeColor(c.status)"></div>
        <div class="ccv-card__body">
          <div class="ccv-card__header">
            <h2>#{{ c.id }}</h2>
            <span class="ccv-badge" :class="badgeColor(c.status)">
              {{ c.status }}
            </span>
          </div>
          <p class="ccv-card__patient">{{ c.patientName }}</p>
          <p class="ccv-card__date">Creado: {{ c.createdAt }}</p>
          <p class="ccv-card__reason"><strong>Motivo:</strong> {{ c.reason }}</p>
        </div>
        <button class="ccv-card__btn" @click="openCase(c)">
          <i class="fas fa-eye"></i> Ver
        </button>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="ccv-empty">
      <i class="fas fa-folder-open"></i>
      <p>No se encontraron casos.</p>
    </div>

    <!-- Modal de detalle -->
    <transition name="ccv-fade">
      <div
        v-if="selectedCase"
        class="ccv-modal-backdrop"
        @click.self="closeModal"
      ></div>
    </transition>
    <transition name="ccv-slide">
      <div v-if="selectedCase" class="ccv-modal">
        <header class="ccv-modal__header">
          <div>
            <i class="fas fa-file-medical-alt"></i>
            <h3>Caso #{{ selectedCase.id }} – {{ selectedCase.patientName }}</h3>
          </div>
          <button class="ccv-modal__close" @click="closeModal">×</button>
        </header>
        <nav class="ccv-modal__tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </nav>
        <section class="ccv-modal__body">
          <div v-if="activeTab==='desc'" class="ccv-panel">
            <h4>Descripción</h4>
            <dl>
              <dt>Motivo de consulta:</dt><dd>{{ selectedCase.reason }}</dd>
              <dt>Síntomas:</dt><dd>{{ selectedCase.symptoms }}</dd>
              <dt>Notas:</dt><dd>{{ selectedCase.notes || '–' }}</dd>
            </dl>
          </div>
          <div v-if="activeTab==='treat'" class="ccv-panel">
            <h4>Tratamiento</h4>
            <table class="ccv-table">
              <thead>
                <tr><th>Código</th><th>Dientes</th><th>Descripción</th><th>Estado</th></tr>
              </thead>
              <tbody>
                <tr v-for="p in selectedCase.procedures" :key="p.code">
                  <td>{{ p.code }}</td>
                  <td>{{ p.teeth }}</td>
                  <td>{{ p.description }}</td>
                  <td><span class="ccv-badge-sm" :class="badgeColor(p.status)">{{ p.status }}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="activeTab==='rx'" class="ccv-panel">
            <h4>Prescripciones</h4>
            <ul class="ccv-list">
              <li v-for="r in selectedCase.prescriptions" :key="r.id">
                <strong>{{ r.drug }}</strong> — {{ r.dose }}
              </li>
            </ul>
          </div>
          <div v-if="activeTab==='appts'" class="ccv-panel">
            <h4>Citas</h4>
            <ul class="ccv-list">
              <li v-for="a in selectedCase.appointments" :key="a.id">
                {{ a.date }} — {{ a.status }}
              </li>
            </ul>
          </div>
          <div v-if="activeTab==='notes'" class="ccv-panel">
            <h4>Comentarios</h4>
            <ul class="ccv-list">
              <li v-for="n in selectedCase.comments" :key="n.at">
                <small>{{ n.by }} ({{ n.at }}):</small> {{ n.text }}
              </li>
            </ul>
          </div>
        </section>
        <footer class="ccv-modal__footer">
          <button class="btn ccv-btn ccv-btn--primary" @click="closeModal">Cerrar</button>
        </footer>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

type Status = 'Borrador'|'Pendiente'|'Aprobado'|'Completado';
interface ClinicalCase {
  id:number; patientName:string; createdAt:string; status:Status;
  reason:string; symptoms:string; notes?:string;
  procedures:{ code:string; teeth:string; description:string; status:Status }[];
  prescriptions:{ id:number; drug:string; dose:string }[];
  appointments:{ id:number; date:string; status:string }[];
  comments:{ by:string; at:string; text:string }[];
}

const filterTerm = ref('');
const cases = ref<ClinicalCase[]>([
  {
    id:101,
    patientName:'María González',
    createdAt:'12 ene 2024',
    status:'Borrador',
    reason:'Dolor molar',
    symptoms:'Inflamación',
    notes:'Alergia a penicilina.',
    procedures:[
      { code:'K021', teeth:'16', description:'Extracción', status:'Borrador' }
    ],
    prescriptions:[
      { id:1, drug:'Ibuprofeno', dose:'400mg/8h' }
    ],
    appointments:[
      { id:1, date:'20 ene 2024, 10:00', status:'Programada' }
    ],
    comments:[
      { by:'Dr. Pérez', at:'13 ene 2024', text:'Revisar coagulación.' }
    ]
  }
]);

const filteredCases = computed(() =>
  cases.value.filter(c =>
    c.patientName.toLowerCase().includes(filterTerm.value.toLowerCase()) ||
    String(c.id).includes(filterTerm.value)
  )
);

const selectedCase = ref<ClinicalCase|null>(null);
const tabs = [
  { id:'desc', label:'Descripción' },
  { id:'treat', label:'Tratamiento' },
  { id:'rx', label:'Recetas' },
  { id:'appts', label:'Citas' },
  { id:'notes', label:'Comentarios' }
];
const activeTab = ref('desc');

function applyFilter() {}
function createCase() { alert('Crear un nuevo caso…'); }
function openCase(c:ClinicalCase) { selectedCase.value = c; activeTab.value = 'desc'; }
function closeModal() { selectedCase.value = null; }

function badgeColor(s:Status){
  return {
    Borrador:'ccv-badge--gray',
    Pendiente:'ccv-badge--yellow',
    Aprobado:'ccv-badge--blue',
    Completado:'ccv-badge--green'
  }[s];
}
function stripeColor(s:Status){
  return {
    Borrador:'ccv-stripe--gray',
    Pendiente:'ccv-stripe--yellow',
    Aprobado:'ccv-stripe--blue',
    Completado:'ccv-stripe--green'
  }[s];
}
</script>

<style scoped>
/* Contenedor general */
.ccv { font-family: Arial, sans-serif; color: #333; }

/* Header */
.ccv-header {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 1rem;
}
.ccv-header__title {
  display: flex; align-items: center;
}
.ccv-header__title i {
  font-size: 1.5rem; margin-right: 0.5rem; color: #007bff;
}
.ccv-header__actions {
  display: flex; gap: 0.5rem; align-items: center;
}
.ccv-search {
  position: relative;
}
.ccv-search i {
  position: absolute; top: 50%; left: 0.75rem; transform: translateY(-50%); color: #888;
}
.ccv-search input {
  padding: 0.5rem 0.5rem 0.5rem 2.5rem;
  border: 1px solid #ccc; border-radius: 4px;
}

/* Botones */
.ccv-btn {
  display: flex; align-items: center; gap: 0.25rem;
  border: none; padding: 0.5rem 0.75rem; border-radius: 4px;
  color: #fff; cursor: pointer;
  font-size: 0.9rem;
}
.ccv-btn--filter { background: #6c757d; }
.ccv-btn--add    { background: #28a745; }
.ccv-btn--primary { background: #007bff; }

/* Grid de tarjetas */
.ccv-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}
.ccv-card {
  position: relative; background: #fff;
  border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  overflow: hidden; display: flex; flex-direction: column;
}
.ccv-card__stripe {
  position: absolute; top:0; left:0; bottom:0; width:6px;
}
.ccv-stripe--gray   { background:#6c757d; }
.ccv-stripe--yellow { background:#ffc107; }
.ccv-stripe--blue   { background:#007bff; }
.ccv-stripe--green  { background:#28a745; }

.ccv-card__body {
  padding: 1rem; flex:1;
}
.ccv-card__header {
  display:flex; justify-content:space-between; align-items:center;
  margin-bottom:0.5rem;
}
.ccv-card__header h2 { font-size:1.1rem; margin:0; }
.ccv-badge {
  padding:0.2rem 0.6rem; border-radius:12px; font-size:0.75rem; color:#fff;
}
.ccv-badge--gray   { background:#6c757d; }
.ccv-badge--yellow { background:#ffc107; color:#212529; }
.ccv-badge--blue   { background:#007bff; }
.ccv-badge--green  { background:#28a745; }

.ccv-card__patient { font-weight:600; margin:0.25rem 0; }
.ccv-card__date    { font-size:0.85rem; color:#777; margin-bottom:0.5rem; }
.ccv-card__reason  { font-size:0.9rem; }

/* Botón Ver */
.ccv-card__btn {
  background:#f8f9fa; color:#007bff;
  border:none; border-top:1px solid #eee;
  padding:0.5rem; font-weight:600;
  cursor:pointer;
}
.ccv-card__btn:hover { background:#e9ecef; }

/* Empty state */
.ccv-empty {
  text-align:center; padding:2rem; color:#777;
}
.ccv-empty i { font-size:2.5rem; margin-bottom:0.5rem; }

/* Modal backdrop */
.ccv-modal-backdrop {
  position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:1000;
}

/* Modal */
.ccv-modal {
  position:fixed; top:10%; left:50%; transform:translateX(-50%);
  width:90%; max-width:600px; background:#fff; border-radius:8px;
  overflow:hidden; z-index:1001; box-shadow:0 4px 12px rgba(0,0,0,0.2);
}
.ccv-modal__header {
  display:flex; justify-content:space-between; align-items:center;
  background:#f1f1f1; padding:0.75rem 1rem;
}
.ccv-modal__header i { margin-right:0.5rem; color:#007bff; }
.ccv-modal__header h3 { margin:0; font-size:1.1rem; }
.ccv-modal__close {
  background:none; border:none; font-size:1.25rem; cursor:pointer;
}

/* Tabs */
.ccv-modal__tabs {
  display:flex; border-bottom:1px solid #ddd;
}
.ccv-modal__tabs button {
  flex:1; padding:0.75rem; background:none; border:none;
  cursor:pointer; color:#555;
}
.ccv-modal__tabs button.active {
  border-bottom:3px solid #007bff; color:#007bff;
}

/* Panel */
.ccv-modal__body { max-height:60vh; overflow-y:auto; padding:1rem; }
.ccv-panel h4 { margin-top:0; color:#007bff; }

/* Table */
.ccv-table {
  width:100%; border-collapse:collapse; margin-top:0.5rem;
}
.ccv-table th, .ccv-table td {
  border:1px solid #ddd; padding:0.5rem; text-align:left;
}
.ccv-badge-sm {
  padding:0.2rem 0.4rem; border-radius:8px; font-size:0.75rem; color:#fff;
}
.ccv-list { list-style:none; padding:0; margin:0.5rem 0; }
.ccv-list li { padding:0.35rem 0; border-bottom:1px solid #eee; }

/* Footer */
.ccv-modal__footer {
  display:flex; justify-content:flex-end; padding:0.75rem 1rem;
  background:#f1f1f1;
}

/* Animaciones */
.ccv-fade-enter-active, .ccv-fade-leave-active { transition: opacity .3s; }
.ccv-fade-enter-from, .ccv-fade-leave-to { opacity: 0; }
.ccv-slide-enter-active { animation: slide-in .35s forwards; }
@keyframes slide-in { from { transform: translate(-50%, 100%); } to { transform: translate(-50%, 0); } }
</style>
