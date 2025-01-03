<template>
    <nav class="menu">
      <RouterLink to="/" class="menu-item">Ver Libros</RouterLink>
      <RouterLink to="/add" class="menu-item">Añadir Libro</RouterLink>
      <RouterLink to="/cart" class="menu-item">Carrito</RouterLink>
      <RouterLink to="/about" class="menu-item">Acerca de</RouterLink>
    </nav>
  </template>
  
  <style scoped>
  .menu {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 1rem 0;
    border-bottom: 1px solid #eee;
  }
  
  .menu-item {
    text-decoration: none;
    color: #333;
    padding: 0.5rem 1rem;
    border-radius: 4px;
  }
  
  .menu-item:hover {
    background-color: #f8f9fa;
  }
  
  .menu-item.router-link-active {
    background-color: #007bff;
    color: white;
  }
  </style>