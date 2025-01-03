<template>
    <div class="cart">
      <h2>Carrito de Compra</h2>
      
      <div v-if="items.length === 0" class="empty-cart">
        El carrito está vacío
      </div>
      
      <div v-else>
        <ul class="cart-items">
          <li v-for="item in items" :key="item.id" class="cart-item">
            <span>{{ item.module }} - {{ item.editorial }}</span>
            <button 
              class="btn-danger"
              @click="removeFromCart(item.id)"
            >
              <XIcon class="icon" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { storeToRefs } from 'pinia'
  import { XIcon } from 'lucide-vue-next'
  import { useCartStore } from '../stores/cart'
  
  const cartStore = useCartStore()
  const { items } = storeToRefs(cartStore)
  const { removeFromCart } = cartStore
  </script>
  
  <style scoped>
  .cart {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .empty-cart {
    text-align: center;
    padding: 2rem;
    color: #666;
    font-style: italic;
  }
  
  .cart-items {
    list-style: none;
    padding: 0;
  }
  
  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #eee;
  }
  
  .icon {
    width: 16px;
    height: 16px;
  }
  </style>