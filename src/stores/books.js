import { defineStore } from 'pinia'
import axios from 'axios'
import { useMessagesStore } from './messages'

export const useBooksStore = defineStore('books', {
  state: () => ({
    books: [],
    modules: [],
    loading: false
  }),
  getters: {
    totalBooks: (state) => state.books.length
  },
  actions: {
    async fetchBooks() {
      const messagesStore = useMessagesStore()
      this.loading = true
      try {
        const response = await axios.get('http://localhost:3000/books')
        this.books = response.data
      } catch (error) {
        messagesStore.addMessage('Error al cargar los libros: ' + error.message, 'error')
      } finally {
        this.loading = false
      }
    },
    async fetchBook(id) {
      const messagesStore = useMessagesStore()
      try {
        const response = await axios.get(`http://localhost:3000/books/${id}`)
        return response.data
      } catch (error) {
        messagesStore.addMessage('Error al cargar el libro: ' + error.message, 'error')
        return null
      }
    },
    async fetchModules() {
      const messagesStore = useMessagesStore()
      try {
        const response = await axios.get('http://localhost:3000/modules')
        this.modules = response.data
      } catch (error) {
        messagesStore.addMessage('Error al cargar los módulos: ' + error.message, 'error')
      }
    },
    async addBook(book) {
      const messagesStore = useMessagesStore()
      try {
        let newId = 1
        if (this.books.length > 0) {
          const lastId = Math.max(...this.books.map(b => parseInt(b.id)))
          newId = lastId + 1
        }
        const newBook = { id: String(newId), ...book }
        const response = await axios.post('http://localhost:3000/books', newBook)
        this.books.push(response.data)
        messagesStore.addMessage('Libro añadido correctamente', 'success')
        return true
      } catch (error) {
        messagesStore.addMessage('Error al añadir el libro: ' + error.message, 'error')
        return false
      }
    },
    async updateBook(id, book) {
      const messagesStore = useMessagesStore()
      try {
        const response = await axios.put(`http://localhost:3000/books/${id}`, book)
        const index = this.books.findIndex(b => b.id === id)
        if (index !== -1) {
          this.books[index] = response.data
        }
        messagesStore.addMessage('Libro actualizado correctamente', 'success')
        return true
      } catch (error) {
        messagesStore.addMessage('Error al actualizar el libro: ' + error.message, 'error')
        return false
      }
    },
    async deleteBook(id) {
      const messagesStore = useMessagesStore()
      try {
        await axios.delete(`http://localhost:3000/books/${id}`)
        this.books = this.books.filter(book => book.id !== id)
        messagesStore.addMessage('Libro eliminado correctamente', 'success')
      } catch (error) {
        messagesStore.addMessage('Error al eliminar el libro: ' + error.message, 'error')
      }
    }
  }
})

