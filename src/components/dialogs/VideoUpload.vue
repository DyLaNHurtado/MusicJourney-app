<template>
    <div class="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 flex flex-col">
      <h1 class="text-2xl sm:text-3xl font-bold mb-6">Subir Nuevo Video</h1>
      
      <div class="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-auto">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="space-y-2">
            <label for="title" class="block text-sm font-medium text-gray-300">Título del video</label>
            <input 
              id="title" 
              v-model="videoData.title" 
              type="text" 
              required
              class="w-full px-3 py-2 bg-gray-700 rounded-md border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
              placeholder="Ej: Mi progreso después de 3 meses"
            >
          </div>
  
          <div class="space-y-2">
            <label for="description" class="block text-sm font-medium text-gray-300">Descripción</label>
            <textarea 
              id="description" 
              v-model="videoData.description" 
              rows="3" 
              class="w-full px-3 py-2 bg-gray-700 rounded-md border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
              placeholder="Describe tu video brevemente..."
            ></textarea>
          </div>
  
          <div class="space-y-2">
            <label for="video-file" class="block text-sm font-medium text-gray-300">Archivo de video</label>
            <div 
              class="relative border-2 border-dashed border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition duration-150 ease-in-out"
              @dragover.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              @drop.prevent="handleFileDrop"
              :class="{ 'border-indigo-500': isDragging }"
            >
              <input 
                id="video-file" 
                type="file" 
                accept="video/*" 
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                @change="handleFileSelect"
              >
              <svg class="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p class="text-gray-300 text-center">
                <span class="font-medium">Haz clic para subir</span> o arrastra y suelta tu video aquí
              </p>
              <p v-if="videoData.file" class="mt-2 text-sm text-indigo-400">
                {{ videoData.file.name }}
              </p>
            </div>
          </div>
  
          <div class="space-y-2">
            <label for="category" class="block text-sm font-medium text-gray-300">Categoría</label>
            <select 
              id="category" 
              v-model="videoData.category"
              class="w-full px-3 py-2 bg-gray-700 rounded-md border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            >
              <option value="practice">Práctica</option>
              <option value="performance">Actuación</option>
              <option value="lesson">Lección</option>
              <option value="other">Otro</option>
            </select>
          </div>
  
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-300">Etiquetas</label>
            <div class="flex flex-wrap gap-2">
              <button 
                v-for="tag in availableTags" 
                :key="tag"
                @click="toggleTag(tag)"
                type="button"
                class="px-3 py-1 rounded-full text-sm transition duration-150 ease-in-out"
                :class="videoData.tags.includes(tag) ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'"
              >
                {{ tag }}
              </button>
            </div>
          </div>
  
          <div class="flex items-center justify-between pt-4">
            <button 
              type="button" 
              @click="resetForm" 
              class="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition duration-150 ease-in-out"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              class="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-150 ease-in-out flex items-center"
              :disabled="!isFormValid"
              :class="{ 'opacity-50 cursor-not-allowed': !isFormValid }"
            >
              <svg v-if="isUploading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isUploading ? 'Subiendo...' : 'Subir Video' }}
            </button>
          </div>
        </form>
      </div>
  
      <div v-if="uploadProgress > 0 && uploadProgress < 100" class="fixed bottom-0 left-0 right-0 p-4 bg-gray-800">
        <div class="max-w-2xl mx-auto">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-300">Subiendo video...</span>
            <span class="text-sm font-medium text-gray-300">{{ uploadProgress }}%</span>
          </div>
          <div class="w-full bg-gray-700 rounded-full h-2.5">
            <div class="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-out" :style="{ width: `${uploadProgress}%` }"></div>
          </div>
        </div>
      </div>
  
      <transition name="fade">
        <div v-if="showSuccessMessage" class="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
          ¡Video subido con éxito!
        </div>
      </transition>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const videoData = ref({
    title: '',
    description: '',
    file: null,
    category: 'practice',
    tags: []
  })
  
  const availableTags = ['Guitarra', 'Piano', 'Canto', 'Batería', 'Bajo', 'Composición']
  
  const isDragging = ref(false)
  const isUploading = ref(false)
  const uploadProgress = ref(0)
  const showSuccessMessage = ref(false)
  
  const isFormValid = computed(() => {
    return videoData.value.title && videoData.value.file
  })
  
  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('video/')) {
      videoData.value.file = file
    } else {
      alert('Por favor, selecciona un archivo de video válido.')
    }
  }
  
  const handleFileDrop = (event) => {
    isDragging.value = false
    const file = event.dataTransfer.files[0]
    if (file && file.type.startsWith('video/')) {
      videoData.value.file = file
    } else {
      alert('Por favor, arrastra un archivo de video válido.')
    }
  }
  
  const toggleTag = (tag) => {
    const index = videoData.value.tags.indexOf(tag)
    if (index === -1) {
      videoData.value.tags.push(tag)
    } else {
      videoData.value.tags.splice(index, 1)
    }
  }
  
  const resetForm = () => {
    videoData.value = {
      title: '',
      description: '',
      file: null,
      category: 'practice',
      tags: []
    }
  }
  
  const handleSubmit = async () => {
    if (!isFormValid.value) return
  
    isUploading.value = true
    uploadProgress.value = 0
  
    // Simular una carga de archivo
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200))
      uploadProgress.value = i
    }
  
    // Aquí iría la lógica real de subida del archivo
    console.log('Subiendo video:', videoData.value)
  
    isUploading.value = false
    showSuccessMessage.value = true
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 3000)
  
    resetForm()
  }
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  </style>