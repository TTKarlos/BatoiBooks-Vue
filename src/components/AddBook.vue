<template>
    <div class="add-book">
      <h2>Añadir Libro</h2>
      
      <form @submit.prevent="handleSubmit" class="book-form">
        <div class="form-group">
          <label for="moduleCode">Código de Módulo:</label>
          <select 
            id="moduleCode" 
            v-model="bookData.moduleCode" 
            required
          >
            <option value="">Selecciona un módulo</option>
            <option v-for="module in modules" :key="module.code" :value="module.code">
              {{ module.code }} - {{ module.cliteral }}
            </option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="publisher">Editorial:</label>
          <input 
            type="text" 
            id="publisher" 
            v-model="bookData.publisher" 
            required
          >
        </div>
  
        <div class="form-group">
          <label for="price">Precio:</label>
          <input 
            type="number" 
            id="price" 
            v-model="bookData.price" 
            step="0.01" 
            min="0" 
            required
          >
        </div>
  
        <div class="form-group">
          <label for="pages">Páginas:</label>
          <input 
            type="number" 
            id="pages" 
            v-model="bookData.pages" 
            min="1" 
            required
          >
        </div>
  
        <div class="form-group">
          <label>Estado:</label>
          <div class="radio-group">
            <label class="radio-label">
              <input 
                type="radio" 
                v-model="bookData.status" 
                value="new"
                required
              > Nuevo
            </label>
            <label class="radio-label">
              <input 
                type="radio" 
                v-model="bookData.status" 
                value="good"
              > Bueno
            </label>
            <label class="radio-label">
              <input 
                type="radio" 
                v-model="bookData.status" 
                value="bad"
              > Malo
            </label>
          </div>
        </div>
  
        <div class="form-group">
          <label for="comments">Comentarios:</label>
          <textarea 
            id="comments" 
            v-model="bookData.comments"
            rows="4"
          ></textarea>
        </div>
  
        <div class="form-actions">
          <button type="submit">Añadir Libro</button>
          <button type="reset" class="btn-secondary" @click="resetForm">
            Limpiar
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { reactive, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useBooksStore } from '../stores/books'
  import { storeToRefs } from 'pinia'
  
  const router = useRouter()
  const booksStore = useBooksStore()
  const { modules } = storeToRefs(booksStore)
  
  const initialBookData = {
    moduleCode: '',
    publisher: '',
    price: '',
    pages: '',
    status: '',
    comments: ''
  }
  
  const bookData = reactive({ ...initialBookData })
  
  const resetForm = () => {
    Object.assign(bookData, initialBookData)
  }
  
  const handleSubmit = async () => {
    const success = await booksStore.addBook({
      ...bookData,
      price: Number(bookData.price),
      pages: Number(bookData.pages)
    })
    
    if (success) {
      resetForm()
      router.push('/')
    }
  }
  
  onMounted(() => {
    booksStore.fetchModules()
  })
  </script>
  
  <style scoped>
  .add-book {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #f8f9fa;
    border-radius: 8px;
  }
  
  .book-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .radio-group {
    display: flex;
    gap: 2rem;
  }
  
  .radio-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .radio-label input {
    width: auto;
  }
  
  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .btn-secondary {
    background-color: #6c757d;
  }
  
  .btn-secondary:hover {
    background-color: #5a6268;
  }
  </style>
  