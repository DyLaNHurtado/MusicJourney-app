<!-- src/components/VideoCard.vue -->
<template>
    <div class="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div class="relative aspect-w-16 aspect-h-9">
        <video 
          :src="video.videoUrl" 
          class="object-cover w-full h-full"
          @click="togglePlay"
          ref="videoRef"
        ></video>
        <div 
          v-if="!isPlaying" 
          class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer transition-opacity duration-300 hover:bg-opacity-40"
          @click="togglePlay"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <div class="p-4">
        <h3 class="text-lg font-semibold text-white mb-2 truncate">{{ video.title }}</h3>
        <p class="text-sm text-gray-400 mb-4 line-clamp-2">{{ video.description }}</p>
        <div class="flex justify-between text-xs text-gray-500">
          <span>{{ formatDate(video.date) }}</span>
          <span>{{ video.duration }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const props = defineProps({
    video: {
      type: Object,
      required: true
    }
  })
  
  const videoRef = ref(null)
  const isPlaying = ref(false)
  
  const togglePlay = () => {
    if (videoRef.value.paused) {
      videoRef.value.play()
      isPlaying.value = true
    } else {
      videoRef.value.pause()
      isPlaying.value = false
    }
  }
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
  }
  </script>
  
  <style scoped>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>