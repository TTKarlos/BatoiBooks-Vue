<template>
  <div class="cart">
    <h2>Carrito de Compra</h2>
    
    <div v-if="items.length === 0" class="empty-cart">
      El carrito está vacío
    </div>
    
    <div v-else>
      <div class="book-grid">
        <BookItem
          v-for="item in items"
          :key="item.id"
          :book="item"
          :module-description="getModuleDescription(item.moduleCode)"
        >
          <template #buttons>
            <button 
              class="btn-danger"
              @click="removeFromCart(item.id)"
              title="Eliminar del carrito"
            >
              <X class="icon" />
            </button>
          </template>
        </BookItem>
      </div>
      
      <div class="cart-summary">
        <p><strong>Total libros:</strong> {{ items.length }}</p>
        <p><strong>Importe total:</strong> {{ totalPrice.toFixed(2) }}€</p>
      </div>
      
      <div class="cart-actions">
        <button class="btn-primary" @click="checkout">Realizar compra</button>
        <button class="btn-secondary" @click="clearCart">Vaciar carrito</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import * as LucideIcons from 'lucide-vue-next'
import { useCartStore } from '../stores/cart'
import { useBooksStore } from '../stores/books'
import { useMessagesStore } from '../stores/messages'
import BookItem from './BookItem.vue'

// Importar íconos específicos de Lucide
const { X } = LucideIcons

const cartStore = useCartStore()
const booksStore = useBooksStore()
const messagesStore = useMessagesStore()

const { items } = storeToRefs(cartStore)
const { removeFromCart, clearCart } = cartStore
const { getModuleDescription } = booksStore

const totalPrice = computed(() => {
  return items.value.reduce((total, item) => total + parseFloat(item.price), 0)
})

const checkout = () => {
  messagesStore.addMessage('Compra realizada con éxito', 'success')
  clearCart()
}
</script>

<style>
.cart {
  padding: 20px;
}

.icon {
  width: 16px;
  height: 16px;
  color: #fff;
  vertical-align: middle;
}

.btn-danger {
  background-color: #dc3545;
  border: none;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.btn-danger:hover {
  background-color: #c82333;
}

.book-grid {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.cart-summary {
  margin-top: 20px;
}

.cart-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}
</style>
