<template>
  <div class="messages">
    <TransitionGroup name="message">
      <div
        v-for="message in messages"
        :key="message.id"
        :class="['message', message.type]"
      >
        {{ message.text }}
        <button class="close-btn-gray" @click="removeMessage(message.id)">&times;</button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useMessagesStore } from '../stores/messages'

const messagesStore = useMessagesStore()
const { messages } = storeToRefs(messagesStore)
const { removeMessage } = messagesStore
</script>
