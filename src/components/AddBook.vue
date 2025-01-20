<template>
  <div class="add-book">
    <h2>Añadir Libro</h2>
    
    <BookForm
      v-if="!loading"
      :initial-values="bookData"
      :modules="modules"
      submit-button-text="Añadir Libro"
      reset-button-text="Limpiar"
      @submit="handleSubmit"
      @reset="handleReset"
    />
    <div v-else>Cargando...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBooksStore } from '../stores/books'
import { storeToRefs } from 'pinia'
import BookForm from './BookForm.vue'

const router = useRouter()
const booksStore = useBooksStore()
const { modules, books } = storeToRefs(booksStore)

const bookData = ref({
  moduleCode: '',
  publisher: '',
  price: '',
  pages: '',
  status: '',
  comments: ''
})

const loading = ref(false)

const handleSubmit = async (values) => {
  const existingBook = books.value.find(
    book => book.moduleCode === values.moduleCode && book.publisher === values.publisher
  )

  if (existingBook) {
    alert('Ya has añadido este libro anteriormente.')
    return
  }

  const success = await booksStore.addBook(values)
  if (success) {
    router.push('/')
  }
}

const handleReset = () => {
  bookData.value = {
    moduleCode: '',
    publisher: '',
    price: '',
    pages: '',
    status: '',
    comments: ''
  }
}

onMounted(async () => {
  await booksStore.fetchModules()
})
</script>