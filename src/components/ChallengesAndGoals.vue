<!-- src/components/ChallengesAndGoals.vue -->
<template>
    <div class="card">
      <h2 class="text-xl font-bold mb-4">Desafíos y Metas</h2>
      <div class="space-y-4">
        <div v-for="challenge in challenges" :key="challenge.id" class="bg-gray-700 rounded-lg p-4">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-lg font-semibold">{{ challenge.title }}</h3>
            <span :class="challenge.completed ? 'text-green-500' : 'text-yellow-500'">
              {{ challenge.completed ? 'Completado' : 'En progreso' }}
            </span>
          </div>
          <p class="text-gray-400 mb-2">{{ challenge.description }}</p>
          <div class="w-full bg-gray-600 rounded-full h-2.5">
            <div class="bg-green-500 h-2.5 rounded-full" :style="{ width: `${challenge.progress}%` }"></div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const challenges = ref([
    {
      id: 1,
      title: 'Aprender una nueva canción',
      description: 'Aprende y toca una nueva canción esta semana',
      progress: 75,
      completed: false
    },
    {
      id: 2,
      title: 'Práctica diaria',
      description: 'Practica al menos 30 minutos cada día durante una semana',
      progress: 100,
      completed: true
    },
    {
      id: 3,
      title: 'Dominar un nuevo acorde',
      description: 'Aprende y practica un nuevo acorde hasta dominarlo',
      progress: 50,
      completed: false
    }
  ]);
  </script>