<template>
  <div 
    class="bg-gray-800 rounded-lg transition-all duration-300  shadow-md"
    :class="{ 'ring-2 ring-green-600': isExpanded }"
  >
    <div @click="toggleExpand" class="flex items-center justify-between p-4 shadow-md cursor-pointer">
      <div class="flex items-center space-x-4">
        <div class="relative w-16 h-16 rounded-md overflow-hidden bg-gray-700 flex items-center justify-center">
          <img 
            v-if="song.image" 
            :src="song.image" 
            :alt="song.title" 
            class="w-full h-full object-cover"
          />
          <svg v-else class="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18V5L21 3V16M9 18C9 19.1046 7.65685 20 6 20C4.34315 20 3 19.1046 3 18C3 16.8954 4.34315 16 6 16C7.65685 16 9 16.8954 9 18ZM21 16C21 17.1046 19.6569 18 18 18C16.3431 18 15 17.1046 15 16C15 14.8954 16.3431 14 18 14C19.6569 14 21 14.8954 21 16ZM9 18C9 16.8954 7.65685 16 6 16C4.34315 16 3 16.8954 3 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="flex-grow">
            <!-- TODO: Hacer que si se hace focus en uno aunque hagas mouseleave no se transforme en span porque queda raro -->
            <h3 class="text-lg font-semibold text-white text-start" @click.stop="startEditing('title')" @mouseenter="startEditing('title')" @mouseleave="isEditing.title = false">
            <transition name="fade" mode="out-in">
            <span v-if="!isEditing.title">{{ editedSong.title }}</span>
            <input
              v-else
              v-model="editedSong.title"
              @blur="saveEdit('title')"
              @keyup.enter="saveEdit('title')"
              class="bg-gray-700 text-white px-2 py-1 rounded w-full"
              ref="titleInput"
            >
            </transition>
          </h3>
           

          <p class="text-sm text-gray-400 text-start"  @click.stop="startEditing('artist')" @mouseenter="startEditing('artist')"  @mouseleave="isEditing.artist = false">
            <transition name="fade" mode="out-in">
            <span v-if="!isEditing.artist">{{ editedSong.artist }}</span>
            <input
              v-else
              v-model="editedSong.artist"
              @blur="saveEdit('artist')"
              @keyup.enter="saveEdit('artist')"
              class="bg-gray-700 text-white px-2 py-1 rounded w-full text-sm"
              ref="artistInput"
            >
        </transition>
          </p>
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <p  class="text-gray-300">{{ formatTime(editedSong.practiceTime) }}</p>
        <div class="flex items-center space-x-2">
            <!-- Icono aprendida -->
            <svg v-if="editedSong.status==='learned'" width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#34D399"><path d="M7 12.5L10 15.5L17 8.5" stroke="#34D399" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#34D399" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            <!-- Icono en proceso -->
            <svg v-else-if="editedSong.status==='learning'" width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#FBBF24"><path d="M12 6L12 12L18 12" stroke="#FBBF24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FBBF24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            <!-- Icono olvidados -->
            <svg v-else width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#EF4444"><path d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11.5 15.5C11.5 15.5 13 13.5 16 13.5C19 13.5 20.5 15.5 20.5 15.5" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 4C3 1.24586 7 1.2458 7 3.99993C7 5.96716 5 5.63927 5 7.99994" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 11.01L5.01 10.9989" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17.5 9C17.2239 9 17 8.77614 17 8.5C17 8.22386 17.2239 8 17.5 8C17.7761 8 18 8.22386 18 8.5C18 8.77614 17.7761 9 17.5 9Z" fill="black" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10.5 9C10.2239 9 10 8.77614 10 8.5C10 8.22386 10.2239 8 10.5 8C10.7761 8 11 8.22386 11 8.5C11 8.77614 10.7761 9 10.5 9Z" fill="black" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>

          <svg 
            class="w-5 h-5 text-gray-400 transition-transform duration-300"
            :class="{ 'rotate-180': isExpanded }"
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 9L12 16L5 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>

    <div v-if="isExpanded" class="mt-6 space-y-6 p-4">
      <div  class="flex items-center gap-2 justify-between ">
          <span class="text-gray-100 font-semibold">Tiempo de Práctica:</span>
          <p class="text-gray-300">{{ formatTime(editedSong.practiceTime) }}</p>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-gray-100 font-semibold">Estado:</span>

        <div v-if="editedSong.status === 'forgotten'" class="flex flex-row flex-wrap items-center justify-center gap-2" >
         <!--  TODO: AÑADIR CUANTO TIEMPO NO LA PRACTICAS EN VEZ DE MUCHO -->
          <span class="text-gray-300">¡No la practicas desde hace mucho! Recuerdala.</span>
          <span class="py-2 px-4 bg-red-600 text-gray-100 rounded-lg cursor-auto">Olvidada</span>
        </div>
        
        <div v-else class="flex items-center space-x-2">
            <select
              v-model="editedSong.status"
              @blur="saveEdit('status')"
              class=" py-2 px-4 bg-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 placeholder-red-300 focus:ring-green-600 cursor-pointer"
              :class="{ 'bg-yellow-600': editedSong.status === 'learning', 'bg-green-600': editedSong.status === 'learned' }"
            >
              <option class= "bg-gray-700 text-yellow-600 rounded-lg hover:text-yellow-600" value="learning">En progreso</option>
              <option class="py-2 px-4 bg-gray-700 text-green-600 rounded-lg hover:text-green-600" value="learned">Aprendida</option>
            </select>
        </div>
      </div>

      <div class="space-y-2">
        <h4 class="text-white font-semibold">Notas</h4>
        <textarea
          v-model="editedSong.notes"
          @blur="saveEdit('notes')"
          class="w-full h-24 bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
          placeholder="Añade notas sobre la canción..."
        ></textarea>
      </div>

      <div class="space-y-2">
        <h4 class="text-white font-semibold">Enlaces útiles</h4>
        <div v-for="(link, index) in editedSong.links" :key="index" class="flex items-center space-x-2 mb-2">
          <input 
            v-model="editedSong.links[index]" 
            @blur="saveEdit('links')"
            class="flex-grow bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="https://ejemplo.com"
          >
          <button @click="removeLink(index)" class="text-gray-400 hover:text-gray-400 p-2">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <button @click="addLink" class="text-green-600 hover:text-green-600 flex items-center">
          <svg class="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Añadir enlace
        </button>
      </div>

      <div class="space-y-2" v-if="youtubeVideos.length">
        <h4 class="text-white font-semibold">Videos sugeridos</h4>
        <div  class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a 
            v-for="video in youtubeVideos" 
            :key="video.id" 
            :href="video.url" 
            target="_blank" 
            rel="noopener noreferrer"
            class="bg-gray-700 rounded-lg overflow-hidden transition-colors duration-300 hover:bg-gray-600"
          >
            <img :src="video.thumbnail" :alt="video.title" class="w-full h-32 object-cover">
            <div class="p-2">
              <h5 class="text-white text-sm font-medium truncate">{{ video.title }}</h5>
              <p class="text-gray-400 text-xs">{{ video.channelTitle }}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
const props = defineProps({
  song: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:song'])

const isExpanded = ref(false)
const isEditing = ref({ title: false, artist: false })
const editedSong = ref({ ...props.song, status: props.song.status || 'learning', links: props.song.links || [], notes: props.song.notes || '' })
const youtubeVideos = ref([])


const toggleExpand = () => {
  console.log(editedSong.value)
  isExpanded.value = !isExpanded.value
  if (isExpanded.value && youtubeVideos.value.length === 0) {
    fetchYoutubeVideos()
  }
}

const startEditing = (field) => {
  isEditing.value[field] = true
  setTimeout(() => {
    if (field === 'title') {
      document.querySelector('input[name="title"]')?.focus()
    } else if (field === 'artist') {
      document.querySelector('input[name="artist"]')?.focus()
    }
  }, 0)
}

const saveEdit = (field) => {
  isEditing.value[field] = false
  emit('update:song', { ...editedSong.value })
}

const addLink = () => {
  editedSong.value.links.push('')
  saveEdit('links')
}

const removeLink = (index) => {
  editedSong.value.links.splice(index, 1)
  saveEdit('links')
}


const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}m`
}

const fetchYoutubeVideos = async () => {
  try {
    const response = await fetch(`/api/youtube-search?q=${encodeURIComponent(editedSong.value.title + ' ' + editedSong.value.artist + ' guitar tutorial')}`)
    const data = await response.json()
    youtubeVideos.value = data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      channelTitle: item.snippet.channelTitle,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`
    }))
  } catch (error) {
    console.error('Error fetching YouTube videos:', error)
    youtubeVideos.value = []
  }
}

onMounted(() => {
  if (isExpanded.value) {
    fetchYoutubeVideos()
  }
})

watch(isExpanded, (newValue) => {
  if (newValue && youtubeVideos.value.length === 0) {
    fetchYoutubeVideos()
  }
})

watch(
  () => props.song,
  (newSong) => {
    console.log('Props.song ha cambiado:', newSong); // Asegúrate de que esto se dispare
    editedSong.value = { 
      ...newSong, 
      status: newSong.status || 'learning', 
      links: newSong.links || [], 
      notes: newSong.notes || '' 
    };
  },
  { immediate: true } // Para que se ejecute en el primer render
);
</script>

<style scoped>
/* Add any additional styles here */
</style>