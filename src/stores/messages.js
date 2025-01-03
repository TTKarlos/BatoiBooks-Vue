import { defineStore } from 'pinia'

export const useMessagesStore = defineStore('messages', {
  state: () => ({
    messages: []
  }),
  actions: {
    addMessage(message) {
      this.messages.push({
        id: Date.now(),
        text: message,
        type: 'info'
      })
    },
    addError(message) {
      this.messages.push({
        id: Date.now(),
        text: message,
        type: 'error'
      })
    },
    removeMessage(id) {
      this.messages = this.messages.filter(msg => msg.id !== id)
    }
  }
})