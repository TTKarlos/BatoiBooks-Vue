import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  actions: {
    addToCart(book) {
      if (!this.items.find(item => item.id === book.id)) {
        this.items.push(book)
        this.saveToLocalStorage()
      }
    },
    removeFromCart(bookId) {
      this.items = this.items.filter(item => item.id !== bookId)
      this.saveToLocalStorage()
    },
    clearCart() {
      this.items = []
      this.saveToLocalStorage()
    },
    saveToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.items))
    },
    loadFromLocalStorage() {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        this.items = JSON.parse(savedCart)
      }
    }
  }
})