<template>
  <div class="add-book">
    <h2>Añadir Libro</h2>
    
    <Form @submit="handleSubmit" :validation-schema="schema" v-slot="{ errors }">
      <div class="form-group">
        <label for="moduleCode">Código de Módulo:</label>
        <Field 
          name="moduleCode" 
          as="select"
          :class="{ 'is-invalid': errors.moduleCode }"
        >
          <option value="">Selecciona un módulo</option>
          <option v-for="module in modules" :key="module.code" :value="module.code">
            {{ module.code }} - {{ module.cliteral }}
          </option>
        </Field>
        <ErrorMessage name="moduleCode" class="error-message" />
      </div>

      <div class="form-group">
        <label for="publisher">Editorial:</label>
        <Field 
          name="publisher" 
          type="text"
          :class="{ 'is-invalid': errors.publisher }"
        />
        <ErrorMessage name="publisher" class="error-message" />
      </div>

      <div class="form-group">
        <label for="price">Precio:</label>
        <Field 
          name="price" 
          type="number"
          step="0.01"
          :class="{ 'is-invalid': errors.price }"
        />
        <ErrorMessage name="price" class="error-message" />
      </div>

      <div class="form-group">
        <label for="pages">Páginas:</label>
        <Field 
          name="pages" 
          type="number"
          :class="{ 'is-invalid': errors.pages }"
        />
        <ErrorMessage name="pages" class="error-message" />
      </div>

      <div class="form-group">
        <label>Estado:</label>
        <div class="radio-group">
          <label class="radio-label">
            <Field 
              name="status" 
              type="radio" 
              value="new"
            /> Nuevo
          </label>
          <label class="radio-label">
            <Field 
              name="status" 
              type="radio" 
              value="good"
            /> Bueno
          </label>
          <label class="radio-label">
            <Field 
              name="status" 
              type="radio" 
              value="bad"
            /> Malo
          </label>
        </div>
        <ErrorMessage name="status" class="error-message" />
      </div>

      <div class="form-group">
        <label for="comments">Comentarios:</label>
        <Field 
          name="comments" 
          as="textarea"
          rows="4"
        />
      </div>

      <div class="form-actions">
        <button type="submit">Añadir Libro</button>
        <button type="reset" class="btn-secondary" @click="resetForm">
          Limpiar
        </button>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { useBooksStore } from '../stores/books'
import { storeToRefs } from 'pinia'

const router = useRouter()
const booksStore = useBooksStore()
const { modules, books } = storeToRefs(booksStore)

const schema = yup.object().shape({
  moduleCode: yup.string().required('El código de módulo es obligatorio'),
  publisher: yup.string().required('La editorial es obligatoria'),
  price: yup
    .number()
    .typeError('El precio debe ser un número')
    .min(0, 'El precio debe ser mayor o igual a 0')
    .required('El precio es obligatorio'),
  pages: yup
    .number()
    .typeError('El número de páginas debe ser un número')
    .integer('El número de páginas debe ser un número entero')
    .min(0, 'El número de páginas debe ser mayor o igual a 0')
    .required('El número de páginas es obligatorio'),
  status: yup.string().required('El estado es obligatorio'),
  comments: yup.string()
})

const resetForm = () => {
  // This will reset the form to its initial state
  router.go(0)
}

const handleSubmit = async (values) => {
  // Check if the book already exists for this user
  const existingBook = books.value.find(
    book => book.moduleCode === values.moduleCode && book.publisher === values.publisher
  )

  if (existingBook) {
    alert('Ya has añadido este libro anteriormente.')
    return
  }

  const success = await booksStore.addBook({
    ...values,
    price: Number(values.price),
    pages: Number(values.pages)
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
  background-color: var(--background-color);
  border-radius: 8px;
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

.error-message {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.is-invalid {
  border-color: red;
}
</style>

