<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-auto text-gray-100">
        <h2 class="text-2xl font-bold mb-4">Eliminar Múltiples Videos</h2>
        <p class="mb-6">Selecciona los videos que deseas eliminar:</p>
        
        <div class="max-h-96 overflow-y-auto mb-6">
          <div v-for="video in videos" :key="video.id" class="flex items-center space-x-4 mb-4">
            <input
              type="checkbox"
              :id="'video-' + video.id"
              v-model="selectedVideos"
              :value="video.id"
              class="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
            >
            <label :for="'video-' + video.id" class="flex-grow">
              <span class="block font-medium">{{ video.title }}</span>
              <span class="block text-sm text-gray-400">{{ formatDate(video.date) }}</span>
            </label>
          </div>
        </div>
        
        <div class="flex justify-between items-center">
          <span>{{ selectedVideos.length }} videos seleccionados</span>
          <div class="space-x-4">
            <button
              @click="$emit('close')"
              class="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition duration-150 ease-in-out"
            >
              Cancelar
            </button>
            <button
              @click="confirmDelete"
              class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-150 ease-in-out"
              :disabled="selectedVideos.length === 0"
              :class="{ 'opacity-50 cursor-not-allowed': selectedVideos.length === 0 }"
            >
              Eliminar Seleccionados
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const props = defineProps({
    videos: {
      type: Array,
      required: true
    }
  })
  
  const emit = defineEmits(['close', 'delete'])
  
  const selectedVideos = ref([])
  
  const confirmDelete = () => {
    emit('delete', selectedVideos.value)
  }
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
  }
  </script>