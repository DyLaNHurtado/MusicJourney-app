<template>
  <div class="bg-gray-900 min-h-screen p-6">

    <!-- Leyenda con iconos y cantidades -->
    <div class="flex justify-between mb-8 bg-gray-800 p-6 rounded-2xl shadow-lg">
      <div v-for="status in statuses" :key="status.id" class="flex items-center">
        <svg class="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path :d="status.icon" :fill="status.color" />
        </svg>
        <span class="text-white text-lg">{{ status.title }}: {{ getstatusCount(status.id) }}</span>
      </div>
    </div>

    <!-- Controles de visualización y filtros -->
    <div class="flex flex-wrap justify-between items-center mb-8 gap-4">
      <div class="flex space-x-4">
        <button 
          @click="viewMode = 'all'"
          :class="['px-6 py-3 rounded-full text-lg font-semibold transition-colors duration-300', 
                   viewMode === 'all' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600']"
        >
          Todas
        </button>
        <button 
          @click="viewMode = 'groups'"
          :class="['px-6 py-3 rounded-full text-lg font-semibold transition-colors duration-300', 
                   viewMode === 'groups' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600']"
        >
          Por grupos
        </button>
      </div>
      <div class="flex items-center gap-4 flex-wrap justify-center">
        <div class="relative">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Buscar canciones..." 
            class="pl-10 pr-4 py-3 w-64 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
          >
          <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <select 
          v-model="sortBy" 
          class="px-4 py-3 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
        >
          <option value="title">Ordenar por título</option>
          <option value="artist">Ordenar por artista</option>
          <option value="dateAdded">Ordenar por fecha de adición</option>
        </select>
      </div>
      <button
        class="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300 flex items-center space-x-2"
        @click="addSong"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Añadir Canción</span>
      </button>
    </div>

    <!-- Lista de canciones -->
    <div v-if="viewMode === 'groups'" class="space-y-8">
      <div v-for="status in statuses" :key="status.id" class="bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
        <div 
          @click="toggleGroup(status.id)"
          class="bg-gray-700 p-4 cursor-pointer flex items-center justify-between transition-colors duration-300 hover:bg-gray-600"
        >
          <div class="flex items-center">
            <svg class="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path :d="status.icon" :fill="status.color" />
            </svg>
            <span class="text-xl font-semibold text-white">{{ status.title }} ({{ getstatusCount(status.id) }})</span>
          </div>
          <svg 
            :class="['w-6 h-6 transition-transform duration-300', {'rotate-180': expandedGroups.includes(status.id)}]"
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 9L12 16L5 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div v-if="expandedGroups.includes(status.id)" class="p-4 space-y-4">
          <SongItem 
            v-for="song in getSortedSongs(status.id)" 
            :key="song.id" 
            :song="song"
            :statusColor="status.color"
            @edit="editSong"
            @delete="deleteSong"
            @update:song="updateSong"
          />
        </div>
      </div>
    </div>
    <div v-else class="space-y-4">
      <SongItem 
        v-for="song in getSortedSongs()" 
        :key="song.id" 
        :song="song"
        :statusColor="getstatusColor(song.status)"
        @edit="editSong"
        @delete="deleteSong"
        @clickSong="setSongSelected()"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SongItem from '../components/SongItem.vue'

const viewMode = ref('all')
const searchQuery = ref('')
const expandedGroups = ref(['learned','learning','forgotten'])
const sortBy = ref('title')
const songSelected = ref();

const statuses = [
  { id: 'learned', title: 'Aprendidas', color: '#34D399', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 'learning', title: 'En proceso', color: '#FBBF24', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 'forgotten', title: 'Olvidadas', color: '#EF4444', icon: 'M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
]

const songs = ref([
  { id: 1, title: 'Wonderwall', artist: 'Oasis', status: 'learned', dateAdded: '2023-01-15' },
  { id: 2, title: 'Hotel California', artist: 'Eagles', status: 'learned', dateAdded: '2023-02-20' },
  { id: 3, title: 'Stairway to Heaven', artist: 'Led Zeppelin', status: 'learning', dateAdded: '2023-03-10' },
  { id: 4, title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', status: 'learning', dateAdded: '2023-04-05' },
  { id: 5, title: 'Smoke on the Water', artist: 'Deep Purple', status: 'forgotten', dateAdded: '2023-05-01' },
])

const getstatusCount = (statusId) => {
  return getSortedSongs(statusId).length
}

const getstatusColor = (statusId) => {
  const status = statuses.find(cat => cat.id === statusId)
  return status ? status.color : ''
}

const updateSong = (editedSong) => {
    // Encuentra y reemplaza la canción en la lista con los datos editados
    const index = songs.value.findIndex(song => song.id === editedSong.id);
    if (index !== -1) {
      console.log("holaaa", editedSong)
      songs.value.splice(index, 1, editedSong); // Reemplaza la canción con la versión editada
    }
  }

const getSortedSongs = (statusId = null) => {
  let filteredSongs = statusId 
    ? songs.value.filter(song => song.status === statusId)
    : songs.value

  filteredSongs = filteredSongs.filter(song => 
    song.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.value.toLowerCase())
  )

  return filteredSongs.sort((a, b) => {
    if (sortBy.value === 'title') {
      return a.title.localeCompare(b.title)
    } else if (sortBy.value === 'artist') {
      return a.artist.localeCompare(b.artist)
    } else if (sortBy.value === 'dateAdded') {
      return new Date(b.dateAdded) - new Date(a.dateAdded)
    }
  })
}

const toggleGroup = (groupId) => {
  console.log(songSelected)
  const index = expandedGroups.value.indexOf(groupId)
  if (index === -1) {
    expandedGroups.value.push(groupId)
  } else {
    expandedGroups.value.splice(index, 1)
  }
}

const setSongSelected = (song)=>{
  songSelected.value = song;
  console.log(song)
}

const addSong = () => {
  // Agregar una nueva canción a la lista con valores por defecto
  songs.value.push({
    id: Math.max(...songs.value.map(song => song.id)) + 1,
    title: 'Escribe aqui el titulo',
    artist: 'Y aqui el artista',
    status: 'learning',
    dateAdded: new Date().toISOString().split('T')[0]
  })
}

</script>

<style scoped>
/* Add any additional styles here */
</style>