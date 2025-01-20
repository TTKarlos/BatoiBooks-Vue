<template>
  <div class="edit-book">
    <h2>Editar Libro</h2>
    
    <BookForm
      v-if="!loading"
      :initial-values="bookData"
      :modules="modules"
      submit-button-text="Guardar Cambios"
      reset-button-text="Recargar"
      @submit="handleSubmit"
      @reset="handleReset"
    />
    <div v-else>Cargando...</div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useBooksStore } from '../stores/books'
import { storeToRefs } from 'pinia'
import BookForm from './BookForm.vue'

const router = useRouter()
const route = useRoute()
const booksStore = useBooksStore()
const { modules } = storeToRefs(booksStore)

const bookId = computed(() => route.params.id)

const bookData = ref({
  moduleCode: '',
  publisher: '',
  price: '',
  pages: '',
  status: '',
  comments: ''
})

const loading = ref(true)

const loadBook = async () => {
  loading.value = true
  try {
    const book = await booksStore.fetchBook(bookId.value)
    if (book) {
      bookData.value = { ...book }
    } else {
      console.error('Book not found')
      router.push('/')
    }
  } catch (error) {
    console.error('Error loading book:', error)
  } finally {
    loading.value = false
  }
}

const handleSubmit = async (values) => {
  const success = await booksStore.updateBook(bookId.value, values)
  if (success) {
    router.push('/')
  }
}

const handleReset = () => {
  loadBook()
}

onMounted(async () => {
  await booksStore.fetchModules()
  await loadBook()
})
</script>
