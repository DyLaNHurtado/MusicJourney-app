<template>
  <div class="bg-gray-900 min-h-screen p-4 sm:p-6 rounded-2xl">
    
    <div class="flex flex-wrap justify-between items-center mb-8 gap-4">
      <div class="flex items-center gap-4 flex-wrap justify-center">
        <div class="relative">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Buscar videos..." 
            class="pl-10 pr-4 py-3 w-64 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          >
          <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <select 
          v-model="sortBy" 
          class="px-6 py-3 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
        >
          <option value="date">Ordenar por fecha</option>
          <option value="title">Ordenar por título</option>
          <option value="duration">Ordenar por duración</option>
        </select>
      </div>

      <div class="flex space-x-4">
        <button 
          @click="showUploadModal = true" 
          class="px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors duration-300 flex items-center gap-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Subir Nuevo Video
        </button>
        <button 
          @click="showBulkDeleteModal = true"
          class="px-6 py-3 bg-gray-700 text-white rounded-full font-medium hover:bg-gray-600 transition-colors duration-300 flex items-center gap-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Gestionar Videos
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <VideoCard
        v-for="video in sortedVideos"
        :key="video.id"
        :video="video"
        @delete="showDeleteModal"
        @edit="showEditModal"
      />
    </div>

    <VideoForm
      v-if="showUploadModal || editingVideo"
      :video="editingVideo"
      @close="closeVideoForm"
      @submit="handleVideoSubmit"
    />

    <DeleteVideoModal
      v-if="deletingVideo"
      :video="deletingVideo"
      @close="deletingVideo = null"
      @confirm="confirmDelete"
    />

    <BulkDeleteModal
      v-if="showBulkDeleteModal"
      :videos="videos"
      @close="showBulkDeleteModal = false"
      @delete="bulkDelete"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import VideoCard from '@/components/VideoCard.vue'
import VideoForm from '@/components/VideoForm.vue'
import DeleteVideoModal from '@/components/DeleteVideoModal.vue'
import BulkDeleteModal from '@/components/BulkDeleteModal.vue'

const videos = ref([
  { id: 1, title: 'Primer mes de práctica', description: 'Aprendiendo acordes básicos', date: '2023-05-01', duration: '2:30', category:'lesson', tags:['Guitarra','Composición'], thumbnail: '/placeholder.svg', videoUrl: 'https://cdn.pixabay.com/video/2024/11/07/240320_large.mp4' },
  { id: 2, title: 'Tres meses de progreso', description: 'Tocando mi primera canción completa', date: '2023-07-15', duration: '3:45', category:'', tags:[], thumbnail: '/placeholder.svg' },
  { id: 3, title: 'Seis meses de viaje', description: 'Práctica de improvisación', date: '2023-10-30', duration: '5:00' ,category:'lesson', tags:[], thumbnail: '/placeholder.svg' },
])

const showUploadModal = ref(false)
const showBulkDeleteModal = ref(false)
const editingVideo = ref(null)
const deletingVideo = ref(null)
const searchQuery = ref('')
const sortBy = ref('date')

const sortedVideos = computed(() => {
  let filteredVideos = videos.value.filter(video => 
    video.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    video.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )

  return filteredVideos.sort((a, b) => {
    if (sortBy.value === 'date') {
      return new Date(b.date) - new Date(a.date)
    } else if (sortBy.value === 'title') {
      return a.title.localeCompare(b.title)
    } else if (sortBy.value === 'duration') {
      return a.duration.localeCompare(b.duration)
    }
  })
})

const closeVideoForm = () => {
  showUploadModal.value = false
  editingVideo.value = null
}

const handleVideoSubmit = (videoData) => {
  if (editingVideo.value) {
    const index = videos.value.findIndex(v => v.id === videoData.id)
    if (index !== -1) {
      videos.value[index] = videoData
    }
  } else {
    videos.value.unshift(videoData)
  }
  closeVideoForm()
}

const showEditModal = (video) => {
  editingVideo.value = { ...video }
  console.log(editingVideo.value)
}

const showDeleteModal = (videoId) => {
  deletingVideo.value = videos.value.find(video => video.id === videoId)
  console.log(deletingVideo.value)
}

const confirmDelete = (videoId) => {
  videos.value = videos.value.filter(video => video.id !== videoId)
  deletingVideo.value = null
}

const bulkDelete = (videosToDelete) => {
  videos.value = videos.value.filter(video => !videosToDelete.includes(video.id))
  //TODO: Borrado en masa peticion a la api en el backend
  showBulkDeleteModal.value = false
}
</script>