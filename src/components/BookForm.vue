<template>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="moduleCode">Código de Módulo:</label>
        <select v-model="formData.moduleCode" id="moduleCode" required>
          <option value="">Selecciona un módulo</option>
          <option v-for="module in modules" :key="module.code" :value="module.code">
            {{ module.code }} - {{ module.cliteral }}
          </option>
        </select>
      </div>
  
      <div class="form-group">
        <label for="publisher">Editorial:</label>
        <input v-model="formData.publisher" id="publisher" type="text" required>
      </div>
  
      <div class="form-group">
        <label for="price">Precio:</label>
        <input v-model.number="formData.price" id="price" type="number" step="0.01" required>
      </div>
  
      <div class="form-group">
        <label for="pages">Páginas:</label>
        <input v-model.number="formData.pages" id="pages" type="number" required>
      </div>
  
      <div class="form-group">
        <label>Estado:</label>
        <div class="radio-group">
          <label>
            <input v-model="formData.status" type="radio" value="new" required> Nuevo
          </label>
          <label>
            <input v-model="formData.status" type="radio" value="good" required> Bueno
          </label>
          <label>
            <input v-model="formData.status" type="radio" value="bad" required> Malo
          </label>
        </div>
      </div>
  
      <div class="form-group">
        <label for="comments">Comentarios:</label>
        <textarea v-model="formData.comments" id="comments" rows="4"></textarea>
      </div>
  
      <div class="form-actions">
        <button type="submit">{{ submitButtonText }}</button>
        <button type="button" @click="onReset">{{ resetButtonText }}</button>
      </div>
    </form>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue'
  
  const props = defineProps({
    initialValues: Object,
    modules: Array,
    submitButtonText: { type: String, default: 'Guardar' },
    resetButtonText: { type: String, default: 'Restablecer' }
  })
  
  const emit = defineEmits(['submit', 'reset'])
  
  const formData = ref({ ...props.initialValues })
  
  const onSubmit = () => {
    emit('submit', formData.value)
  }
  
  const onReset = () => {
    formData.value = { ...props.initialValues }
    emit('reset')
  }
  
  watch(() => props.initialValues, (newValues) => {
    formData.value = { ...newValues }
  }, { deep: true })
  
  onMounted(() => {
    formData.value = { ...props.initialValues }
  })

  
  </script>
  
  <style scoped>
  .form-group {
    margin-bottom: 1rem;
  }
  .radio-group {
    display: flex;
    gap: 1rem;
  }
  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
  </style>