import { createRouter, createWebHistory } from 'vue-router'
import BooksList from '../components/BooksList.vue'
import AddBook from '../components/AddBook.vue'
import EditBook from '../components/EditBook.vue'
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
      name: 'add-book',
      component: AddBook
    },
    {
      path: '/edit/:id',
      name: 'edit-book',
      component: EditBook
    },
    {
      path: '/about',
      name: 'about',
      component: AppAbout
    }
  ]
})

export default router