<template>
  <div class="books-list">
    <h2>Listado de Libros</h2>
    
    <div v-if="loading" class="loading">
      Cargando libros...
    </div>
    
    <table v-else>
      <thead>
        <tr>
          <th>ID</th>
          <th>Código Módulo</th>
          <th>Editorial</th>
          <th>Precio</th>
          <th>Páginas</th>
          <th>Estado</th>
          <th>Comentarios</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id">
          <td>{{ book.id }}</td>
          <td>{{ book.moduleCode }}</td>
          <td>{{ book.publisher }}</td>
          <td>{{ book.price }}€</td>
          <td>{{ book.pages }}</td>
          <td>{{ book.status }}</td>
          <td>{{ book.comments }}</td>
          <td>
            <div class="actions">
              <button 
                class="btn-primary"
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
                @click="handleDelete(book)"
                title="Eliminar libro"
              >
                <Trash2Icon class="icon" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="total mt-2">
      Total libros: {{ totalBooks }}
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { Trash2Icon, ShoppingCartIcon, EditIcon } from 'lucide-vue-next'
import { useBooksStore } from '../stores/books'
import { useMessagesStore } from '../stores/messages'

const booksStore = useBooksStore()
const messagesStore = useMessagesStore()

const { books, loading, totalBooks } = storeToRefs(booksStore)

const handleDelete = async (book) => {
  if (confirm(`¿Estás seguro de borrar el libro con ID ${book.id} y código ${book.moduleCode}?`)) {
    await booksStore.deleteBook(book.id)
  }
}

onMounted(() => {
  booksStore.fetchBooks()
})
</script>

<style scoped>
.books-list {
  margin: 2rem 0;
}

.loading {
  text-align: center;
  padding: 2rem;
  font-style: italic;
  color: #666;
}

.total {
  text-align: right;
  font-weight: bold;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.icon {
  width: 16px;
  height: 16px;
}
</style>

