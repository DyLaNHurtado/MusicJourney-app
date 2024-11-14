<!-- src/views/Videos.vue -->
<template>
    <div>
      <h1 class="text-3xl font-bold text-white mb-6">Mis Videos de Progreso</h1>
      <Button class="mb-6" @click="showUploadModal = true">Subir Nuevo Video</Button>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <VideoCard
          v-for="video in videos"
          :key="video.id"
          :video="video"
        />
      </div>
  
      <!-- Modal de subida de video (simplificado) -->
      <div v-if="showUploadModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <Card class="w-full max-w-md">
          <h2 class="text-2xl font-bold mb-4">Subir Video</h2>
          <Input id="videoTitle" v-model="newVideo.title" label="Título" class="mb-4" />
          <Input id="videoDescription" v-model="newVideo.description" label="Descripción" class="mb-4" />
          <div class="flex justify-end space-x-2">
            <Button variant="secondary" @click="showUploadModal = false">Cancelar</Button>
            <Button @click="uploadVideo">Subir</Button>
          </div>
        </Card>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import Button from '../components/ui/Button.vue'
  import Input from '../components/ui/Input.vue'
  import Card from '../components/ui/Card.vue'
  import VideoCard from '../components/VideoCard.vue'
  
  const videos = ref([
    { id: 1, title: 'Primer mes de práctica', description: 'Aprendiendo acordes básicos', date: '2023-05-01', duration: '2:30', thumbnail: '/placeholder.svg?height=720&width=1280' },
    { id: 2, title: 'Tres meses de progreso', description: 'Tocando mi primera canción completa', date: '2023-07-15', duration: '3:45', thumbnail: '/placeholder.svg?height=720&width=1280' },
    { id: 3, title: 'Seis meses de viaje', description: 'Práctica de improvisación', date: '2023-10-30', duration: '5:00', thumbnail: '/placeholder.svg?height=720&width=1280' },
  ])
  
  const showUploadModal = ref(false)
  const newVideo = ref({
    title: '',
    description: ''
  })
  
  const uploadVideo = () => {
    // Aquí iría la lógica para subir el video
    videos.value.unshift({
      id: Date.now(),
      ...newVideo.value,
      date: new Date().toISOString(),
      duration: '0:00',
      thumbnail: '/placeholder.svg?height=720&width=1280'
    })
    showUploadModal.value = false
    newVideo.value = { title: '', description: '' }
  }
  </script>