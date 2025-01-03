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
              <button
                class="btn-secondary"
                title="Editar libro"
              >
                <EditIcon class="icon" />
              </button>
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

    <div class="total">
      Total libros: {{ totalBooks }}
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
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

.actions {
  display: flex;
  gap: 0.5rem;
}

.icon {
  width: 16px;
  height: 16px;
}

.total {
  margin-top: 1rem;
  text-align: right;
  font-weight: bold;
}

.btn-primary {
  background-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.btn-danger {
  background-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
}

button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
</style>

