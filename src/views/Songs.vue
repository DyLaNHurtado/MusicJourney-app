<!-- src/views/Songs.vue -->
<template>
    <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold text-white mb-6">Mi Repertorio</h1>
      
      <!-- Añadir nueva canción -->
      <div class="mb-6">
        <Input
          id="newSong"
          v-model="newSong"
          placeholder="Añade una nueva canción (ej: Wonderwall - Oasis)"
          @keyup.enter="addSong"
          class="mb-2"
        />
        <Button class="w-full" @click="addSong">Añadir Canción</Button>
      </div>
  
      <!-- Pestañas para cambiar entre canciones en progreso y aprendidas -->
      <div class="flex mb-4">
        <button 
          @click="activeTab = 'learning'"
          :class="['px-4 py-2 rounded-tl-lg rounded-tr-lg font-semibold', 
                   activeTab === 'learning' ? 'bg-gray-700 text-white' : 'bg-gray-600 text-gray-300']"
        >
          Aprendiendo ({{ learningCount }})
        </button>
        <button 
          @click="activeTab = 'learned'"
          :class="['px-4 py-2 rounded-tl-lg rounded-tr-lg font-semibold ml-2', 
                   activeTab === 'learned' ? 'bg-gray-700 text-white' : 'bg-gray-600 text-gray-300']"
        >
          Aprendidas ({{ learnedCount }})
        </button>
      </div>
  
      <!-- Lista de canciones -->
      <div class="space-y-4">
        <SongItem
          v-for="song in filteredSongs"
          :key="song.id"
          :song="song"
          @edit="editSong"
          @delete="deleteSong"
          @toggle-status="toggleSongStatus"
        />
      </div>
  
      <!-- Modal de edición -->
      <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-gray-800 p-6 rounded-lg w-full max-w-md">
          <h2 class="text-2xl font-bold text-white mb-4">Editar Canción</h2>
          <Input
            id="editTitle"
            v-model="editingSong.title"
            label="Título"
            class="mb-2"
          />
          <Input
            id="editArtist"
            v-model="editingSong.artist"
            label="Artista"
            class="mb-4"
          />
          <div class="flex justify-end space-x-2">
            <Button @click="cancelEdit" variant="secondary">Cancelar</Button>
            <Button @click="saveEdit">Guardar</Button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import Input from '../components/ui/Input.vue'
  import Button from '../components/ui/Button.vue'
  import SongItem from '../components/SongItem.vue'
  
  const newSong = ref('')
  const songs = ref([
    { id: 1, title: 'Wonderwall', artist: 'Oasis', status: 'learning' },
    { id: 2, title: 'Hotel California', artist: 'Eagles', status: 'learned' },
    { id: 3, title: 'Stairway to Heaven', artist: 'Led Zeppelin', status: 'learning' },
  ])
  
  const activeTab = ref('learning')
  const showEditModal = ref(false)
  const editingSong = ref({})
  
  const filteredSongs = computed(() => {
    return songs.value.filter(song => song.status === activeTab.value)
  })
  
  const learningCount = computed(() => songs.value.filter(song => song.status === 'learning').length)
  const learnedCount = computed(() => songs.value.filter(song => song.status === 'learned').length)
  
  const addSong = () => {
    if (newSong.value.trim()) {
      const [title, artist] = newSong.value.split('-').map(s => s.trim())
      songs.value.unshift({ id: Date.now(), title, artist, status: 'learning' })
      newSong.value = ''
    }
  }
  
  const editSong = (song) => {
    editingSong.value = { ...song }
    showEditModal.value = true
  }
  
  const saveEdit = () => {
    const index = songs.value.findIndex(s => s.id === editingSong.value.id)
    if (index !== -1) {
      songs.value[index] = { ...editingSong.value }
    }
    showEditModal.value = false
  }
  
  const cancelEdit = () => {
    showEditModal.value = false
  }
  
  const deleteSong = (id) => {
    songs.value = songs.value.filter(song => song.id !== id)
  }
  
  const toggleSongStatus = (id) => {
    const song = songs.value.find(s => s.id === id)
    if (song) {
      song.status = song.status === 'learning' ? 'learned' : 'learning'
    }
  }
  </script>