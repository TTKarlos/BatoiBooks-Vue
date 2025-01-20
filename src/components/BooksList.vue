<template>
  <div class="books-list">
    <h2>Listado de Libros</h2>
    
    <div v-if="loading" class="loading">
      Cargando libros...
    </div>
    
    <div v-else class="book-grid">
      <BookItem
        v-for="book in books"
        :key="book.id"
        :book="book"
        :module-description="getModuleDescription(book.moduleCode)"
        @delete="handleDelete"
      >
        <template #buttons>
          <button 
            class="btn-primary"
            @click="addToCart(book)"
            :disabled="isInCart(book.id)"
            title="Añadir al carrito"
          >
            <ShoppingCartIcon class="icon" />
          </button>
          <RouterLink :to="{ name: 'edit-book', params: { id: book.id } }">
            <button
              class="btn-secondary"
              title="Editar libro"
            >
              <EditIcon class="icon" />
            </button>
          </RouterLink>
          <button 
            class="btn-danger"
            @click="handleDelete(book.id, book.moduleCode)"
            title="Eliminar libro"
          >
            <Trash2Icon class="icon" />
          </button>
        </template>
      </BookItem>
    </div>

    <div class="total mt-2">
      Total libros: {{ totalBooks }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { Trash2Icon, ShoppingCartIcon, EditIcon } from 'lucide-vue-next'
import { useBooksStore } from '../stores/books'
import { useCartStore } from '../stores/cart'
import { useMessagesStore } from '../stores/messages'
import BookItem from './BookItem.vue'

const booksStore = useBooksStore()
const cartStore = useCartStore()
const messagesStore = useMessagesStore()

const { books, loading, totalBooks } = storeToRefs(booksStore)
const { getModuleDescription } = booksStore

const handleDelete = async (id, moduleCode) => {
  if (confirm(`¿Estás seguro de borrar el libro con ID ${id} y código ${moduleCode}?`)) {
    await booksStore.deleteBook(id)
  }
}

const addToCart = (book) => {
  cartStore.addToCart(book)
  messagesStore.addMessage('Libro añadido al carrito', 'success')
}

const isInCart = computed(() => (id) => cartStore.items.some(item => item.id === id))

onMounted(() => {
  booksStore.fetchBooks()
})
</script>