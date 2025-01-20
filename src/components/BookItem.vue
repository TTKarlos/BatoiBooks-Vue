<template>
  <div class="book-item">
    <h3>{{ moduleDescription }}</h3>
    <p><strong>Editorial:</strong> {{ book.publisher }}</p>
    <p><strong>Precio:</strong> {{ book.price }}€</p>
    <p><strong>Páginas:</strong> {{ book.pages }}</p>
    <p><strong>Estado:</strong> {{ book.status }}</p>
    <p><strong>Comentarios:</strong> {{ book.comments }}</p>
    <div class="book-actions">
      <slot name="buttons"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  book: {
    type: Object,
    required: true
  },
  moduleDescription: {
    type: String,
    required: true
  }
})
</script>