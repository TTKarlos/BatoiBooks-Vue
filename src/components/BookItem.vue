<template>
    <tr>
      <td>{{ book.id }}</td>
      <td>{{ book.module }}</td>
      <td>{{ book.editorial }}</td>
      <td>{{ book.price }}€</td>
      <td>{{ book.pages }}</td>
      <td>{{ book.status }}</td>
      <td>
        <button class="delete-btn" @click="$emit('delete', book.id, book.module)">
          <TrashIcon />
        </button>
      </td>
    </tr>
  </template>
  
  <script setup>
  import { ShoppingCartIcon, TrashIcon } from 'lucide-vue-next'
  
  defineProps({
    book: {
      type: Object,
      required: true
    }
  })
  </script>