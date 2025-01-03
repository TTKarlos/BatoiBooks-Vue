import { createRouter, createWebHistory } from 'vue-router'
import BooksList from '../components/BooksList.vue'
import AddBook from '../components/AddBook.vue'
import AppCart from '../components/AppCart.vue'
import AppAbout from '../components/AppAbout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'books',
      component: BooksList
    },
    {
      path: '/add',
      name: 'add',
      component: AddBook
    },
    {
      path: '/cart',
      name: 'cart',
      component: AppCart
    },
    {
      path: '/about',
      name: 'about',
      component: AppAbout
    }
  ]
})

export default router