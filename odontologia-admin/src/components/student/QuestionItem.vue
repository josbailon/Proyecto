<template>
  <div class="question-item">
    <div class="question-header">
      <span class="question-number">{{ number }}.</span>
      <span class="question-text">{{ question }}</span>
    </div>
    
    <div class="response-options">
      <label class="radio-option">
        <input 
          type="radio" 
          :name="'q-'+number" 
          :checked="modelValue === false" 
          @change="$emit('update:modelValue', false)"
          :id="'q-'+number+'-no'"
        >
        <span>No</span>
      </label>
      <label class="radio-option">
        <input 
          type="radio" 
          :name="'q-'+number" 
          :checked="modelValue === true" 
          @change="$emit('update:modelValue', true)"
          :id="'q-'+number+'-si'"
        >
        <span>Sí</span>
      </label>
    </div>
    
    <div v-if="hasObservations && modelValue" class="observation-field">
      <label :for="'obs-'+number">{{ observationLabel }}</label>
      <input 
        type="text" 
        :value="observations" 
        @input="$emit('update:observations', $event.target.value)"
        :id="'obs-'+number"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionItem',
  props: {
    number: {
      type: Number,
      required: true,
      validator: value => value > 0
    },
    question: {
      type: String,
      required: true
    },
    modelValue: {
      type: Boolean,
      default: null
    },
    hasObservations: {
      type: Boolean,
      default: false
    },
    observationLabel: {
      type: String,
      default: 'Observaciones:'
    },
    observations: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue', 'update:observations']
}
</script>

<style scoped>
.question-item {
  margin-bottom: 15px;
  padding: 10px;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #eee;
}

.question-header {
  display: flex;
  margin-bottom: 8px;
  align-items: center;
}

.question-number {
  font-weight: bold;
  margin-right: 8px;
  min-width: 20px;
  text-align: right;
}

.question-text {
  flex: 1;
}

.response-options {
  display: flex;
  gap: 15px;
  margin-left: 28px;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.radio-option input {
  cursor: pointer;
}

.observation-field {
  margin-top: 10px;
  margin-left: 28px;
}

.observation-field label {
  display: block;
  margin-bottom: 5px;
  font-size: 0.9em;
  color: #555;
}

.observation-field input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

@media (max-width: 480px) {
  .response-options {
    flex-direction: column;
    gap: 8px;
  }
  
  .question-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .question-number {
    margin-bottom: 4px;
    text-align: left;
  }
}
</style>