<!-- src/components/SongItem.vue -->
<template>
    <div class="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
      <div>
        <h3 class="text-lg font-semibold text-white">{{ song.title }}</h3>
        <p class="text-sm text-gray-400">{{ song.artist }}</p>
      </div>
      <div class="flex items-center space-x-2">
        <Button variant="secondary" size="sm" @click="$emit('edit', song)">
          Editar
        </Button>
        <Button variant="danger" size="sm" @click="$emit('delete', song.id)">
          Eliminar
        </Button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  import Button from './ui/Button.vue'
  
  defineProps({
    song: {
      type: Object,
      required: true
    }
  })
  
  defineEmits(['edit', 'delete'])
  </script>