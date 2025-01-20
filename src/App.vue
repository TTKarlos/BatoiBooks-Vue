<template>
  <div class="container">
    <header>
      <img src="./assets/Batoi.jpeg" alt="BatoiBooks Logo" class="logo">
      <h1>BatoiBooks</h1>
    </header>
    
    <AppMenu />
    <AppMessages />
    <RouterView />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useCartStore } from './stores/cart'
import AppMenu from './components/AppMenu.vue'
import AppMessages from './components/AppMessages.vue'

const cartStore = useCartStore()

onMounted(() => {
  cartStore.loadFromLocalStorage()
})
</script>

