<template>
    <div class="messages">
      <TransitionGroup name="message">
        <div
          v-for="message in messages"
          :key="message.id"
          :class="['message', message.type]"
        >
          {{ message.text }}
          <button class="close-btn" @click="removeMessage(message.id)">&times;</button>
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
  
  <style scoped>
  .messages {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    width: 300px;
  }
  
  .message {
    padding: 1rem;
    margin-bottom: 0.5rem;
    border-radius: 4px;
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    position: relative;
  }
  
  .message.error {
    background-color: #f8d7da;
    border-color: #f5c6cb;
    color: #721c24;
  }
  
  .message.success {
    background-color: #d4edda;
    border-color: #c3e6cb;
    color: #155724;
  }
  
  .close-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0 5px;
  }
  
  .message-enter-active,
  .message-leave-active {
    transition: all 0.3s ease;
  }
  
  .message-enter-from,
  .message-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  </style>