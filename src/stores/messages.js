import { defineStore } from 'pinia'

export const useMessagesStore = defineStore('messages', {
  state: () => ({
    messages: []
  }),
  actions: {
    addMessage(message, type = 'info') {
      const id = Date.now()

      // Añadir el mensaje a la lista
      this.messages.push({
        id,
        text: message,
        type
      })

      // Configurar eliminación automática después de 4 segundos
      setTimeout(() => {
        this.removeMessage(id)
      }, 4000)
    },
    addError(message) {
      this.addMessage(message, 'error')
    },
    removeMessage(id) {
      this.messages = this.messages.filter(msg => msg.id !== id)
    }
  }
})
