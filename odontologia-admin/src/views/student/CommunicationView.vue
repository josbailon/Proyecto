<!-- src/views/student/CommunicationView.vue -->
<template>
  <section class="communication-container">
    <div class="communication-header">
      <h2><i class="fas fa-comments me-2"></i>Mensajería</h2>
      <div class="header-actions">
        <button class="btn btn-primary" @click="refreshMessages">
          <i class="fas fa-sync-alt me-2"></i>Actualizar
        </button>
      </div>
    </div>

    <div class="communication-content">
      <div class="contacts-panel">
        <MessageList
          :messages="filteredMessages"
          :current-user="selectedContact"
          @select="handleSelectContact"
        />
      </div>
      
      <div class="chat-panel">
        <div v-if="selectedContact" class="chat-container">
          <div class="chat-header">
            <h3>Conversación con {{ selectedContact }}</h3>
          </div>
          <div class="messages-container">
            <div 
              v-for="(message, index) in filteredMessages" 
              :key="index"
              class="message"
              :class="{
                'outgoing': message.from === studentStore.currentUserName,
                'incoming': message.to === studentStore.currentUserName
              }"
            >
              <div class="message-content">
                <p>{{ message.content }}</p>
                <span class="message-time">{{ formatTime(message.timestamp) }}</span>
              </div>
            </div>
          </div>
          <MessageForm 
            :to="selectedContact"
            @send="handleSendMessage" 
          />
        </div>
        <div v-else class="select-contact-prompt">
          <i class="fas fa-comment-dots"></i>
          <h4>Selecciona un contacto</h4>
          <p>Elige un contacto de la lista para comenzar a chatear</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useStudentStore } from '@/store/student';
import MessageList from '@/components/student/MessageList.vue';
import MessageForm from '@/components/student/MessageForm.vue';

const studentStore = useStudentStore();
const { messages, currentContact } = storeToRefs(studentStore);
const selectedContact = ref<string>(currentContact.value || '');

const filteredMessages = computed(() => {
  if (!selectedContact.value) return [];
  return messages.value.filter(m => 
    (m.from === selectedContact.value && m.to === studentStore.currentUserName) ||
    (m.to === selectedContact.value && m.from === studentStore.currentUserName)
  ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
});

onMounted(() => {
  if (selectedContact.value) {
    studentStore.loadMessages(selectedContact.value);
  }
});

function handleSelectContact(user: string) {
  selectedContact.value = user;
  studentStore.loadMessages(user);
}

async function handleSendMessage(content: string) {
  if (!selectedContact.value) return;
  await studentStore.sendMessage(content);
}

function refreshMessages() {
  if (selectedContact.value) {
    studentStore.loadMessages(selectedContact.value);
  }
}

function formatTime(timestamp: string) {
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
</script>

<style scoped src="@/assets/css/pages/student/CommunicationView.css"></style>