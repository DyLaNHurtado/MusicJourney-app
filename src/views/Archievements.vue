<!-- src/views/Achievements.vue -->
<template>
  <div>
    <h1 class="text-3xl font-bold text-white mb-6">Mis Logros</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AchievementCard
        v-for="achievement in achievements"
        :key="achievement.id"
        :achievement="achievement"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AchievementCard from '../components/AchievementCard.vue'

const achievements = ref([
  { id: 1, title: 'Primeros Pasos', description: 'Añadiste tu primera canción', icon: '🎸' },
  { id: 2, title: 'Estrella del Video', description: 'Subiste 3 videos de progreso', icon: '🎥' },
  { id: 3, title: 'Aprendiz Dedicado', description: 'Practicaste durante 30 días seguidos', icon: '🏆' },
  { id: 4, title: 'Virtuoso', description: 'Aprendiste 10 canciones', icon: '🎵' },
  { id: 5, title: 'Maratonista Musical', description: 'Acumulaste 100 horas de práctica', icon: '⏱️' },
  { id: 6, title: 'Estrella en Ascenso', description: 'Compartiste tu primer video de progreso', icon: '🌟' },
])
</script>