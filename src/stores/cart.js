import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  actions: {
    addToCart(book) {
      if (!this.items.find(item => item.id === book.id)) {
        this.items.push(book)
      }
    },
    removeFromCart(bookId) {
      this.items = this.items.filter(item => item.id !== bookId)
    }
  }
})