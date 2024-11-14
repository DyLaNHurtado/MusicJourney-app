<!-- src/views/NotFound.vue -->
<template>
    <div class="absolute top-0 bottom-0 left-0 right-0 z-50 ">
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div class="text-9xl mb-4">🎸</div>
      <h1 class="text-4xl font-bold mb-4">404: Página Desafinada</h1>
      <p class="text-xl mb-8 text-center">Ups, parece que has tocado una nota equivocada. Esta página está más perdida que un ukelele en un concierto de heavy metal.</p>
      <div class="flex flex-col items-center space-y-4">
        <Button @click="goHome" class="w-full sm:w-auto">Volver al Escenario</Button>
        <Button @click="playRandomNote" variant="secondary" class="w-full sm:w-auto">Tocar Nota Aleatoria</Button>
      </div>
      <audio ref="audioPlayer" :src="currentNote" class="hidden"></audio>
      <div class="mt-8 text-gray-400 text-center">
        <p>"La música es el silencio entre las notas." - Claude Debussy</p>
        <p class="mt-2">Pero aquí no hay ni notas ni silencio, solo un 404.</p>
      </div>
    </div>
</div>

  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import Button from '../components/ui/Button.vue'
  
  const router = useRouter()
  const audioPlayer = ref(null)
  const currentNote = ref('')
  
  const notes = [
    '/audio/guitar-note-e.mp3',
    '/audio/guitar-note-a.mp3',
    '/audio/guitar-note-d.mp3',
    '/audio/guitar-note-g.mp3',
    '/audio/guitar-note-b.mp3',
    '/audio/guitar-note-e-high.mp3'
  ]
  
  const goHome = () => {
    router.push('/')
  }
  
  const playRandomNote = () => {
    const randomNote = notes[Math.floor(Math.random() * notes.length)]
    currentNote.value = randomNote
    audioPlayer.value.play()
  }
  </script>