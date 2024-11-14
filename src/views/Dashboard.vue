<!-- src/views/Dashboard.vue -->
<template>
    <div>
      <h1 class="text-3xl font-bold text-white mb-6">Stats</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Tiempo Total de Práctica" :value="stats.totalPracticeTime" unit="horas" />
        <StatCard title="Canciones Aprendidas" :value="stats.songsLearned" unit="canciones" />
        <StatCard title="Duración Media de Sesión" :value="stats.averageSessionLength" unit="minutos" />
        <StatCard title="Racha más Larga" :value="stats.longestStreak" unit="días" />
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <StatisticsChart />
        <PracticeCalendar />
      </div>
      
      <ChallengesAndGoals class="mb-8" />
      
      <h2 class="text-2xl font-semibold text-white mb-4">Actividad Reciente</h2>
      <Card>
        <ul class="space-y-2">
          <li v-for="activity in recentActivities" :key="activity.id" class="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded transition-colors">
            <span class="text-2xl">{{ activity.icon }}</span>
            <span class="text-gray-300">{{ activity.text }}</span>
          </li>
        </ul>
      </Card>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import StatCard from '../components/StatCard.vue'
  import Card from '../components/ui/Card.vue'
  import StatisticsChart from '../components/StatisticsChart.vue'
  import PracticeCalendar from '../components/PracticeCalendar.vue'
  import ChallengesAndGoals from '../components/ChallengesAndGoals.vue'
  
  const stats = ref({
    totalPracticeTime: 25,
    songsLearned: 15,
    averageSessionLength: 30,
    longestStreak: 7
  })
  
  const recentActivities = ref([
    { id: 1, icon: '🎸', text: 'Aprendiste "Wonderwall" de Oasis' },
    { id: 2, icon: '🎥', text: 'Subiste un nuevo video de progreso' },
    { id: 3, icon: '🏆', text: 'Lograste una racha de 7 días' },
    { id: 4, icon: '🎵', text: 'Practicaste durante 2 horas hoy' }
  ])
  </script>